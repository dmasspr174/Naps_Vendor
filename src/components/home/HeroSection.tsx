import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Award,
  Scissors,
  CheckCircle,
} from "lucide-react";
import { getGeneralWAUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/catalog/ProductCard";

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Hero Section Nap's Vendor Jember"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-50 py-16 md:py-24 border-b border-slate-200/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200/60 shadow-xs animate-pulse-subtle">
              <Sparkles className="w-4 h-4 text-amber-600" aria-hidden="true" />
              <span>Spesialis Konveksi Custom Jember</span>
            </div>

            {/* Main Title H1 */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
              Portofolio & Katalog Digital <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                Nap's Vendor Jember
              </span>
            </h1>

            {/* Subtitle Body */}
            <p className="font-sans text-base sm:text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Wujudkan seragam PDH, Vest Organisasi, Workshirt, Jaket, & Kaos
              custom berkualitas tinggi dengan presisi jahitan tinggi, bahan
              pilihan, dan konsultasi desain langsung via WhatsApp.
            </p>

            {/* Key Value Points Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5 text-xs sm:text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <Scissors className="w-4 h-4 text-amber-500" aria-hidden="true" />
                <span>Jahitan Rapi & Presisi</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <Award className="w-4 h-4 text-amber-500" aria-hidden="true" />
                <span>Bordir Komputer High Detail</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <CheckCircle className="w-4 h-4 text-amber-500" aria-hidden="true" />
                <span>Pemesanan Langsung Admin WA</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href={getGeneralWAUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Konsultasi atau order via WhatsApp Admin"
                className="w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
              >
                <Button
                  variant="whatsapp"
                  size="lg"
                  className="w-full sm:w-auto gap-2.5 text-base shadow-sm"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  Konsultasi / Order WA
                </Button>
              </a>

              <Link
                href="/catalog"
                aria-label="Buka halaman katalog produk Nap's Vendor"
                className="w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto gap-2 text-base border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 text-slate-700 shadow-xs"
                >
                  Lihat Katalog Produk
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>

            {/* Social Trust Stat */}
            <div className="pt-6 border-t border-slate-200/80 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
              <div>
                <span className="font-heading font-bold text-slate-900 text-base">100%</span>{" "}
                Custom Order
              </div>
              <div className="h-4 w-[1px] bg-slate-300" aria-hidden="true"></div>
              <div>
                <span className="font-heading font-bold text-slate-900 text-base">
                  Nagata / American
                </span>{" "}
                Drill
              </div>
              <div className="h-4 w-[1px] bg-slate-300" aria-hidden="true"></div>
              <div>
                <span className="font-heading font-bold text-slate-900 text-base">Fast</span>{" "}
                Response WA
              </div>
            </div>
          </div>

          {/* Right Visual Showcase Card (LCP Element) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl border border-slate-100 bg-white p-5 shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
              {/* Highlight image showcase */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                <Image
                  src="/images/produk/kaos_seragam.webp"
                  alt="Foto produk unggulan seragam kerja bahan Nagata Drill dari Nap's Vendor Jember"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-90 pointer-events-none"></div>

                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-slate-100 shadow-sm flex items-center justify-between">
                  <div>
                    <h2 className="font-heading text-sm font-bold text-slate-900">
                      Seragam Kerja Custom
                    </h2>
                    <p className="font-sans text-xs text-slate-500 font-medium">
                      Bahan Nagata Drill Original
                    </p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-amber-400 text-slate-900 font-bold shadow-xs">
                    Best Seller
                  </span>
                </div>
              </div>

              {/* Floating feature pills */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-600">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                    Minimal Order
                  </span>
                  <span className="font-heading font-bold text-slate-900 text-sm">
                    12 Pcs (1 Lusin)
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-600">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                    Pengerjaan
                  </span>
                  <span className="font-heading font-bold text-slate-900 text-sm">
                    10 - 14 Hari Kerja
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
