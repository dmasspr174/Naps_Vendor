import * as React from "react";
import { HeroSectionSkeleton, ProductCatalogSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-slate-50 animate-in fade-in duration-300">
      <HeroSectionSkeleton />
      <ProductCatalogSkeleton />
    </div>
  );
}
