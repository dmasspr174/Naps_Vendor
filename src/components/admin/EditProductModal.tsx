"use client";

import * as React from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { ProductItem } from "@/types";
import { updateProductAction } from "@/app/actions/katalog";
import {
  X,
  UploadCloud,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductItem | null;
  onSuccess: (updatedProduct: ProductItem) => void;
}

const CATEGORIES = ["Kemeja", "Rompi", "Kaos", "id card"];

export function EditProductModal({
  isOpen,
  onClose,
  product,
  onSuccess,
}: EditProductModalProps) {
  const [nama, setNama] = React.useState("");
  const [jenis, setJenis] = React.useState("Kemeja");
  const [bahan, setBahan] = React.useState("");
  const [newImageFile, setNewImageFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [compressionInfo, setCompressionInfo] = React.useState<string | null>(null);

  const [isCompressing, setIsCompressing] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // Sync form when product changes
  React.useEffect(() => {
    if (product) {
      setNama(product.nama);
      setJenis(product.jenis);
      setBahan(product.bahan);
      setPreviewUrl(product.gambar);
      setNewImageFile(null);
      setCompressionInfo(null);
      setErrorMsg(null);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setIsCompressing(true);
    setCompressionInfo("Mengompres gambar ke WebP...");

    try {
      const originalSizeKB = (file.size / 1024).toFixed(0);
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
        fileType: "image/webp",
      };

      const compressedBlob = await imageCompression(file, options);
      const compressedSizeKB = (compressedBlob.size / 1024).toFixed(0);

      const compressedFile = new File(
        [compressedBlob],
        `${product.id}-${Date.now()}.webp`,
        { type: "image/webp" }
      );

      setNewImageFile(compressedFile);
      setPreviewUrl(URL.createObjectURL(compressedFile));
      setCompressionInfo(`WebP: ${originalSizeKB} KB → ${compressedSizeKB} KB`);
    } catch (err) {
      console.error("Gagal kompresi:", err);
      setErrorMsg("Gagal mengompres gambar. Menggunakan file asli.");
      setNewImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setCompressionInfo(null);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("id", product.id);
      formData.append("nama", nama.trim());
      formData.append("jenis", jenis.trim());
      formData.append("bahan", bahan.trim());
      formData.append("currentImageUrl", product.gambar);

      if (newImageFile) {
        formData.append("image", newImageFile);
      }

      const res = await updateProductAction(formData);

      if (!res.success) {
        setErrorMsg(res.error || "Gagal memperbarui produk.");
        setIsSubmitting(false);
        return;
      }

      // Notify parent
      onSuccess({
        id: product.id,
        nama: nama.trim(),
        jenis: jenis.trim(),
        bahan: bahan.trim(),
        gambar: previewUrl || product.gambar,
      });

      onClose();
    } catch (err) {
      console.error("Update error:", err);
      setErrorMsg("Terjadi kesalahan tak terduga saat menyimpan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 id="edit-modal-title" className="font-heading font-bold text-lg text-slate-900">
              Edit Produk Katalog
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              ID Slug: <span className="font-mono text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">{product.id}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {errorMsg && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Nama Produk */}
          <div className="space-y-1.5">
            <label htmlFor="edit-nama" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Nama Produk
            </label>
            <input
              id="edit-nama"
              type="text"
              required
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
            />
          </div>

          {/* Grid: Jenis & Bahan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="edit-jenis" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Kategori / Jenis
              </label>
              <select
                id="edit-jenis"
                value={jenis}
                onChange={(e) => setJenis(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="edit-bahan" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Bahan Material
              </label>
              <input
                id="edit-bahan"
                type="text"
                required
                value={bahan}
                onChange={(e) => setBahan(e.target.value)}
                placeholder="Misal: Nagata Drill"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
              />
            </div>
          </div>

          {/* Foto Produk */}
          <div className="space-y-2 pt-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Foto Produk (Opsional Ganti)
            </label>

            <div className="flex items-center gap-4">
              {/* Image Preview */}
              <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shrink-0">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt={nama || "Preview"}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-slate-400">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                )}
              </div>

              {/* Upload Input */}
              <div className="flex-1">
                <label
                  htmlFor="edit-image-input"
                  className="flex flex-col items-center justify-center p-3 border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-xl cursor-pointer bg-slate-50 hover:bg-emerald-50/40 transition-colors text-center"
                >
                  <UploadCloud className="w-5 h-5 text-slate-400 mb-1" />
                  <span className="text-xs font-semibold text-slate-700">Pilih foto baru</span>
                  <span className="text-[10px] text-slate-400">JPG, PNG, WebP otomatis dioptimasi</span>
                  <input
                    id="edit-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                    disabled={isCompressing || isSubmitting}
                  />
                </label>
              </div>
            </div>

            {/* Compression Info Badge */}
            {isCompressing && (
              <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 p-2 rounded-lg">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Sedang mengompres gambar...</span>
              </div>
            )}
            {compressionInfo && !isCompressing && (
              <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{compressionInfo}</span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting || isCompressing}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isCompressing}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <span>Simpan Perubahan</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
