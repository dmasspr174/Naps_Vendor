"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ProductItem } from "@/types";
import { deleteProductAction, logoutAction } from "@/app/actions/katalog";
import { useAdminStore } from "@/stores/useAdminStore";
import {
  Search,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  LogOut,
  ShieldCheck,
  Package,
  Layers,
  Sparkles,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  XCircle,
  Menu,
  X,
  Info,
} from "lucide-react";

// ─── Dynamic imports: only download these large modals when the user needs them ─
const AddProductModal = dynamic(
  () =>
    import("@/components/admin/AddProductModal").then((m) => m.AddProductModal),
  { ssr: false }
);

const EditProductModal = dynamic(
  () =>
    import("@/components/admin/EditProductModal").then(
      (m) => m.EditProductModal
    ),
  { ssr: false }
);

// ─── Props ────────────────────────────────────────────────────────────────────
interface AdminKatalogClientProps {
  initialProducts: ProductItem[];
  userEmail: string;
  onOpenCreateModal?: () => void;
}

// ─── Thumbnail with error fallback ───────────────────────────────────────────
function ProductThumbnail({
  src,
  alt,
  size = 48,
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  const [imgSrc, setImgSrc] = React.useState<string>(
    src || "/images/produk/kaos_seragam.webp"
  );

  React.useEffect(() => {
    setImgSrc(src || "/images/produk/kaos_seragam.webp");
  }, [src]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="object-cover"
      sizes={`${size}px`}
      onError={() => setImgSrc("/images/produk/kaos_seragam.webp")}
    />
  );
}

// ─── Toast component ──────────────────────────────────────────────────────────
function AdminToast({
  message,
  type,
  onDismiss,
}: {
  message: string;
  type: "success" | "error" | "info";
  onDismiss: () => void;
}) {
  // Auto-dismiss after 4 seconds
  React.useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [message, onDismiss]);

  const config = {
    success: {
      cls: "bg-emerald-600 text-white",
      icon: <CheckCircle2 className="w-4 h-4 shrink-0" />,
    },
    error: {
      cls: "bg-rose-600 text-white",
      icon: <XCircle className="w-4 h-4 shrink-0" />,
    },
    info: {
      cls: "bg-slate-700 text-white",
      icon: <Info className="w-4 h-4 shrink-0" />,
    },
  }[type];

  return (
    <div
      className={`fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold shadow-lg animate-in slide-in-from-top-4 duration-300 ${config.cls}`}
    >
      {config.icon}
      <span>{message}</span>
    </div>
  );
}

// ─── Category badge helper ─────────────────────────────────────────────────────
function getCategoryBadgeClass(jenis: string): string {
  switch (jenis.toLowerCase()) {
    case "kemeja":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "rompi":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "kaos":
      return "bg-sky-100 text-sky-800 border-sky-200";
    case "id card":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

// ─── Main Component ────────────────────────────────────────────────────────────
export function AdminKatalogClient({
  initialProducts,
  userEmail,
}: AdminKatalogClientProps) {
  // ── Zustand store slices (atomic selectors to minimize re-renders) ──
  const isProductModalOpen = useAdminStore((s) => s.isProductModalOpen);
  const modalMode = useAdminStore((s) => s.modalMode);
  const editingProduct = useAdminStore((s) => s.editingProduct);
  const isDeleteDialogOpen = useAdminStore((s) => s.isDeleteDialogOpen);
  const targetDeleteProduct = useAdminStore((s) => s.targetDeleteProduct);
  const toastMessage = useAdminStore((s) => s.toastMessage);
  const toastType = useAdminStore((s) => s.toastType);
  const openCreateModal = useAdminStore((s) => s.openCreateModal);
  const openEditModal = useAdminStore((s) => s.openEditModal);
  const closeProductModal = useAdminStore((s) => s.closeProductModal);
  const openDeleteDialog = useAdminStore((s) => s.openDeleteDialog);
  const closeDeleteDialog = useAdminStore((s) => s.closeDeleteDialog);
  const showToast = useAdminStore((s) => s.showToast);
  const dismissToast = useAdminStore((s) => s.dismissToast);

  // ── Local UI state (not shared externally) ──
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("Semua");

  // ── Product list with optimistic delete support ──────────────────────────
  // We maintain both the confirmed list (`products`) and a display list
  // (`displayProducts`) which can have items removed immediately for instant UX.
  const [products, setProducts] = React.useState<ProductItem[]>(initialProducts);
  const [hiddenIds, setHiddenIds] = React.useState<Set<string>>(new Set());

  // Derived: apply optimistic removals without mutating the confirmed list
  const optimisticProducts = React.useMemo(
    () => products.filter((p) => !hiddenIds.has(p.id)),
    [products, hiddenIds]
  );

  // ── Delete loading state ───────────────────────────────────────────────────
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState<string | null>(null);

  const categories = ["Semua", "Kemeja", "Rompi", "Kaos", "id card"];

  // ── Derived: filter products by search + category ──────────────────────────
  const filteredProducts = React.useMemo(() => {
    return optimisticProducts.filter((item) => {
      const matchesCategory =
        selectedCategory === "Semua" ||
        item.jenis.toLowerCase() === selectedCategory.toLowerCase();
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.nama.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.bahan.toLowerCase().includes(q) ||
        item.jenis.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [optimisticProducts, selectedCategory, searchQuery]);

  // ─── Handlers ─────────────────────────────────────────────────────────────

  const handleCreateSuccess = (newProduct: ProductItem) => {
    setProducts((prev) => [newProduct, ...prev]);
    closeProductModal();
    showToast(`Produk "${newProduct.nama}" berhasil ditambahkan!`, "success");
  };

  const handleUpdateSuccess = (updatedProduct: ProductItem) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    closeProductModal();
    showToast(`Produk "${updatedProduct.nama}" berhasil diperbarui!`, "success");
  };

  const handleDeleteConfirm = async () => {
    if (!targetDeleteProduct) return;

    setIsDeleting(true);
    setDeleteError(null);

    // Optimistic update: hide the item immediately for instant feedback
    const id = targetDeleteProduct.id;
    setHiddenIds((prev) => new Set([...prev, id]));

    try {
      const res = await deleteProductAction(id, targetDeleteProduct.gambar);

      if (!res.success) {
        setDeleteError(res.error || "Gagal menghapus produk.");
        setIsDeleting(false);
        // Rollback: reveal the item again since deletion failed
        setHiddenIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        return;
      }

      // Confirm: remove from the source-of-truth list and clear hidden set
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setHiddenIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      closeDeleteDialog();
      showToast(`Produk "${targetDeleteProduct.nama}" berhasil dihapus.`, "success");
    } catch (err) {
      console.error("Delete error:", err);
      setDeleteError("Terjadi kesalahan jaringan atau server saat menghapus.");
      // Rollback on network error
      setHiddenIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-900">
      {/* Global toast */}
      {toastMessage && (
        <AdminToast
          message={toastMessage}
          type={toastType}
          onDismiss={dismissToast}
        />
      )}

      {/* ── Top Navigation Bar ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-400 text-slate-900 font-black text-lg shadow-xs">
              N
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-base sm:text-lg font-bold text-slate-900">
                  Nap's Vendor
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                  Admin Portal
                </span>
              </div>
              <span className="hidden sm:block text-[11px] text-slate-400 font-medium">
                Sistem Manajemen Katalog Digital
              </span>
            </div>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/catalog"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Lihat Web Publik
            </Link>

            <div className="h-4 w-[1px] bg-slate-200" />

            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="max-w-[150px] truncate">{userEmail}</span>
            </div>

            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-colors shadow-xs"
              >
                <LogOut className="w-3.5 h-3.5" />
                Keluar
              </button>
            </form>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu navigasi"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-600 py-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate">{userEmail}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <Link
                href="/catalog"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Lihat Web Publik
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Keluar
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* ── Main Content ───────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* Page header + add button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Manajemen Katalog Produk
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Kelola data item katalog, update bahan, dan foto produk konveksi
              Nap's Vendor.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Tambah Produk Baru
          </button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              label: "Total Item",
              value: products.length,
              icon: <Package className="w-5 h-5" />,
              bg: "bg-slate-100",
              fg: "text-slate-700",
            },
            {
              label: "Kemeja",
              value: products.filter((p) => p.jenis.toLowerCase() === "kemeja").length,
              icon: <Layers className="w-5 h-5" />,
              bg: "bg-amber-50",
              fg: "text-amber-600",
            },
            {
              label: "Rompi",
              value: products.filter((p) => p.jenis.toLowerCase() === "rompi").length,
              icon: <Sparkles className="w-5 h-5" />,
              bg: "bg-emerald-50",
              fg: "text-emerald-600",
            },
            {
              label: "Kaos & ID Card",
              value: products.filter((p) =>
                ["kaos", "id card"].includes(p.jenis.toLowerCase())
              ).length,
              icon: <Package className="w-5 h-5" />,
              bg: "bg-sky-50",
              fg: "text-sky-600",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-3"
            >
              <div
                className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.fg} flex items-center justify-center`}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {stat.label}
                </p>
                <p className="font-heading text-xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              const count =
                cat === "Semua"
                  ? products.length
                  : products.filter(
                      (p) => p.jenis.toLowerCase() === cat.toLowerCase()
                    ).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`px-1.5 rounded-full text-[10px] ${
                      isActive
                        ? "bg-slate-700 text-slate-200"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="search"
              placeholder="Cari nama, id, atau bahan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all bg-slate-50/50 focus:bg-white"
            />
          </div>
        </div>

        {/* Table / Cards */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-heading text-base font-bold text-slate-900">
                Tidak ada produk yang cocok
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Coba sesuaikan kata kunci pencarian atau ubah filter kategori di
                atas.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      <th className="py-3.5 px-6">Produk</th>
                      <th className="py-3.5 px-6">ID (Slug)</th>
                      <th className="py-3.5 px-6">Kategori</th>
                      <th className="py-3.5 px-6">Bahan Material</th>
                      <th className="py-3.5 px-6 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 shrink-0">
                              <ProductThumbnail
                                src={product.gambar}
                                alt={product.nama}
                                size={48}
                              />
                            </div>
                            <p className="font-semibold text-slate-900 text-sm">
                              {product.nama}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                            {product.id}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getCategoryBadgeClass(product.jenis)}`}
                          >
                            {product.jenis}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-slate-600 text-xs sm:text-sm font-medium">
                          {product.bahan}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => openEditModal(product)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                              aria-label={`Edit ${product.nama}`}
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => openDeleteDialog(product)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 hover:border-rose-300 transition-colors"
                              aria-label={`Hapus ${product.nama}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Hapus</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile card list */}
              <div className="md:hidden divide-y divide-slate-100">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <ProductThumbnail
                          src={product.gambar}
                          alt={product.nama}
                          size={64}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getCategoryBadgeClass(product.jenis)}`}
                          >
                            {product.jenis}
                          </span>
                          <span className="font-mono text-[10px] text-slate-500 truncate">
                            {product.id}
                          </span>
                        </div>
                        <h2 className="font-semibold text-slate-900 text-sm truncate">
                          {product.nama}
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {product.bahan}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => openEditModal(product)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => openDeleteDialog(product)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50/50 hover:bg-rose-50 border border-rose-200 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* ── Modals (lazy-loaded via next/dynamic) ─────────────────────────── */}

      {/* Create Modal — only mounted when open */}
      {isProductModalOpen && modalMode === "create" && (
        <AddProductModal
          isOpen
          onClose={closeProductModal}
          onSuccess={handleCreateSuccess}
        />
      )}

      {/* Edit Modal — only mounted when editing a product */}
      {isProductModalOpen && modalMode === "edit" && editingProduct && (
        <EditProductModal
          isOpen
          onClose={closeProductModal}
          product={editingProduct}
          onSuccess={handleUpdateSuccess}
        />
      )}

      {/* ── Delete Confirmation Dialog ─────────────────────────────────────── */}
      {isDeleteDialogOpen && targetDeleteProduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-md p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h2
                  id="delete-dialog-title"
                  className="font-heading font-bold text-lg text-slate-900"
                >
                  Hapus Produk Katalog?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  Apakah Anda yakin ingin menghapus{" "}
                  <strong className="text-slate-900">
                    {targetDeleteProduct.nama}
                  </strong>
                  ? Foto akan dihapus dari storage dan baris dari database.
                </p>
              </div>
            </div>

            {deleteError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {deleteError}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => {
                  closeDeleteDialog();
                  setDeleteError(null);
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteConfirm}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menghapus...</span>
                  </>
                ) : (
                  <span>Ya, Hapus Produk</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
