"use client";

import * as React from "react";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Sparkles, ZoomIn } from "lucide-react";
import portfolioData from "@/data/portfolio.json";

export function ProofOfWork() {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  return (
    <section
      id="portofolio"
      className="py-16 md:py-24 bg-[#050507] border-t border-border/60 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            Bukti Kualitas & Workshop
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Proof of Work & Detail Jahitan
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Lihat langsung kerapian obras, simetrisnya bordir komputer, serta
            hasil akhir pesanan kemeja, vest, & jaket di workshop Nap's Vendor
            Jember.
          </p>
        </div>

        {/* Masonry Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioData.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.image)}
              className="group relative overflow-hidden rounded-xl border border-border bg-[#121215] cursor-pointer transition-all duration-300 hover:border-primary/60 hover:shadow-2xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/600x450/18181b/facc15?text=${encodeURIComponent(item.title)}`;
                  }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                {/* Top Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider bg-zinc-950/80 text-yellow-400 border border-yellow-500/30">
                    {item.category}
                  </span>
                </div>

                {/* Hover Zoom Icon */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-primary text-zinc-950 flex items-center justify-center shadow-lg">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Title & Description */}
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Banner Footer */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-[#121215] to-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 text-primary flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                Garansi Kualitas Jahitan & Ukuran Presisi
              </h4>
              <p className="text-xs text-muted-foreground">
                Setiap produk melewati proses quality control ketat sebelum
                pengiriman.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/62801336295556?text=Halo%20Admin%20Nap's,%20saya%20ingin%20tanya%20sampel%20bahan%20dan%20portofolio"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold border border-zinc-700 transition-colors shrink-0"
          >
            Minta Sampel Bahan via WA
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-xl border border-border bg-zinc-900 p-2">
            <img
              src={selectedImage}
              alt="Portofolio Preview"
              className="max-h-[85vh] w-auto object-contain rounded-lg"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/800x600/18181b/facc15?text=Nap's+Vendor+Jember+Portofolio";
              }}
            />
            <p className="text-center text-xs text-zinc-400 mt-2">
              Klik di mana saja untuk menutup
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
