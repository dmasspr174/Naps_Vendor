import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWA } from "@/components/layout/FloatingWA";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nap's Vendor Jember | Konveksi Custom PDH, Jaket, Vest & Kaos",
  description: "Website Katalog & Portofolio Nap's Vendor Jember - Spesialis Konveksi Custom PDH, PDL, Vest, Jaket, & Kaos berkualitas tinggi. Pemesanan langsung via WhatsApp Admin.",
  keywords: ["Konveksi Jember", "Nap's Vendor", "PDH BEM", "Vest Organisasi", "Workshirt Jember", "Seragam Custom Jember", "Kaos Polo Custom"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark scroll-smooth">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col bg-[#09090b] text-foreground`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWA />
      </body>
    </html>
  );
}
