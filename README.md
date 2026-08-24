# 🧶 Nap's Vendor Jember — Web Catalog & Custom Apparel Platform

<p align="center">
  <a href="https://naps-vendor.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-naps--vendor.vercel.app-facc15?style=for-the-badge&logo=vercel&logoColor=black&labelColor=09090b" alt="Live Demo on Vercel" />
  </a>
  <img src="https://img.shields.io/badge/Next.js_15-App_Router-black?style=for-the-badge&logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/React_19-09090b?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
</p>

---

## 🌐 Live Website

Website resmi dan katalog digital Nap's Vendor Jember dapat diakses secara live di:  
👉 **[https://naps-vendor.vercel.app/](https://naps-vendor.vercel.app/)**

---

## 📖 1. Tentang Proyek

**Nap's Vendor Jember** adalah platform katalog digital dan portofolio modern untuk jasa konveksi apparel seragam kustom (Kemeja PDH/PDL BEM, Vest Organisasi, Workshirt, Jaket, Kaos Polo, ID Card, dan Merchandise) yang berpusat di Jember, Jawa Timur.

Platform ini mengusung konsep **Direct-to-WhatsApp Conversion**, memungkinkan calon pelanggan menjelajahi katalog, memeriksa spesifikasi bahan, memilih ukuran standar (*size chart*), dan melakukan pemesanan instan tanpa alur *checkout* yang rumit.

---

## ✨ 2. Fitur Utama

- ⚡ **Performa Tinggi & Core Web Vitals Teroptimasi**:
  - Menggunakan `next/image` dengan format modern (AVIF/WebP), *device sizing*, dan prioritas aset LCP.
  - *Lazy loading* berbasis `next/dynamic` pada komponen modal untuk memperkecil ukuran *initial JavaScript bundle*.
  - *Throttled animation frame* untuk meminimalkan beban komputasi CPU pada *main-thread*.
- 💬 **Sistem Pemesanan Cerdas Direct-to-WhatsApp**:
  - Formulir pemesanan interaktif (`OrderModal`) yang otomatis memformat detail pesanan (*nama produk, jenis, bahan, jumlah estimasi, dan catatan desain custom*) ke WhatsApp Admin.
- 🛍️ **Katalog Digital Interaktif (`/catalog`)**:
  - Filter kategori instan (*Semua*, *Kemeja*, *Rompi*, *Kaos*, *ID Card*) dengan *counter badge* dinamis.
  - Pencarian *real-time* berbasis nama produk, kategori, atau jenis bahan kain.
- 📐 **Panduan Ukuran Standar (`SizeChartModal` & `/bantuan`)**:
  - Tabel panduan ukuran presisi (*Lebar Dada, Panjang Baju, Panjang Lengan*) untuk pakaian kemeja, rompi, dan kaos.
- 📸 **Proof of Work & Galeri Workshop**:
  - Dokumentasi foto detail jahitan, obras, dan bordir komputer presisi dilengkapi *Interactive Lightbox Modal*.
- ♿ **Aksesibilitas (a11y - WCAG AA/AAA Compliant)**:
  - Struktur HTML5 semantik ketat (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`).
  - Dilengkapi atribut `aria-label`, tombol *Skip to Content*, dan indikator fokus keyboard berkontras tinggi (`focus-visible`).
- 🔍 **SEO & Social Share Ready**:
  - Implementasi Next.js Metadata API lengkap di seluruh rute.
  - Pratinjau Open Graph & Twitter Cards berkualitas tinggi saat tautan dibagikan ke WhatsApp atau media sosial.
  - Dilengkapi generator dinamis `sitemap.xml` dan `robots.txt`.

---

## 🛠️ 3. Tech Stack

| Lapisan | Teknologi | Kegunaan |
| :--- | :--- | :--- |
| **Framework** | [Next.js 15 (App Router)](https://nextjs.org/) | Hybrid Server & Client Rendering, Metadata API |
| **Bahasa** | [TypeScript 5](https://www.typescriptlang.org/) | Strict Type Safety & Centralized Interfaces |
| **UI Library** | [React 19](https://react.dev/) | Core UI Component Architecture |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) | Dark Aesthetic Design System & Utilities |
| **Komponen Primitives** | [Radix UI](https://www.radix-ui.com/) / [shadcn/ui](https://ui.shadcn.com/) | Tabs, Dialog Modal, Accordion, Carousel |
| **Ikon** | [Lucide React](https://lucide.dev/) | Ikon SVG konsisten & ringan |
| **Deployment** | [Vercel](https://vercel.com/) | Global Edge Hosting & CI/CD Deployment |

---

## 📁 4. Struktur Direktori Proyek

```text
Naps/
├── public/
│   └── images/               # Asset gambar produk, portofolio & logo
├── src/
│   ├── app/
│   │   ├── about/            # Halaman /about
│   │   ├── bantuan/          # Halaman /bantuan (FAQ & Size Chart)
│   │   ├── catalog/          # Halaman /catalog (Katalog produk)
│   │   ├── tentang/          # Halaman /tentang (Profil & lokasi workshop)
│   │   ├── globals.css       # Global styles & variabel Tailwind CSS
│   │   ├── layout.tsx        # Root layout, Next/Font Inter, Metadata SEO
│   │   ├── page.tsx          # Homepage utama
│   │   ├── robots.ts         # Generator dinamis robots.txt
│   │   └── sitemap.ts        # Generator dinamis sitemap.xml
│   ├── components/
│   │   ├── catalog/          # CatalogGridClient.tsx, ProductCard.tsx, ProductCatalog.tsx
│   │   ├── faq/              # FAQSection.tsx
│   │   ├── home/             # HeroSection.tsx, OrderTimelineSection.tsx, SizeChartSection.tsx
│   │   ├── layout/           # Navbar.tsx, Footer.tsx, FloatingWA.tsx
│   │   ├── modals/           # OrderModal.tsx & SizeChartModal.tsx
│   │   ├── portfolio/        # ProofOfWork.tsx (Lightbox galeri)
│   │   └── ui/               # Reusable UI (Button, SectionHeader, Carousel, Dialog)
│   ├── data/
│   │   ├── faq.json          # Data pertanyaan & jawaban umum
│   │   ├── katalog.json      # Dataset produk katalog
│   │   ├── portfolio.json    # Dataset portofolio & bukti kualitas
│   │   └── sizeCharts.json   # Dataset dimensi ukuran pakaian
│   ├── lib/
│   │   ├── utils.ts          # Helper cn (clsx + tailwind-merge)
│   │   └── whatsapp.ts       # Generator pesan & URL WhatsApp API
│   └── types/
│       └── index.ts          # Centralized TypeScript Interfaces
├── next.config.ts            # Konfigurasi Next.js (Image Optimization)
├── package.json              # Daftar dependensi & script proyek
├── tailwind.config.ts        # Tema warna & animasi Tailwind
└── tsconfig.json             # Konfigurasi compiler TypeScript
```

---

## ⚡ 5. Cara Menjalankan Proyek Secara Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) (versi 18.x atau lebih baru)
- npm / yarn / pnpm

### Langkah Instalasi
```bash
# 1. Clone repositori
git clone git@github.com:dmasspr174/Naps_Vendor.git
cd Naps_Vendor

# 2. Install dependensi
npm install

# 3. Jalankan server development
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

### Build untuk Produksi
```bash
# Membuat build produksi
npm run build

# Menjalankan server hasil build
npm run start
```

---

## 🎨 6. Design System & Palet Warna

- **Background Principal**: Deep Dark `#09090b` & `#121215` (Zinc Dark Palette)
- **Primary Accent**: Electric Gold / Bright Yellow (`#facc15` / `hsl(47, 95%, 53%)`)
- **WhatsApp Brand**: Bright Emerald `#25D366` / Hover `#20bd5a`
- **Border & Surfaces**: `#27272a` (Zinc 800) dengan efek *ambient glow* halus

---

## 📄 Lisensi & Hak Cipta

© 2026 **Nap's Vendor Jember**. All rights reserved.  
Dikembangkan dengan standar kualitas konveksi & performa web terbaik.
