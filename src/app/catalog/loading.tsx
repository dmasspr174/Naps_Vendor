import * as React from "react";
import { CatalogGridSkeleton } from "@/components/skeletons";

export default function CatalogLoading() {
  return (
    <div className="w-full min-h-screen bg-slate-50 animate-in fade-in duration-300">
      <CatalogGridSkeleton />
    </div>
  );
}
