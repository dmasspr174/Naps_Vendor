"use client";

import * as React from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { ProductItem } from "@/types";
import { createProductAction } from "@/app/actions/katalog";
import {
  X,
  UploadCloud,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  PlusCircle,
} from "lucide-react";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newProduct: ProductItem) => void;
}

const CATEGORIES = ["Kemeja", "Rompi", "Kaos", "id card"];

const QUICK_MATERIALS = [
  "Nagata Drill Original",
  "American Drill 1919",
  "Cotton Combed 24s",
  "Hisofy Drill",
  "Castilo Drill",
];

// Helper to generate kebab-case slug
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function AddProductModal({ isOpen, onClose, onSuccess }: AddProductModalProps) {
  const [nama, setNama] = React.useState("");
  const [slugId, setSlugId] = React.useState("");
  const [isCustomSlug, setIsCustomSlug] = React.useState(false);
  const [jenis, setJenis] = React.useState("Kemeja");
  const [bahan, setBahan] = React.useState("");

  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [isCompressing, setIsCompressing] = React.useState(false);
  const [compressionInfo, setCompressionInfo] = React.useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // Auto-generate slug when nama changes unless user manually edited slug
  const handleNamaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNama(val);
    if (!isCustomSlug) {
      setSlugId(generateSlug(val));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCustomSlug(true);
    setSlugId(generateSlug(e.target.value));
  };

  const resetForm = () => {
    setNama("");
    setSlugId("");
    setIsCustomSlug(false);
    setJenis("Kemeja");
    setBahan("");
    setImageFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setCompressionInfo(null);
    setErrorMsg(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Image compression pipeline with browser-image-compression
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setIsCompressing(true);
    setCompressionInfo("Sedang mengompres foto ke WebP...");

    try {
      const originalSizeKB = (file.size / 1024).toFixed(0);

      // Target < 300KB WebP: reduce maxSizeMB to 0.3 vs the 0.5 default
      const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1200,
        useWebWorker: true, // Offloads compression off main thread
        fileType: "image/webp",
      };

      const compressedBlob = await imageCompression(file, options);
      const compressedSizeKB = (compressedBlob.size / 1024).toFixed(0);

      const targetFileName = `${slugId || "produk"}-${Date.now()}.webp`;
      const compressedWebPFile = new File([compressedBlob], targetFileName, {
        type: "image/webp",
      });

      setImageFile(compressedWebPFile);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(compressedWebPFile));

      const savings = Math.max(
        0,
        Math.round(((file.size - compressedBlob.size) / file.size) * 100)
      );
      setCompressionInfo(
        `WebP berhasil: ${originalSizeKB} KB → ${compressedSizeKB} KB (hemat ${savings}%)`
      );
    } catch (err) {
      console.error("Gagal kompresi:", err);
      setErrorMsg("Gagal mengompresi gambar otomatis. Menggunakan file asli.");
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setCompressionInfo(null);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanNama = nama.trim();
    const cleanId = slugId.trim() || generateSlug(cleanNama);
    const cleanJenis = jenis.trim();
    const cleanBahan = bahan.trim();

    if (!cleanNama || !cleanId || !cleanJenis || !cleanBahan) {
      setErrorMsg("Semua kolom informasi produk wajib diisi.");
      return;
    }

    if (!imageFile) {
      setErrorMsg("Harap pilih dan unggah foto produk.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("id", cleanId);
      formData.append("nama", cleanNama);
      formData.append("jenis", cleanJenis);
      formData.append("bahan", cleanBahan);
      formData.append("image", imageFile);

      const res = await createProductAction(formData);

      if (!res.success) {
        setErrorMsg(res.error || "Gagal menambahkan produk baru.");
        setIsSubmitting(false);
        return;
      }

      if (res.product) {
        onSuccess(res.product);
      } else {
        onSuccess({
          id: cleanId,
          nama: cleanNama,
          jenis: cleanJenis,
          bahan: cleanBahan,
          gambar: previewUrl || "",
        });
      }

      handleClose();
    } catch (err) {
      console.error("Create error:", err);
      setErrorMsg("Terjadi kesalahan jaringan atau server saat menyimpan produk.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200 selection:bg-amber-400 selection:text-slate-900"
    >
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-lg overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 id="add-modal-title" className="font-heading font-bold text-lg text-slate-900">
                Tambah Produk Katalog Baru
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Data akan langsung tersinkronisasi ke katalog Nap's Vendor.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Tutup form"
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {errorMsg && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 animate-in fade-in duration-200"
            >
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span>{errorMsg}</span>
                {errorMsg.toLowerCase().includes("sudah digunakan") && (
                  <button
                    type="button"
                    onClick={() => {
                      const base = (slugId || generateSlug(nama) || "produk").replace(/-\d+$/, "");
                      setSlugId(`${base}-${Math.floor(100 + Math.random() * 900)}`);
                      setIsCustomSlug(true);
                      setErrorMsg(null);
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold transition-colors text-[11px]"
                  >
                    <Sparkles className="w-3 h-3 text-rose-700" />
                    Buat ID / Slug Unik Otomatis
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Nama Produk */}
          <div className="space-y-1.5">
            <label
              htmlFor="add-nama"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Nama Produk <span className="text-rose-500">*</span>
            </label>
            <input
              id="add-nama"
              type="text"
              required
              value={nama}
              onChange={handleNamaChange}
              placeholder="Contoh: Kemeja PDH BEM Fasilkom"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all shadow-xs"
            />
          </div>

          {/* Slug ID */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="add-slug"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                ID / Slug Unik <span className="text-rose-500">*</span>
              </label>
              {!isCustomSlug && nama && (
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                  <Sparkles className="w-3 h-3" /> Auto-generate
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <input
                id="add-slug"
                type="text"
                required
                value={slugId}
                onChange={handleSlugChange}
                placeholder="kemeja-pdh-bem-fasilkom"
                className="flex-1 font-mono text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all shadow-xs bg-slate-50/50 focus:bg-white"
              />
              <button
                type="button"
                title="Tambahkan angka unik pada ID Slug"
                onClick={() => {
                  const base = (slugId || generateSlug(nama) || "produk").replace(/-\d+$/, "");
                  setSlugId(`${base}-${Math.floor(100 + Math.random() * 900)}`);
                  setIsCustomSlug(true);
                  setErrorMsg(null);
                }}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold shrink-0 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Acak ID
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Digunakan sebagai identifier unik produk dan nama file storage.
            </p>
          </div>

          {/* Jenis & Bahan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="add-jenis"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Kategori / Jenis <span className="text-rose-500">*</span>
              </label>
              <select
                id="add-jenis"
                value={jenis}
                onChange={(e) => setJenis(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all bg-white shadow-xs"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="add-bahan"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Bahan Material <span className="text-rose-500">*</span>
              </label>
              <input
                id="add-bahan"
                type="text"
                required
                value={bahan}
                onChange={(e) => setBahan(e.target.value)}
                placeholder="Misal: Nagata Drill"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Quick Material Suggestions */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span className="text-[11px] text-slate-400 font-medium">Saran:</span>
            {QUICK_MATERIALS.map((mat) => (
              <button
                key={mat}
                type="button"
                onClick={() => setBahan(mat)}
                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                {mat}
              </button>
            ))}
          </div>

          {/* Foto Produk Upload Dropzone */}
          <div className="space-y-2 pt-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Foto Produk (WebP Auto-Convert) <span className="text-rose-500">*</span>
            </label>

            {previewUrl ? (
              <div className="relative rounded-xl border border-slate-200 bg-slate-50 p-3 flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-white">
                  <Image
                    src={previewUrl}
                    alt={nama || "Preview foto produk"}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-900 truncate">
                    {imageFile?.name || "foto-produk.webp"}
                  </p>
                  {compressionInfo && (
                    <p className="text-[11px] text-emerald-700 font-medium mt-0.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      {compressionInfo}
                    </p>
                  )}
                  <div className="mt-2">
                    <label
                      htmlFor="reupload-input"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" /> Ganti foto lain
                      <input
                        id="reupload-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={isCompressing || isSubmitting}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label
                  htmlFor="add-image-input"
                  className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all text-center ${
                    isCompressing
                      ? "border-emerald-400 bg-emerald-50/50"
                      : "border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/30"
                  }`}
                >
                  {isCompressing ? (
                    <div className="flex flex-col items-center gap-2 text-emerald-700">
                      <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                      <span className="text-xs font-semibold">Mengompresi gambar ke format WebP...</span>
                      <span className="text-[10px] text-slate-500">Maksimal 0.5MB & lebar 1200px</span>
                    </div>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-2">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-slate-800">
                        Klik untuk unggah atau seret file foto ke sini
                      </span>
                      <span className="text-[11px] text-slate-400 mt-1">
                        Format JPG, PNG, atau WebP (otomatis dikompresi ke WebP &lt; 500KB)
                      </span>
                    </>
                  )}
                  <input
                    id="add-image-input"
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                    disabled={isCompressing || isSubmitting}
                    className="sr-only"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting || isCompressing}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isCompressing || !imageFile}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Mengunggah & Menyimpan...</span>
                </>
              ) : (
                <span>Simpan & Publikasikan</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
