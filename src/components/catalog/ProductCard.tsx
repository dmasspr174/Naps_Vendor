"use client";

import * as React from "react";
import Image from "next/image";
import { Ruler, Layers } from "lucide-react";
import { ProductItem } from "@/types";

export type { ProductItem };

export function WhatsAppIcon({ className = "w-4 h-4 shrink-0" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="#fff"
        d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6	C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"
      />
      <path
        fill="#fff"
        d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6	C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3	L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"
      />
      <path
        fill="#cfd8dc"
        d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3	L4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24	c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2	c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"
      />
      <path
        fill="#40c351"
        d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8	l6-1.6l0.6,0.3c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0	s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3	c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9	c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8	c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8C20.6,19.3,19.7,17,19.3,16z"
      />
    </svg>
  );
}

export const SAMPLE_DUMMY_PRODUCT: ProductItem = {
  id: "pdh-001",
  nama: "PDH BEM FASILKOM",
  jenis: "Kemeja",
  bahan: "Nagata Drill",
  gambar: "/images/produk/pdh_bem_fasilkom.webp",
};

export interface ProductCardProps {
  product?: ProductItem;
  onOpenSizeChart?: (category: string) => void;
  onOpenOrderModal?: (product: ProductItem) => void;
}

export function ProductCard({
  product = SAMPLE_DUMMY_PRODUCT,
  onOpenSizeChart,
  onOpenOrderModal,
}: ProductCardProps) {
  const [imgSrc, setImgSrc] = React.useState(product.gambar);

  const handleWhatsAppClick = () => {
    if (onOpenOrderModal) {
      onOpenOrderModal(product);
      return;
    }
    const message = encodeURIComponent(
      `Halo Nap's Vendor, saya tertarik konsultasi pemesanan produk ${product.nama} (${product.jenis}) dengan bahan ${product.bahan}. Mohon info detailnya kak!`
    );
    window.open(`https://wa.me/62801336295556?text=${message}`, "_blank");
  };

  return (
    <article className="group relative flex flex-col h-full w-full justify-between overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md border border-slate-100 transition-all duration-300 hover:-translate-y-1">
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 shrink-0">
        <Image
          src={imgSrc}
          alt={`Katalog ${product.nama} - Nap's Vendor Jember`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          onError={() => {
            setImgSrc("/images/produk/kaos_seragam.webp");
          }}
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-400 text-slate-900 shadow-xs">
            <Layers className="w-3 h-3 text-slate-900" aria-hidden="true" />
            {product.jenis}
          </span>
        </div>

        {/* Size Chart Floating Trigger */}
        {onOpenSizeChart && (
          <button
            type="button"
            onClick={() => onOpenSizeChart(product.jenis)}
            aria-label={`Panduan ukuran untuk ${product.jenis}`}
            className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/95 text-slate-700 hover:text-slate-950 hover:bg-white shadow-xs backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <Ruler className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
            <span>Size Chart</span>
          </button>
        )}
      </div>

      {/* Product Content Details matching requested layout */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div className="space-y-3">
          <h3 className="font-heading text-sm sm:text-base font-bold text-slate-900 tracking-tight line-clamp-2 min-h-[2.5rem] flex items-center group-hover:text-amber-600 transition-colors">
            {product.nama}
          </h3>

          <div className="flex items-center justify-between gap-2 text-xs pt-2.5 border-t border-slate-100">
            <span className="truncate text-slate-600 min-w-0">
              <span className="text-slate-400 font-medium">Bahan:</span>{" "}
              <span className="font-semibold text-slate-800">{product.bahan}</span>
            </span>
            <span className="text-[10px] sm:text-[11px] text-emerald-700 font-semibold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200/60 shrink-0 whitespace-nowrap">
              MOQ 12 Pcs
            </span>
          </div>
        </div>

        {/* Action Button: Pesan WA */}
        <div className="mt-4 flex">
          <button
            type="button"
            onClick={handleWhatsAppClick}
            aria-label={`Pesan ${product.nama} via WhatsApp`}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>Pesan WA</span>
          </button>
        </div>
      </div>
    </article>
  );
}
