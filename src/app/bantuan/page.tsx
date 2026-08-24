import type { Metadata } from "next";
import { OrderTimelineSection } from "@/components/home/OrderTimelineSection";
import { SizeChartSection } from "@/components/home/SizeChartSection";
import { FAQSection } from "@/components/faq/FAQSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Pusat Bantuan & Panduan Ukuran",
  description:
    "Pusat bantuan pemesanan konveksi custom Nap's Vendor Jember: Panduan ukuran standar (Size Chart), alur proses order 4 langkah, dan FAQ seputar konveksi.",
  keywords: [
    "Size Chart Konveksi",
    "Panduan Ukuran PDH",
    "Cara Order Konveksi Jember",
    "FAQ Nap's Vendor",
    "Alur Pemesanan Seragam",
  ],
  openGraph: {
    title: "Pusat Bantuan & Size Chart | Nap's Vendor Jember",
    description:
      "Informasi lengkap cara pemesanan, panduan ukuran (size chart) kemeja/rompi/kaos, dan pertanyaan umum seputar konveksi.",
    url: "https://napsvendor.com/bantuan",
    images: [
      {
        url: "/images/produk/kaos_seragam.webp",
        width: 1200,
        height: 630,
        alt: "Pusat Bantuan Nap's Vendor Jember",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pusat Bantuan & Size Chart | Nap's Vendor Jember",
    description:
      "Panduan ukuran size chart & alur pemesanan seragam konveksi di Nap's Vendor Jember.",
    images: ["/images/produk/kaos_seragam.webp"],
  },
  alternates: {
    canonical: "/bantuan",
  },
};

export default function BantuanPage() {
  return (
    <div className="pt-12 bg-[#09090b]">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <SectionHeader
          isMainPageTitle
          badgeText="Pusat Bantuan & Informasi"
          badgeIcon={<HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />}
          title="Panduan Pemesanan & Size Chart"
          subtitle="Pelajari tahapan pemesanan seragam custom, cek standar ukuran pakaian, dan temukan jawaban dari pertanyaan yang sering diajukan."
        />
      </div>

      <OrderTimelineSection />
      <SizeChartSection />
      <FAQSection />
    </div>
  );
}
