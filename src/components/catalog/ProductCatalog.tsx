"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProductCard, ProductItem } from "./ProductCard";
import { SizeChartModal } from "@/components/modals/SizeChartModal";
import { OrderModal } from "@/components/modals/OrderModal";
import { Search, Sparkles, Filter, Grid } from "lucide-react";
import katalogData from "@/data/katalog.json";

export function ProductCatalog() {
  const [activeTab, setActiveTab] = React.useState<string>("Semua");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            Katalog Digital & Portofolio Nap's
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Katalog Produk Konveksi
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Pilih kategori apparel seragam custom Anda. Dapatkan kualitas bahan
            premium, presisi jahitan tinggi, dan pemesanan langsung via WhatsApp
            Admin.
          </p>
        </div>

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
                        (i) => i.jenis.toLowerCase() === cat.toLowerCase(),
                      ).length;

                return (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="flex-1 md:flex-initial text-xs sm:text-sm px-4 py-2 font-medium transition-all"
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Cari produk / bahan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary transition-colors"
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
            <Filter className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white">
              Tidak ada produk ditemukan
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Coba gunakan kata kunci pencarian lain atau pilih tab kategori
              berbeda.
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <SizeChartModal
        isOpen={!!selectedCategoryForChart}
        onClose={() => setSelectedCategoryForChart(null)}
        category={selectedCategoryForChart || "Kemeja"}
      />

      <OrderModal
        isOpen={!!selectedProductForOrder}
        onClose={() => setSelectedProductForOrder(null)}
        product={selectedProductForOrder}
      />
    </section>
  );
}
