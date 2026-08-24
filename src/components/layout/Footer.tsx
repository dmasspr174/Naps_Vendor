import * as React from "react";
import Link from "next/link";
import { MapPin, Phone, Instagram, Shield, CheckCircle2, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer aria-label="Footer Website" className="border-t border-border bg-[#050507] text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link
              href="/"
              aria-label="Nap's Vendor Jember Beranda"
              className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md p-1 -ml-1 w-fit"
            >
              <div className="w-9 h-9 rounded-full bg-primary text-zinc-950 flex items-center justify-center font-black text-lg">
                N
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Nap's <span className="text-primary">Vendor</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Spesialis Konveksi Custom Jember (PDH, PDL, Vest, Jaket, Kaos). Kualitas jahitan presisi, bahan pilihan, & konsultasi desain gratis.
            </p>
            <div className="flex items-center gap-3 text-zinc-300 pt-2">
              <a
                href="https://wa.me/62801336295556"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-primary hover:text-zinc-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Hubungi WhatsApp Nap's Vendor"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com/napsvendorjember_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-primary hover:text-zinc-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Kunjungi Profil Instagram Nap's Vendor"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Navigasi Halaman</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                  Katalog Produk
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                  Tentang Kami & Lokasi
                </Link>
              </li>
              <li>
                <Link href="/bantuan" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                  Pusat Bantuan & Size Chart
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Guarantee */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Keunggulan Nap's</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span>Bahan Nagata / American Drill Original</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span>Bordir Komputer Rapi & Detail</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span>Gratis Pembuatan Mockup Desain 2D</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span>Garansi Retur Bila Ada Cacat Jahitan</span>
              </li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Workshop & Jam Kerja</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" aria-hidden="true" />
                <span>Jember, Jawa Timur - Indonesia (Melayani Pengiriman Se-Indonesia)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span>Senin - Sabtu: 08:00 - 17:00 WIB</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span>Pemesanan Langsung via WhatsApp Admin</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>© {new Date().getFullYear()} Nap's Vendor Jember. Hak cipta dilindungi undang-undang.</p>
          <p className="flex items-center gap-1 text-zinc-300">
            Dibuat dengan presisi untuk kualitas konveksi terbaik.
          </p>
        </div>
      </div>
    </footer>
  );
}
