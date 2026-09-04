import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { ProofOfWork } from "@/components/portfolio/ProofOfWork";
import { OrderTimelineSection } from "@/components/home/OrderTimelineSection";
import { FAQSection } from "@/components/faq/FAQSection";
import { ProductCatalog } from "@/components/catalog/ProductCatalog";
import { SizeChartSection } from "@/components/home/SizeChartSection";
import { getPublicCatalog } from "@/lib/katalog";

export const metadata: Metadata = {
  title: "Nap's Vendor Jember | Konveksi Custom PDH, Jaket, Vest & Kaos",
  description:
    "Spesialis Konveksi Custom PDH BEM, PDL, Vest Organisasi, Workshirt, Jaket & Kaos di Jember. Jahitan rapi, bordir komputer presisi tinggi, dan konsultasi desain langsung via WhatsApp.",
  keywords: [
    "Konveksi Jember",
    "Nap's Vendor",
    "Nap's Vendor Jember",
    "PDH BEM Jember",
    "Vest Organisasi Jember",
    "Workshirt Jember",
    "Konveksi Seragam Mahasiswa Jember",
    "Bordir Komputer Jember",
    "Nagata Drill Jember",
  ],
  openGraph: {
    title: "Nap's Vendor Jember | Konveksi Custom PDH, Jaket, Vest & Kaos",
    description:
      "Spesialis konveksi custom terpercaya di Jember. Melayani puluhan organisasi dan institusi dengan jaminan kualitas jahitan rapi & bordir komputer detail.",
    url: "https://napsvendor.com",
    images: [
      {
        url: "/images/produk/kaos_seragam.webp",
        width: 1200,
        height: 630,
        alt: "Nap's Vendor Jember - Spesialis Konveksi Custom",
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
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const products = await getPublicCatalog();

  return (
    <>
      <HeroSection />
      <ProductCatalog initialProducts={products} />
      <ProofOfWork />
      <OrderTimelineSection />
      <SizeChartSection />
      <FAQSection />
    </>
  );
}
