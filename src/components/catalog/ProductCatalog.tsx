"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "@/components/skeletons";
import { Sparkles } from "lucide-react";
import { ProductItem } from "@/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Dynamic imports for non-critical client dialogs
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

interface ProductCatalogProps {
  initialProducts?: ProductItem[];
}

export function ProductCatalog({ initialProducts = [] }: ProductCatalogProps) {
  // Modal states
  const [selectedCategoryForChart, setSelectedCategoryForChart] =
    React.useState<string | null>(null);
  const [selectedProductForOrder, setSelectedProductForOrder] =
    React.useState<ProductItem | null>(null);

  const products = initialProducts;

  return (
    <section
      id="katalog"
      aria-label="Katalog Produk Konveksi Nap's Vendor"
      className="py-16 md:py-24 bg-slate-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Reusable Section Header */}
        <SectionHeader
          badgeText="Katalog Digital & Portofolio Nap's"
          badgeIcon={<Sparkles className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />}
          title="Katalog Produk Pilihan"
          subtitle="Pilih kategori apparel seragam custom Anda. Dapatkan kualitas bahan premium, presisi jahitan tinggi, dan pemesanan langsung via WhatsApp Admin."
        />

        {/* Product Display: Skeleton if empty or interactive carousel */}
        {products.length === 0 ? (
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-6">
              <div className="h-7 w-44 rounded-lg bg-slate-200/80"></div>
              <div className="flex gap-2">
                <div className="h-10 w-10 rounded-full bg-slate-200/80"></div>
                <div className="h-10 w-10 rounded-full bg-slate-200/80"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-full">
                  <ProductCardSkeleton />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative animate-in fade-in duration-300">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              {/* Header Controls */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-xl font-bold tracking-tight text-slate-900">
                  Koleksi Terpopuler
                </h3>
                <div className="flex items-center gap-2">
                  <CarouselPrevious
                    className="static translate-y-0 translate-x-0 h-10 w-10 border-slate-200 bg-white text-slate-700 hover:bg-amber-400 hover:text-slate-900 hover:border-amber-400 shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-amber-500"
                    aria-label="Geser ke produk sebelumnya"
                  />
                  <CarouselNext
                    className="static translate-y-0 translate-x-0 h-10 w-10 border-slate-200 bg-white text-slate-700 hover:bg-amber-400 hover:text-slate-900 hover:border-amber-400 shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-amber-500"
                    aria-label="Geser ke produk berikutnya"
                  />
                </div>
              </div>

              <CarouselContent className="-ml-6 items-stretch">
                {products.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="pl-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex"
                  >
                    <div className="w-full flex flex-col h-full">
                      <ProductCard
                        product={product}
                        onOpenSizeChart={(cat) => setSelectedCategoryForChart(cat)}
                        onOpenOrderModal={(prod) => setSelectedProductForOrder(prod)}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>

      {/* Lazy Loaded Modals */}
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
