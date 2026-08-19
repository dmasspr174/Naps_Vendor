"use client";

import * as React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Ruler, Layers, Sparkles } from "lucide-react";
import { getWhatsAppOrderUrl } from "@/lib/whatsapp";

export interface ProductItem {
  id: string;
  nama: string;
  jenis: string;
  gambar: string;
  bahan: string;
}

interface ProductCardProps {
  product: ProductItem;
  onOpenSizeChart: (category: string) => void;
  onOpenOrderModal: (product: ProductItem) => void;
}

export function ProductCard({
  product,
  onOpenSizeChart,
  onOpenOrderModal,
}: ProductCardProps) {
  // Direct WhatsApp URL fallback
  const directWaUrl = getWhatsAppOrderUrl({
    namaProduk: product.nama,
    jenis: product.jenis,
    bahan: product.bahan,
  });

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-[#121215] transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl hover:shadow-yellow-500/5">
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
        <img
          src={product.gambar}
          alt={product.nama}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Fallback SVG image if image path is not yet present
            e.currentTarget.src = `https://placehold.co/600x450/18181b/facc15?text=${encodeURIComponent(product.nama)}`;
          }}
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-zinc-950/85 backdrop-blur-md text-primary border border-primary/30 shadow-md">
            <Layers className="w-3 h-3 text-primary" />
            {product.jenis}
          </span>
        </div>

        {/* Quick Size Chart Floating Trigger */}
        <button
          onClick={() => onOpenSizeChart(product.jenis)}
          className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-zinc-950/80 text-zinc-300 hover:text-white hover:bg-zinc-900 border border-zinc-700/80 backdrop-blur-sm transition-all shadow-lg"
          title="Lihat Size Chart"
        >
          <Ruler className="w-3.5 h-3.5 text-primary" />
          <span>Size Chart</span>
        </button>
      </div>

      {/* Product Content Details */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
            {product.nama}
          </h3>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-zinc-800/60">
            <span className="flex items-center gap-1">
              <span className="font-semibold text-zinc-300">Bahan:</span>{" "}
              {product.bahan}
            </span>
            <span className="text-[11px] text-emerald-400 font-medium px-1.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/40">
              MOQ 12 Pcs
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex ">
          <Button
            variant="whatsapp"
            size="sm"
            onClick={() => onOpenOrderModal(product)}
            className="w-full text-xs gap-1.5 font-bold"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            Pesan WA
          </Button>
        </div>
      </div>
    </div>
  );
}
