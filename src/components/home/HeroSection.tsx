"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  ArrowRight,
  Sparkles,
  Award,
  Scissors,
  CheckCircle,
} from "lucide-react";
import { getGeneralWAUrl } from "@/lib/whatsapp";

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Hero Section Nap's Vendor Jember"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#09090b] py-16 md:py-24 border-b border-border/60"
    >
      {/* Background Lighting Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-yellow-500/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 shadow-sm animate-pulse-subtle">
              <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Spesialis Konveksi Custom Jember</span>
            </div>

            {/* Main Title H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Portofolio & Katalog Digital <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-yellow-300 via-primary to-amber-500 bg-clip-text text-transparent">
                Nap's Vendor Jember
              </span>
            </h1>

            {/* Subtitle Body */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Wujudkan seragam PDH, Vest Organisasi, Workshirt, Jaket, & Kaos
              custom berkualitas tinggi dengan presisi jahitan tinggi, bahan
              pilihan, dan konsultasi desain langsung via WhatsApp.
            </p>

            {/* Key Value Points Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-zinc-300 font-medium">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
                <Scissors className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>Jahitan Rapi & Presisi</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
                <Award className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>Bordir Komputer High Detail</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
                <CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />
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
                className="w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
              >
                <Button
                  variant="whatsapp"
                  size="lg"
                  className="w-full sm:w-auto gap-2 text-base shadow-xl"
                >
                  <MessageSquare className="w-5 h-5 fill-current" aria-hidden="true" />
                  Konsultasi / Order WA
                </Button>
              </a>

              <Link
                href="/catalog"
                aria-label="Buka halaman katalog produk Nap's Vendor"
                className="w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto gap-2 text-base border-zinc-700 hover:border-primary text-zinc-200"
                >
                  Lihat Katalog Produk
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>

            {/* Social Trust Stat */}
            <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-center lg:justify-start gap-6 text-xs text-zinc-400">
              <div>
                <span className="font-bold text-white text-base">100%</span>{" "}
                Custom Order
              </div>
              <div className="h-4 w-[1px] bg-zinc-800" aria-hidden="true"></div>
              <div>
                <span className="font-bold text-white text-base">
                  Nagata / American
                </span>{" "}
                Drill
              </div>
              <div className="h-4 w-[1px] bg-zinc-800" aria-hidden="true"></div>
              <div>
                <span className="font-bold text-white text-base">Fast</span>{" "}
                Response WA
              </div>
            </div>
          </div>

          {/* Right Visual Showcase Card (LCP Element) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl border border-zinc-800 bg-[#121215] p-4 shadow-2xl overflow-hidden group">
              {/* Highlight image showcase */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                <Image
                  src="/images/produk/kaos_seragam.webp"
                  alt="Foto produk unggulan seragam kerja bahan Nagata Drill dari Nap's Vendor Jember"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80 pointer-events-none"></div>

                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-zinc-800 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-white">
                      Seragam Kerja Custom
                    </h2>
                    <p className="text-xs text-zinc-400">
                      Bahan Nagata Drill Original
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-primary text-zinc-950 font-bold">
                    Best Seller
                  </span>
                </div>
              </div>

              {/* Floating feature pills */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-zinc-300">
                  <span className="text-muted-foreground block text-[10px]">
                    Minimal Order
                  </span>
                  <span className="font-semibold text-white">
                    12 Pcs (1 Lusin)
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-zinc-300">
                  <span className="text-muted-foreground block text-[10px]">
                    Pengerjaan
                  </span>
                  <span className="font-semibold text-white">
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
