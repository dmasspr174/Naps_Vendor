"use client";

import * as React from "react";
import Image from "next/image";
import { ShieldCheck, Sparkles, ZoomIn, X, MessageSquare } from "lucide-react";
import portfolioDataRaw from "@/data/portfolio.json";
import { PortfolioItem } from "@/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
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
      className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/60 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          badgeText="Bukti Kualitas & Workshop"
          badgeIcon={<ShieldCheck className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />}
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
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
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
                  className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 group-focus-visible:bg-slate-900/30 transition-colors flex items-center justify-center pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 scale-75 group-hover:scale-100 transition-all shadow-md">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>

                {/* Top Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-slate-900 border border-slate-200/60 backdrop-blur-md shadow-xs">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Banner Footer */}
        <div className="mt-12 p-6 md:p-8 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200/60 text-amber-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-heading text-base md:text-lg font-bold text-slate-900">
                Garansi Kualitas Jahitan & Ukuran Presisi
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-500 font-medium">
                Setiap produk melewati proses quality control ketat sebelum pengiriman ke konsumen.
              </p>
            </div>
          </div>
          <a
            href={getGeneralWAUrl("Halo Admin Nap's Vendor, saya ingin bertanya mengenai sampel bahan kain dan portofolio.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
          >
            <Button variant="whatsapp" className="w-full md:w-auto gap-2">
              <MessageSquare className="w-4 h-4 fill-current" aria-hidden="true" />
              Tanya Portofolio via WA
            </Button>
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-sm cursor-pointer animate-in fade-in duration-200"
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <h4 className="font-heading text-base font-bold text-slate-900">{selectedImage.title}</h4>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                aria-label="Tutup jendela pratinjau foto"
                className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] w-full max-h-[70vh] rounded-xl overflow-hidden bg-slate-100">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                sizes="(max-width: 1200px) 90vw, 1000px"
                className="object-contain"
              />
            </div>
            <p className="font-sans text-center text-xs sm:text-sm text-slate-500 font-medium mt-3">
              {selectedImage.description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
