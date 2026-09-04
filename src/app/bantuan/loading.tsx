import * as React from "react";
import { SectionHeaderSkeleton } from "@/components/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function BantuanLoading() {
  return (
    <div className="w-full min-h-screen bg-slate-50 py-16 md:py-24 animate-in fade-in duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeaderSkeleton />
        <div className="space-y-4">
          <Skeleton className="h-16 w-full rounded-2xl bg-white border border-slate-100 shadow-sm" />
          <Skeleton className="h-16 w-full rounded-2xl bg-white border border-slate-100 shadow-sm" />
          <Skeleton className="h-16 w-full rounded-2xl bg-white border border-slate-100 shadow-sm" />
          <Skeleton className="h-16 w-full rounded-2xl bg-white border border-slate-100 shadow-sm" />
        </div>
      </div>
    </div>
  );
}
