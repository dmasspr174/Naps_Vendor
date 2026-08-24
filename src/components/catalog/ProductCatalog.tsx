"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { ProductCard } from "./ProductCard";
import { Sparkles } from "lucide-react";
import katalogData from "@/data/katalog.json";
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

export function ProductCatalog() {
  // Modal states
  const [selectedCategoryForChart, setSelectedCategoryForChart] =
    React.useState<string | null>(null);
  const [selectedProductForOrder, setSelectedProductForOrder] =
    React.useState<ProductItem | null>(null);

  const products = katalogData as ProductItem[];

  return (
    <section
      id="katalog"
      aria-label="Katalog Produk Konveksi Nap's Vendor"
      className="py-16 md:py-24 bg-[#09090b] relative"
    >
      {/* Background glow decorator */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Reusable Section Header */}
        <SectionHeader
          badgeText="Katalog Digital & Portofolio Nap's"
          badgeIcon={<Sparkles className="w-3.5 h-3.5" aria-hidden="true" />}
          title="Katalog Produk Pilihan"
          subtitle="Pilih kategori apparel seragam custom Anda. Dapatkan kualitas bahan premium, presisi jahitan tinggi, dan pemesanan langsung via WhatsApp Admin."
        />

        {/* Product Carousel Display */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            {/* Header Controls */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold tracking-tight text-white">
                Koleksi Terpopuler
              </h3>
              <div className="flex items-center gap-2">
                <CarouselPrevious
                  className="static translate-y-0 translate-x-0 h-10 w-10 border-zinc-800 bg-zinc-900 text-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400 focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Geser ke produk sebelumnya"
                />
                <CarouselNext
                  className="static translate-y-0 translate-x-0 h-10 w-10 border-zinc-800 bg-zinc-900 text-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400 focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Geser ke produk berikutnya"
                />
              </div>
            </div>

            <CarouselContent className="-ml-4">
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="h-full">
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
