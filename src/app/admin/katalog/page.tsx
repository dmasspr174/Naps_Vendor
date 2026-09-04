import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient as createServerClient } from "@/lib/server";
import { AdminKatalogClient } from "@/components/admin/AdminKatalogClient";
import { ProductItem } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard Admin Katalog | Nap's Vendor",
  description: "Manajemen katalog produk, update bahan, dan foto produk Nap's Vendor.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminKatalogPage() {
  const supabase = await createServerClient();

  // 1. Verify authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // 2. Fetch only required columns from Supabase 'katalog' table
  const { data: products, error } = await supabase
    .from("katalog")
    .select("id, nama, jenis, bahan, gambar")
    .order("id", { ascending: true });

  if (error) {
    console.error("Gagal mengambil data katalog dari Supabase:", error.message);
  }

  return (
    <AdminKatalogClient
      initialProducts={(products as ProductItem[]) || []}
      userEmail={user.email || "admin@napsvendor.com"}
    />
  );
}
