import type { Metadata } from "next";
import {
  Shirt,
  User,
  Trophy,
  Target,
  ArrowRight,
  Sparkles,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGeneralWAUrl } from "@/lib/whatsapp";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Tentang Kami & Lokasi Workshop",
  description:
    "Profil Nap's Vendor Jember - Produsen dan konveksi seragam custom terpercaya sejak 2022 di Jember. Melayani puluhan organisasi mahasiswa, instansi, dan komunitas.",
  keywords: [
    "Tentang Nap's Vendor",
    "Konveksi Terpercaya Jember",
    "Alamat Konveksi Jember",
    "Workshop Nap's Vendor",
    "Vendor Seragam Jember",
  ],
  openGraph: {
    title: "Tentang Nap's Vendor Jember | Konveksi Custom Terpercaya",
    description:
      "Mitra konveksi pilihan utama di Jember sejak 2022. Melayani pembuatan PDH, Vest, Kaos, dan merchandise custom dengan standar kualitas tinggi.",
    url: "https://napsvendor.com/tentang",
    images: [
      {
        url: "/images/portfolio/detail.webp",
        width: 800,
        height: 600,
        alt: "Workshop & Portofolio Nap's Vendor Jember",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentang Nap's Vendor Jember | Konveksi Custom Terpercaya",
    description:
      "Produsen seragam terpercaya di Jember sejak 2022. Kualitas bahan pilihan dan jahitan presisi.",
    images: ["/images/portfolio/detail.webp"],
  },
  alternates: {
    canonical: "/tentang",
  },
};

export default function TentangPage() {
  return (
    <div className="py-16 md:py-24 bg-[#09090b] relative overflow-hidden">
      {/* Background Decorators */}
      <div
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        aria-hidden="true"
      ></div>
      <div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        aria-hidden="true"
      ></div>
      <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,rgba(251,207,23,0.1)_0%,transparent_50%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Semantic H1 for SEO */}
        <SectionHeader
          isMainPageTitle
          badgeText="Tentang Kami"
          badgeIcon={<Sparkles className="w-3.5 h-3.5" aria-hidden="true" />}
          title={
            <>
              Tentang <span className="text-primary">Nap's Vendor</span>
            </>
          }
          subtitle="Produsen seragam terpercaya di Jember sejak 2022. Dengan pengalaman dalam melayani berbagai institusi pendidikan dan organisasi, kami berkomitmen menyediakan produk berkualitas dengan harga kompetitif."
        />

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Google Maps Embed & Social Proof */}
          <div className="relative">
            <div className="aspect-[4/3] sm:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 relative bg-zinc-900 group">
              <iframe
                title="Peta Lokasi Workshop Nap's Vendor Jember"
                src="https://maps.google.com/maps?q=-8.2036637,113.6978438&hl=id&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[25%] contrast-[1.1] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />

              {/* Floating Link to Open Direct in Google Maps App */}
              <a
                href="https://maps.app.goo.gl/bQHGJxqqzi674njT6"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Buka lokasi Nap's Vendor di aplikasi Google Maps (tab baru)"
                className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-950/90 text-white border border-primary/40 hover:bg-primary hover:text-black transition-all shadow-lg backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <MapPin className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                <span>Buka Google Maps</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>

            {/* Stats Overlay */}
            <div className="absolute -bottom-8 -right-4 bg-zinc-950/90 backdrop-blur-xl border border-primary/30 p-6 rounded-2xl w-64 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  2022
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wide">
                    Berdiri Sejak
                  </p>
                  <h3 className="text-2xl font-bold text-white">2022</h3>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  50+
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wide">
                    Klien Terlayani
                  </p>
                  <h3 className="text-2xl font-bold text-white">50+ Klien</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Mission, Vision, Values */}
          <div className="space-y-12">
            {/* Mission */}
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                <Shirt className="w-7 h-7" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Misi Kami
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Memberikan solusi seragam berkualitas tinggi yang profesional
                  dan terjangkau bagi institusi pendidikan, komunitas, serta
                  organisasi di Jember dan sekitarnya.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                <Trophy className="w-7 h-7" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Visi Kami
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Menjadi mitra konveksi terpercaya pilihan utama di Indonesia
                  Timur, dikenal karena kualitas produk, pelayanan cepat, dan
                  kepuasan pelanggan.
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Nilai Inti</h3>
              <div className="grid grid-cols-2 gap-4">
                {["Kualitas", "Detail", "Presisi", "Kepuasan Pelanggan"].map(
                  (value) => (
                    <div key={value} className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <a
                href={getGeneralWAUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Diskusikan kebutuhan seragam Anda melalui WhatsApp Admin"
                className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
              >
                <Button variant="whatsapp" className="gap-2 group">
                  <User className="w-4 h-4" aria-hidden="true" />
                  Diskusikan Kebutuhan Anda
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
