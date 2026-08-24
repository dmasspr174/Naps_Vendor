"use client";

import * as React from "react";
import Image from "next/image";
import { ShieldCheck, Sparkles, ZoomIn, X } from "lucide-react";
import portfolioDataRaw from "@/data/portfolio.json";
import { PortfolioItem } from "@/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getGeneralWAUrl } from "@/lib/whatsapp";

const portfolioData = portfolioDataRaw as PortfolioItem[];

export function ProofOfWork() {
  const [selectedImage, setSelectedImage] = React.useState<PortfolioItem | null>(
    null
  );

  return (
    <section
      id="portofolio"
      aria-label="Portofolio & Bukti Kualitas Produksi"
      className="py-16 md:py-24 bg-[#050507] border-t border-border/60 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          badgeText="Bukti Kualitas & Workshop"
          badgeIcon={<ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />}
          title="Proof of Work & Detail Jahitan"
          subtitle="Lihat langsung kerapian obras, simetrisnya bordir komputer, serta hasil akhir pesanan kemeja, vest, & jaket di workshop Nap's Vendor Jember."
        />

        {/* Masonry Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {portfolioData.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              aria-label={`Perbesar foto portofolio: ${item.title}`}
              onClick={() => setSelectedImage(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedImage(item);
                }
              }}
              className="group relative overflow-hidden rounded-xl border border-border bg-[#121215] cursor-pointer transition-all duration-300 hover:border-primary/60 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                <Image
                  src={item.image}
                  alt={`Dokumentasi hasil jahitan: ${item.title} - ${item.description}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Sleek Hover Zoom Overlay */}
                <div
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/40 group-focus-visible:bg-black/40 transition-colors flex items-center justify-center pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="w-10 h-10 rounded-full bg-primary text-zinc-950 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 scale-75 group-hover:scale-100 transition-all shadow-xl">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider bg-zinc-950/85 text-yellow-400 border border-yellow-500/30 backdrop-blur-md shadow-md">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Banner Footer */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-[#121215] to-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 text-primary flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Garansi Kualitas Jahitan & Ukuran Presisi
              </h3>
              <p className="text-xs text-muted-foreground">
                Setiap produk melewati proses quality control ketat sebelum
                pengiriman ke konsumen.
              </p>
            </div>
          </div>
          <a
            href={getGeneralWAUrl("Halo Admin Nap's Vendor, saya ingin bertanya mengenai sampel bahan kain dan portofolio.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Minta sampel bahan kain via WhatsApp Admin"
            className="px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold border border-zinc-700 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Minta Sampel Bahan via WA
          </a>
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md cursor-pointer animate-in fade-in duration-200"
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-xl border border-border bg-zinc-900 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800">
              <h4 className="text-sm font-bold text-white">{selectedImage.title}</h4>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                aria-label="Tutup jendela pratinjau foto"
                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] w-full max-h-[70vh] rounded-lg overflow-hidden bg-zinc-950">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                sizes="(max-width: 1200px) 90vw, 1000px"
                className="object-contain"
              />
            </div>
            <p className="text-center text-xs text-zinc-400 mt-3">
              {selectedImage.description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
