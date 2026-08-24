import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWA } from "@/components/layout/FloatingWA";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://napsvendor.com"),
  title: {
    default: "Nap's Vendor Jember | Konveksi Custom PDH, Jaket, Vest & Kaos",
    template: "%s | Nap's Vendor Jember",
  },
  description:
    "Website Resmi Katalog & Portofolio Nap's Vendor Jember. Spesialis konveksi custom PDH BEM, PDL, Vest Organisasi, Workshirt, Jaket & Kaos Polo berkualitas tinggi dengan bordir komputer presisi.",
  keywords: [
    "Konveksi Jember",
    "Nap's Vendor",
    "Nap's Vendor Jember",
    "Konveksi PDH Jember",
    "PDH BEM Jember",
    "Vest Organisasi",
    "Rompi Custom",
    "Workshirt Jember",
    "Seragam Custom Jember",
    "Kaos Polo Custom",
    "Bordir Komputer Jember",
    "Nagata Drill Jember",
  ],
  authors: [{ name: "Nap's Vendor Jember" }],
  creator: "Nap's Vendor Jember",
  publisher: "Nap's Vendor Jember",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://napsvendor.com",
    siteName: "Nap's Vendor Jember",
    title: "Nap's Vendor Jember | Konveksi Custom PDH, Jaket, Vest & Kaos",
    description:
      "Spesialis Konveksi Custom PDH, PDL, Vest, Jaket & Kaos berkualitas tinggi di Jember. Konsultasi desain gratis dan pemesanan langsung via WhatsApp Admin.",
    images: [
      {
        url: "/images/produk/kaos_seragam.webp",
        width: 1200,
        height: 630,
        alt: "Katalog & Portofolio Konveksi Nap's Vendor Jember",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nap's Vendor Jember | Konveksi Custom PDH, Jaket, Vest & Kaos",
    description:
      "Spesialis Konveksi Custom PDH, PDL, Vest, Jaket & Kaos di Jember. Jahitan rapi, bordir komputer presisi, order mudah via WA.",
    images: ["/images/produk/kaos_seragam.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark scroll-smooth">
      <body
        className={`${inter.variable} antialiased min-h-screen flex flex-col bg-[#09090b] text-foreground selection:bg-primary selection:text-zinc-950`}
      >
        {/* a11y: Skip to main content link for screen readers and keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-zinc-950 focus:font-bold focus:rounded-md focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Lewati ke konten utama
        </a>

        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingWA />
      </body>
    </html>
  );
}
