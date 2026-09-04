"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-50 px-4 py-16 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-100 shadow-md text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
            Terjadi Kendala Memuat Halaman
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            Maaf, kami mengalami kendala teknis saat memuat data. Silakan coba muat ulang atau kembali ke halaman utama.
          </p>
        </div>

        {error.message && (
          <div className="p-3 bg-slate-50 rounded-xl text-[11px] font-mono text-slate-600 text-left overflow-x-auto border border-slate-200/60 max-h-24">
            {error.message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Coba Lagi
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
          >
            <Home className="w-4 h-4" />
            Ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
