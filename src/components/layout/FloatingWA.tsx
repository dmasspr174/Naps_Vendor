"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { getGeneralWAUrl } from "@/lib/whatsapp";

export function FloatingWA() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip badge on hover / view */}
      <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-900 border border-emerald-500/40 text-emerald-400 shadow-xl animate-bounce">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
        Chat Admin Fast Response
      </span>

      <a
        href={getGeneralWAUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pesan via WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-zinc-950 shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#20bd5a] focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
      >
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 blur group-hover:opacity-75 transition-opacity"></span>
        <MessageCircle className="w-8 h-8 fill-current relative z-10" />
      </a>
    </div>
  );
}
