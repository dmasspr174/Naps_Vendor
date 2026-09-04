"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { getGeneralWAUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/catalog/ProductCard";

export function FloatingWA() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <aside aria-label="Kontak Cepat WhatsApp" className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip badge */}
      <span
        aria-hidden="true"
        className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 shadow-md"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
        Chat Admin Fast Response
      </span>

      <a
        href={getGeneralWAUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Konsultasi langsung via WhatsApp Admin (Buka di tab baru)"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/50"
      >
        <span
          className="absolute -inset-1 rounded-full bg-emerald-500 opacity-20 blur group-hover:opacity-40 transition-opacity"
          aria-hidden="true"
        ></span>
        <WhatsAppIcon className="w-7 h-7 relative z-10" />
      </a>
    </aside>
  );
}
