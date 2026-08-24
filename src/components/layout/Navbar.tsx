"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getGeneralWAUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Katalog", href: "/catalog" },
    { name: "Tentang", href: "/tentang" },
    { name: "Pusat Bantuan", href: "/bantuan" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-[#09090b]/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          aria-label="Nap's Vendor Jember - Halaman Utama"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b] rounded-lg p-1"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary text-zinc-950 font-black text-xl shadow-md group-hover:scale-105 transition-transform">
            N
            <span className="absolute -top-1 -right-1 flex h-3 w-3" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
              Nap's{" "}
              <span className="text-primary text-xs font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">
                Vendor
              </span>
            </span>
            <span className="text-[10px] text-muted-foreground tracking-wide uppercase">
              Konveksi Custom Jember
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav aria-label="Navigasi Utama" className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "transition-colors relative py-1 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm",
                  isActive
                    ? "text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary"
                    : "text-zinc-400 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary hover:after:w-full after:transition-all"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={getGeneralWAUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pesan seragam custom via WhatsApp Admin"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
          >
            <Button variant="whatsapp" className="gap-2 shadow-emerald-950/40">
              <MessageSquare className="w-4 h-4 fill-current" aria-hidden="true" />
              Pesan Sekarang
            </Button>
          </a>
        </div>

        {/* Mobile Hamburger Sheet Menu */}
        <div className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-300 focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Buka menu navigasi"
                aria-expanded={isOpen}
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] flex flex-col justify-between bg-zinc-950 border-zinc-800"
            >
              <div>
                <SheetHeader className="text-left mb-6">
                  <SheetTitle className="flex items-center gap-2 text-white">
                    <div className="w-8 h-8 rounded-full bg-primary text-zinc-950 flex items-center justify-center font-bold">
                      N
                    </div>
                    Nap's Vendor Jember
                  </SheetTitle>
                  <p className="text-xs text-muted-foreground">
                    Spesialis Konveksi Custom PDH, Jaket, Vest & Kaos
                  </p>
                </SheetHeader>

                <nav aria-label="Navigasi Menu Mobile" className="flex flex-col gap-2 py-4">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "text-base font-medium py-2.5 px-2 rounded-lg transition-colors border-b border-border/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                          isActive
                            ? "text-primary bg-primary/10 font-semibold"
                            : "text-zinc-300 hover:text-primary hover:bg-zinc-900"
                        )}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pb-6 border-t border-border/60 pt-4">
                <a
                  href={getGeneralWAUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  aria-label="Hubungi Admin Nap's Vendor via WhatsApp"
                  className="w-full block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                >
                  <Button variant="whatsapp" className="w-full gap-2">
                    <MessageSquare className="w-4 h-4 fill-current" aria-hidden="true" />
                    Pesan via WhatsApp
                  </Button>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
