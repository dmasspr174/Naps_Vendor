import * as React from "react";

/**
 * Admin katalog loading skeleton — shown by Next.js App Router
 * while the RSC server component fetches Supabase auth + catalog data.
 * Prevents layout shift and gives instant perceived load feedback.
 */
export default function AdminKatalogLoading() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans animate-pulse">
      {/* Top nav skeleton */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-200" />
            <div className="space-y-1.5">
              <div className="h-4 w-28 rounded-md bg-slate-200" />
              <div className="h-3 w-40 rounded-md bg-slate-100" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-24 rounded-lg bg-slate-100" />
            <div className="h-8 w-36 rounded-lg bg-slate-100" />
            <div className="h-9 w-28 rounded-xl bg-slate-200" />
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Stats cards skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-3">
              <div className="h-3 w-20 rounded bg-slate-200" />
              <div className="h-7 w-12 rounded bg-slate-200" />
            </div>
          ))}
        </div>

        {/* Toolbar skeleton */}
        <div className="flex items-center justify-between gap-4">
          <div className="h-10 w-full max-w-sm rounded-xl bg-slate-200" />
          <div className="flex gap-3">
            <div className="h-10 w-32 rounded-xl bg-slate-200" />
            <div className="h-10 w-32 rounded-xl bg-amber-200" />
          </div>
        </div>

        {/* Table skeleton */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-100">
            {[3, 2, 2, 2, 3].map((cols, i) => (
              <div key={i} className={`col-span-${cols} h-3 rounded bg-slate-100`} />
            ))}
          </div>
          {/* Data rows */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-50 items-center">
              <div className="col-span-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 shrink-0" />
                <div className="space-y-1.5">
                  <div className="h-3.5 w-32 rounded bg-slate-200" />
                  <div className="h-3 w-20 rounded bg-slate-100" />
                </div>
              </div>
              <div className="col-span-2">
                <div className="h-5 w-20 rounded-full bg-slate-100" />
              </div>
              <div className="col-span-2">
                <div className="h-3.5 w-28 rounded bg-slate-100" />
              </div>
              <div className="col-span-2">
                <div className="h-3 w-24 rounded bg-slate-100" />
              </div>
              <div className="col-span-3 flex gap-2 justify-end">
                <div className="h-8 w-8 rounded-lg bg-slate-100" />
                <div className="h-8 w-8 rounded-lg bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
