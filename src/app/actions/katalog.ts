"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createClient as createServerClient } from "@/lib/server";
import { ProductItem } from "@/types";

export interface ActionResponse {
  success: boolean;
  error?: string;
  product?: ProductItem;
}

/**
 * Extracts storage path from a Supabase Storage public URL
 */
function extractStoragePath(publicUrl: string, bucket = "katalog-gambar"): string | null {
  if (!publicUrl) return null;
  try {
    const url = new URL(publicUrl);
    const marker = `/${bucket}/`;
    const index = url.pathname.indexOf(marker);
    if (index !== -1) {
      return decodeURIComponent(url.pathname.substring(index + marker.length));
    }
    const segments = url.pathname.split("/");
    return segments[segments.length - 1] || null;
  } catch {
    const marker = `${bucket}/`;
    const index = publicUrl.indexOf(marker);
    if (index !== -1) {
      return decodeURIComponent(publicUrl.substring(index + marker.length));
    }
    return publicUrl;
  }
}

/**
 * Server Action: Deletes a product from database and its image from Supabase storage
 */
export async function deleteProductAction(
  id: string,
  imageUrl: string
): Promise<ActionResponse> {
  try {
    const supabase = await createServerClient();

    // Verify session
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Akses ditolak: Anda harus login sebagai admin." };
    }

    // 1. Delete image from Supabase Storage bucket first
    if (imageUrl) {
      const storagePath = extractStoragePath(imageUrl, "katalog-gambar");
      if (storagePath) {
        const { error: storageError } = await supabase.storage
          .from("katalog-gambar")
          .remove([storagePath]);

        if (storageError) {
          console.warn("Peringatan: Gagal menghapus file gambar storage:", storageError.message);
        }
      }
    }

    // 2. Delete row from katalog table
    const { error: dbError } = await supabase
      .from("katalog")
      .delete()
      .eq("id", id);

    if (dbError) {
      return {
        success: false,
        error: `Gagal menghapus produk dari database: ${dbError.message}`,
      };
    }

    // 3. Revalidate cache
    revalidateTag("katalog");
    revalidatePath("/admin/katalog");
    revalidatePath("/catalog");
    revalidatePath("/");

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan yang tidak terduga";
    return { success: false, error: message };
  }
}

/**
 * Server Action: Uploads product image to Supabase Storage and inserts record into katalog table
 */
export async function createProductAction(formData: FormData): Promise<ActionResponse> {
  try {
    const supabase = await createServerClient();

    // Verify session
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Akses ditolak: Anda harus login sebagai admin." };
    }

    const rawId = formData.get("id") as string;
    const nama = formData.get("nama") as string;
    const jenis = formData.get("jenis") as string;
    const bahan = formData.get("bahan") as string;
    const imageFile = formData.get("image") as File | null;

    if (!rawId || !nama || !jenis || !bahan) {
      return { success: false, error: "Semua kolom form wajib diisi." };
    }

    if (!imageFile || !(imageFile instanceof File) || imageFile.size === 0) {
      return { success: false, error: "File gambar produk wajib diunggah." };
    }

    // Clean slug ID
    const cleanId = rawId
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-");

    // 1. Upload image to Supabase Storage 'katalog-gambar'
    const fileExt = imageFile.name.split(".").pop() || "webp";
    const storageFileName = `${cleanId}-${Date.now()}.${fileExt}`;

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from("katalog-gambar")
      .upload(storageFileName, buffer, {
        contentType: imageFile.type || "image/webp",
        upsert: true,
      });

    if (uploadError) {
      return {
        success: false,
        error: `Gagal mengunggah gambar ke storage: ${uploadError.message}`,
      };
    }

    // 2. Retrieve public URL
    const { data: publicUrlData } = supabase.storage
      .from("katalog-gambar")
      .getPublicUrl(storageFileName);

    const publicUrl = publicUrlData.publicUrl;

    // 3. Insert row into katalog table
    const { error: insertError } = await supabase.from("katalog").insert({
      id: cleanId,
      nama: nama.trim(),
      jenis: jenis.trim(),
      bahan: bahan.trim(),
      gambar: publicUrl,
    });

    if (insertError) {
      // Rollback: cleanup newly uploaded image on DB error
      await supabase.storage.from("katalog-gambar").remove([storageFileName]);

      if (
        insertError.code === "23505" ||
        insertError.message.includes("duplicate key") ||
        insertError.message.includes("katalog_pkey")
      ) {
        return {
          success: false,
          error: `ID / Slug "${cleanId}" sudah digunakan oleh produk lain di database. Silakan ubah kolom ID / Slug (misal: "${cleanId}-2") agar unik.`,
        };
      }

      return {
        success: false,
        error: `Gagal menyimpan produk: ${insertError.message}`,
      };
    }

    // 4. Revalidate cache
    revalidateTag("katalog");
    revalidatePath("/admin/katalog");
    revalidatePath("/catalog");
    revalidatePath("/");

    const newProduct: ProductItem = {
      id: cleanId,
      nama: nama.trim(),
      jenis: jenis.trim(),
      bahan: bahan.trim(),
      gambar: publicUrl,
    };

    return { success: true, product: newProduct };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan yang tidak terduga";
    return { success: false, error: message };
  }
}

/**
 * Server Action: Updates a product in the katalog table, optionally uploading a new image to Supabase Storage
 */
export async function updateProductAction(formData: FormData): Promise<ActionResponse> {
  try {
    const supabase = await createServerClient();

    // Verify session
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Akses ditolak: Anda harus login sebagai admin." };
    }

    const id = formData.get("id") as string;
    const nama = formData.get("nama") as string;
    const jenis = formData.get("jenis") as string;
    const bahan = formData.get("bahan") as string;
    const currentImageUrl = (formData.get("currentImageUrl") as string) || "";
    const newImageFile = formData.get("image") as File | null;

    if (!id || !nama || !jenis || !bahan) {
      return { success: false, error: "Semua kolom form wajib diisi." };
    }

    let finalImageUrl = currentImageUrl;

    // If a new image file is provided
    if (newImageFile && newImageFile instanceof File && newImageFile.size > 0) {
      const fileExt = newImageFile.name.split(".").pop() || "webp";
      const storageFileName = `${id}-${Date.now()}.${fileExt}`;

      const arrayBuffer = await newImageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabase.storage
        .from("katalog-gambar")
        .upload(storageFileName, buffer, {
          contentType: newImageFile.type || "image/webp",
          upsert: true,
        });

      if (uploadError) {
        return {
          success: false,
          error: `Gagal mengunggah gambar baru: ${uploadError.message}`,
        };
      }

      const { data: publicUrlData } = supabase.storage
        .from("katalog-gambar")
        .getPublicUrl(storageFileName);

      finalImageUrl = publicUrlData.publicUrl;

      // Clean up old image if present in storage
      if (currentImageUrl) {
        const oldStoragePath = extractStoragePath(currentImageUrl, "katalog-gambar");
        if (oldStoragePath && oldStoragePath !== storageFileName) {
          await supabase.storage.from("katalog-gambar").remove([oldStoragePath]);
        }
      }
    }

    // Update row in katalog table
    const { error: updateError } = await supabase
      .from("katalog")
      .update({
        nama: nama.trim(),
        jenis: jenis.trim(),
        bahan: bahan.trim(),
        gambar: finalImageUrl,
      })
      .eq("id", id);

    if (updateError) {
      return {
        success: false,
        error: `Gagal memperbarui produk: ${updateError.message}`,
      };
    }

    // Revalidate cache
    revalidateTag("katalog");
    revalidatePath("/admin/katalog");
    revalidatePath("/catalog");
    revalidatePath("/");

    const updatedProduct: ProductItem = {
      id,
      nama: nama.trim(),
      jenis: jenis.trim(),
      bahan: bahan.trim(),
      gambar: finalImageUrl,
    };

    return { success: true, product: updatedProduct };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan yang tidak terduga";
    return { success: false, error: message };
  }
}

/**
 * Server Action: Signs out admin user and redirects to login page
 */
export async function logoutAction() {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/admin/login");
}
