"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Search, Filter, Sparkles } from "lucide-react";
import katalogData from "@/data/katalog.json";
import { ProductItem } from "@/types";
import { SectionHeader } from "@/components/ui/SectionHeader";

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

export function CatalogGridClient() {
  const [activeTab, setActiveTab] = React.useState<string>("Semua");
  const [searchQuery, setSearchQuery] = React.useState<string>("" );

  // Modal states
  const [selectedCategoryForChart, setSelectedCategoryForChart] =
    React.useState<string | null>(null);
  const [selectedProductForOrder, setSelectedProductForOrder] =
    React.useState<ProductItem | null>(null);

  // Categories list
  const categories = ["Semua", "Kemeja", "Rompi", "Kaos", "id card"];

  // Filter products by tab and search
  const filteredProducts = React.useMemo(() => {
    return (katalogData as ProductItem[]).filter((item) => {
      const matchesTab =
        activeTab === "Semua" ||
        item.jenis.toLowerCase() === activeTab.toLowerCase();
      const matchesSearch =
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.bahan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.jenis.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <section id="katalog" className="py-16 md:py-24 bg-[#09090b] relative">
      {/* Background glow decorator */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Main Title Header (Semantic h1) */}
        <SectionHeader
          isMainPageTitle
          badgeText="Katalog Digital & Portofolio Nap's"
          badgeIcon={<Sparkles className="w-3.5 h-3.5" aria-hidden="true" />}
          title="Katalog Lengkap Produk Konveksi"
          subtitle="Pilih kategori apparel seragam custom Anda. Dapatkan kualitas bahan premium, presisi jahitan tinggi, dan pemesanan langsung via WhatsApp Admin."
        />

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Dynamic Tabs */}
          <Tabs
            defaultValue="Semua"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full md:w-auto"
          >
            <TabsList className="w-full flex flex-wrap h-auto p-1.5 bg-zinc-900 border border-zinc-800">
              {categories.map((cat) => {
                const count =
                  cat === "Semua"
                    ? katalogData.length
                    : katalogData.filter(
                        (i) => i.jenis.toLowerCase() === cat.toLowerCase()
                      ).length;

                return (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="flex-1 md:flex-initial text-xs sm:text-sm px-4 py-2 font-medium transition-all focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {cat}
                    <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-zinc-800 text-zinc-400 group-data-[state=active]:bg-zinc-950 group-data-[state=active]:text-yellow-400">
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
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="catalog-search-input"
              type="search"
              placeholder="Cari produk / bahan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Product Grid Card Display */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenSizeChart={(cat) => setSelectedCategoryForChart(cat)}
                onOpenOrderModal={(prod) => setSelectedProductForOrder(prod)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40">
            <Filter className="w-10 h-10 text-zinc-600 mx-auto mb-3" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-white">
              Tidak ada produk ditemukan
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
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
