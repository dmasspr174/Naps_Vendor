"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ProductCardSkeleton } from "@/components/skeletons";
import { Search, Filter, Sparkles } from "lucide-react";
import { ProductItem } from "@/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useCatalogStore } from "@/stores/useCatalogStore";

// Dynamic imports for modal dialogs to reduce initial JS payload
const SizeChartModal = dynamic(
  () =>
    import("@/components/modals/SizeChartModal").then(
      (mod) => mod.SizeChartModal
    ),
  { ssr: false }
);

const OrderModal = dynamic(
  () => import("@/components/modals/OrderModal").then((mod) => mod.OrderModal),
  { ssr: false }
);

interface CatalogGridClientProps {
  initialProducts?: ProductItem[];
}

export function CatalogGridClient({ initialProducts = [] }: CatalogGridClientProps) {
  const [products, setProducts] = React.useState<ProductItem[]>(initialProducts);

  // ── Zustand catalog store: shared filter state ────────────────────────────
  const searchQuery = useCatalogStore((s) => s.searchQuery);
  const selectedCategory = useCatalogStore((s) => s.selectedCategory);
  const setSearchQuery = useCatalogStore((s) => s.setSearchQuery);
  const setSelectedCategory = useCatalogStore((s) => s.setSelectedCategory);

  // Sync state if initialProducts changes (e.g., after revalidation)
  React.useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  // Modal states
  const [selectedCategoryForChart, setSelectedCategoryForChart] =
    React.useState<string | null>(null);
  const [selectedProductForOrder, setSelectedProductForOrder] =
    React.useState<ProductItem | null>(null);

  // Categories list
  const categories = ["Semua", "Kemeja", "Rompi", "Kaos", "id card"];

  // Filter products by tab and search
  const filteredProducts = React.useMemo(() => {
    return products.filter((item) => {
      const matchesTab =
        selectedCategory === "Semua" ||
        item.jenis.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.bahan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.jenis.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <section id="katalog" className="py-16 md:py-24 bg-slate-50 relative overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Main Title Header */}
        <SectionHeader
          isMainPageTitle
          badgeText="Katalog Digital & Portofolio Nap's"
          badgeIcon={<Sparkles className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />}
          title="Katalog Lengkap Produk Konveksi"
          subtitle="Pilih kategori apparel seragam custom Anda. Dapatkan kualitas bahan premium, presisi jahitan tinggi, dan pemesanan langsung via WhatsApp Admin."
        />

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Dynamic Tabs */}
          <Tabs
            defaultValue="Semua"
            value={selectedCategory}
            onValueChange={(v) => setSelectedCategory(v as "Semua" | "Kemeja" | "Rompi" | "Kaos" | "id card")}
            className="w-full md:w-auto"
          >
            <TabsList className="w-full flex flex-wrap h-auto p-1.5 bg-slate-100 border border-slate-200/80 rounded-xl shadow-xs">
              {categories.map((cat) => {
                const count =
                  cat === "Semua"
                    ? products.length
                    : products.filter(
                        (i) => i.jenis.toLowerCase() === cat.toLowerCase()
                      ).length;

                return (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="flex-1 md:flex-initial text-xs sm:text-sm px-4 py-2 font-medium rounded-lg text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    {cat}
                    <span className="ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700 data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900">
                      {count}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>

          {/* Search Input Filter */}
          <div className="relative w-full md:w-72">
            <label htmlFor="catalog-search-input" className="sr-only">
              Cari produk atau bahan konveksi
            </label>
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="catalog-search-input"
              type="search"
              placeholder="Cari produk / bahan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Product Grid: Skeleton state or Loaded Products */}
        {products.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-full flex flex-col">
                <ProductCardSkeleton />
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch animate-in fade-in duration-300">
            {filteredProducts.map((product) => (
              <div key={product.id} className="h-full flex flex-col">
                <ProductCard
                  product={product}
                  onOpenSizeChart={(cat) => setSelectedCategoryForChart(cat)}
                  onOpenOrderModal={(prod) => setSelectedProductForOrder(prod)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl border border-dashed border-slate-200 bg-white p-8 shadow-xs">
            <Filter className="w-10 h-10 text-slate-400 mx-auto mb-3" aria-hidden="true" />
            <h3 className="font-heading text-lg font-bold text-slate-900">
              Tidak ada produk ditemukan
            </h3>
            <p className="font-sans text-sm text-slate-500 font-medium mt-1">
              Coba gunakan kata kunci pencarian lain atau pilih tab kategori berbeda.
            </p>
          </div>
        )}
      </div>

      {/* Lazy Modals */}
      {selectedCategoryForChart && (
        <SizeChartModal
          isOpen={Boolean(selectedCategoryForChart)}
          onClose={() => setSelectedCategoryForChart(null)}
          category={selectedCategoryForChart}
        />
      )}

      {selectedProductForOrder && (
        <OrderModal
          isOpen={Boolean(selectedProductForOrder)}
          onClose={() => setSelectedProductForOrder(null)}
          product={selectedProductForOrder}
        />
      )}
    </section>
  );
}
