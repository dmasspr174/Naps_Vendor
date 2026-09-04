"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Phone,
  Instagram,
  Shield,
  CheckCircle2,
  Clock,
} from "lucide-react";

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <footer
      aria-label="Footer Website"
      className="border-t border-slate-200 bg-white text-slate-500"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link
              href="/"
              aria-label="Nap's Vendor Jember Beranda"
              className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1 -ml-1 w-fit"
            >
              <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-black text-xl shadow-xs">
                N
              </div>
              <span className="font-heading text-xl font-bold text-slate-900 tracking-tight">
                Nap's <span className="text-amber-600">Vendor</span>
              </span>
            </Link>
            <p className="font-sans text-sm text-slate-500 leading-relaxed font-medium">
              Spesialis Konveksi Custom Jember (PDH, PDL, Vest, Jaket, Kaos).
              Kualitas jahitan presisi, bahan pilihan, & konsultasi desain
              gratis.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/62801336295556"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                aria-label="Hubungi WhatsApp Nap's Vendor"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com/napsvendorjember_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                aria-label="Kunjungi Profil Instagram Nap's Vendor"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-heading text-xs font-bold text-slate-900 uppercase tracking-wider">
              Navigasi Halaman
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link
                  href="/"
                  className="hover:text-amber-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog"
                  className="hover:text-amber-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm"
                >
                  Katalog Produk
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang"
                  className="hover:text-amber-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm"
                >
                  Tentang Kami & Lokasi
                </Link>
              </li>
              <li>
                <Link
                  href="/bantuan"
                  className="hover:text-amber-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm"
                >
                  Pusat Bantuan & Size Chart
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="hover:text-amber-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Guarantee */}
          <div className="space-y-3">
            <h3 className="font-heading text-xs font-bold text-slate-900 uppercase tracking-wider">
              Keunggulan Nap's
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2
                  className="w-4 h-4 text-amber-500 shrink-0"
                  aria-hidden="true"
                />
                <span>Bahan Nagata / American Drill Original</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2
                  className="w-4 h-4 text-amber-500 shrink-0"
                  aria-hidden="true"
                />
                <span>Bordir Komputer Rapi & Detail</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2
                  className="w-4 h-4 text-amber-500 shrink-0"
                  aria-hidden="true"
                />
                <span>Gratis Pembuatan Mockup Desain 2D</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2
                  className="w-4 h-4 text-amber-500 shrink-0"
                  aria-hidden="true"
                />
                <span>Garansi Kualitas Presisi Jahitan</span>
              </li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h3 className="font-heading text-xs font-bold text-slate-900 uppercase tracking-wider">
              Workshop & Jam Kerja
            </h3>
            <div className="space-y-3 text-sm font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin
                  className="w-4 h-4 text-amber-500 shrink-0 mt-1"
                  aria-hidden="true"
                />
                <span>
                  Jember, Jawa Timur - Indonesia (Melayani Pengiriman
                  Se-Indonesia)
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock
                  className="w-4 h-4 text-amber-500 shrink-0"
                  aria-hidden="true"
                />
                <span>Senin - Sabtu: 08:00 - 17:00 WIB</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Shield
                  className="w-4 h-4 text-amber-500 shrink-0"
                  aria-hidden="true"
                />
                <span>Pemesanan Langsung via WhatsApp Admin</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            © {new Date().getFullYear()} Nap's Vendor Jember. Hak cipta
            dilindungi undang-undang.
          </p>
          <p className="flex items-center gap-1 text-slate-600 font-medium">
            Dibuat dengan presisi untuk kualitas konveksi terbaik.
          </p>
        </div>
      </div>
    </footer>
  );
}
