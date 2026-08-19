import * as React from "react";
import Link from "next/link";
import { MapPin, Phone, Instagram, Shield, CheckCircle2, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#050507] text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary text-zinc-950 flex items-center justify-center font-black text-lg">
                N
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Nap's <span className="text-primary">Vendor</span>
              </span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Spesialis Konveksi Custom Jember (PDH, PDL, Vest, Jaket, Kaos). Kualitas jahitan presisi, bahan pilihan, & konsultasi desain gratis.
            </p>
            <div className="flex items-center gap-3 text-zinc-300 pt-2">
              <a
                href="https://wa.me/62801336295556"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-primary hover:text-zinc-950 transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/napsvendorjember_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-primary hover:text-zinc-950 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Kategori Produk</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#katalog" className="hover:text-primary transition-colors">PDH & Kemeja BEM</Link></li>
              <li><Link href="#katalog" className="hover:text-primary transition-colors">Vest & Rompi Organisasi</Link></li>
              <li><Link href="#katalog" className="hover:text-primary transition-colors">Workshirt Streetwear</Link></li>
              <li><Link href="#katalog" className="hover:text-primary transition-colors">Jaket Bomber & Coach</Link></li>
              <li><Link href="#katalog" className="hover:text-primary transition-colors">Kaos & Polo Custom</Link></li>
            </ul>
          </div>

          {/* Service Guarantee */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Keunggulan Nap's</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Bahan Nagata / American Drill Original</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Bordir Komputer Rapi & Detail</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Gratis Pembuatan Mockup Desain</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Garansi Retur Bila Ada Cacat Jahitan</span>
              </li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Workshop & Jam Kerja</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                <span>Jember, Jawa Timur - Indonesia (Siap Kirim Seluruh Indonesia)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>Senin - Sabtu: 08:00 - 17:00 WIB</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-primary shrink-0" />
                <span>Pemesanan Langsung via WhatsApp Admin</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Nap's Vendor Jember. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Dibuat dengan presisi untuk kualitas konveksi terbaik.
          </p>
        </div>
      </div>
    </footer>
  );
}
