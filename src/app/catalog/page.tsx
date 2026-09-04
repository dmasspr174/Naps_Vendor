import type { Metadata } from "next";
import { CatalogGridClient } from "@/components/catalog/CatalogGridClient";
import { getPublicCatalog } from "@/lib/katalog";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Katalog Produk Konveksi Custom",
  description:
    "Jelajahi katalog lengkap produk konveksi Nap's Vendor Jember: Kemeja PDH/PDL, Rompi Vest Organisasi, Workshirt, Kaos Polo Bordir, dan ID Card. Bahan premium Nagata & American Drill.",
  keywords: [
    "Katalog Konveksi Jember",
    "Katalog PDH",
    "Pesan Kemeja BEM",
    "Rompi Vest Custom Jember",
    "Workshirt Custom",
    "Kaos Bordir Jember",
    "Harga Konveksi Jember",
  ],
  openGraph: {
    title: "Katalog Produk Konveksi Custom | Nap's Vendor Jember",
    description:
      "Lihat daftar lengkap apparel seragam custom berkualitas: Kemeja PDH, Vest Rompi, Workshirt & Kaos dengan jahitan presisi dan bahan pilihan.",
    url: "https://naps-vendor.vercel.app/catalog",
    images: [
      {
        url: "/images/produk/pdh_bem_fasilkom.webp",
        width: 800,
        height: 600,
        alt: "Katalog PDH & Rompi Custom Nap's Vendor Jember",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Katalog Produk Konveksi Custom | Nap's Vendor Jember",
    description:
      "Koleksi seragam custom PDH, Vest, Workshirt, & Kaos Polo. Konsultasi gratis via WhatsApp.",
    images: ["/images/produk/pdh_bem_fasilkom.webp"],
  },
  alternates: {
    canonical: "/catalog",
  },
};

export default async function CatalogPage() {
  const products = await getPublicCatalog();
  return <CatalogGridClient initialProducts={products} />;
}
