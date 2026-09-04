import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton for individual ProductCard matching exact 4/3 image + title + bahan/moq + button structure
 */
export function ProductCardSkeleton() {
  return (
    <article className="relative flex flex-col h-full w-full justify-between overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] w-full bg-slate-100/90 shrink-0 overflow-hidden">
        <Skeleton className="w-full h-full rounded-none" />
        <div className="absolute top-3 left-3">
          <Skeleton className="w-16 h-5 rounded-md" />
        </div>
        <div className="absolute bottom-3 right-3">
          <Skeleton className="w-20 h-6 rounded-lg" />
        </div>
      </div>

      {/* Content Details Skeleton */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 space-y-4">
        <div className="space-y-3">
          <Skeleton className="h-5 w-4/5 rounded-md" />
          <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="mt-4">
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </div>
    </article>
  );
}

/**
 * Skeleton for the HeroSection
 */
export function HeroSectionSkeleton() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-50 py-16 md:py-24 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Skeleton */}
          <div className="lg:col-span-7 space-y-6">
            <Skeleton className="h-7 w-56 rounded-full" />
            <div className="space-y-3">
              <Skeleton className="h-12 w-4/5 rounded-xl" />
              <Skeleton className="h-12 w-3/5 rounded-xl" />
            </div>
            <div className="space-y-2 max-w-xl">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-5/6 rounded-md" />
              <Skeleton className="h-4 w-2/3 rounded-md" />
            </div>
            <div className="pt-2 flex flex-wrap gap-3">
              <Skeleton className="h-9 w-36 rounded-xl" />
              <Skeleton className="h-9 w-44 rounded-xl" />
              <Skeleton className="h-9 w-48 rounded-xl" />
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-12 w-48 rounded-xl" />
              <Skeleton className="h-12 w-48 rounded-xl" />
            </div>
          </div>

          {/* Right Card Skeleton */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
              <Skeleton className="aspect-[4/3] w-full rounded-xl" />
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Skeleton className="h-14 rounded-xl" />
                <Skeleton className="h-14 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Skeleton for SectionHeader
 */
export function SectionHeaderSkeleton({ centered = true }: { centered?: boolean }) {
  return (
    <div className={`space-y-3 mb-10 md:mb-14 ${centered ? "text-center max-w-3xl mx-auto flex flex-col items-center" : "text-left max-w-2xl"}`}>
      <Skeleton className="h-6 w-36 rounded-full" />
      <Skeleton className="h-9 sm:h-10 w-3/4 max-w-md rounded-xl" />
      <Skeleton className="h-4 w-full max-w-lg rounded-md" />
    </div>
  );
}

/**
 * Skeleton for the ProductCatalog Carousel
 */
export function ProductCatalogSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeaderSkeleton />
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-7 w-44 rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
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
    </section>
  );
}

/**
 * Skeleton for Catalog Grid Page (/catalog)
 */
export function CatalogGridSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeaderSkeleton />
        
        {/* Controls Skeleton */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex gap-2 p-1.5 bg-slate-100 border border-slate-200/80 rounded-xl w-full md:w-auto overflow-x-auto">
            <Skeleton className="h-9 w-20 rounded-lg" />
            <Skeleton className="h-9 w-24 rounded-lg" />
            <Skeleton className="h-9 w-24 rounded-lg" />
            <Skeleton className="h-9 w-20 rounded-lg" />
            <Skeleton className="h-9 w-24 rounded-lg" />
          </div>
          <Skeleton className="h-11 w-full md:w-72 rounded-xl" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-full">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Skeleton for ProofOfWork Section
 */
export function ProofOfWorkSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeaderSkeleton />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm aspect-[4/3]">
              <Skeleton className="w-full h-full rounded-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
