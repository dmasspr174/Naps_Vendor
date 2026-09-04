import * as React from "react";
import { SectionHeaderSkeleton } from "@/components/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function TentangLoading() {
  return (
    <div className="w-full min-h-screen bg-slate-50 py-16 md:py-24 animate-in fade-in duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeaderSkeleton />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-64 rounded-2xl bg-white border border-slate-100 shadow-sm" />
          <Skeleton className="h-64 rounded-2xl bg-white border border-slate-100 shadow-sm" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-28 rounded-2xl bg-white border border-slate-100 shadow-sm" />
          <Skeleton className="h-28 rounded-2xl bg-white border border-slate-100 shadow-sm" />
          <Skeleton className="h-28 rounded-2xl bg-white border border-slate-100 shadow-sm" />
          <Skeleton className="h-28 rounded-2xl bg-white border border-slate-100 shadow-sm" />
        </div>
      </div>
    </div>
  );
}
