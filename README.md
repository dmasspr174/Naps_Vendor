# 🧶 Nap's Vendor Jember - Web Catalog & Landing Page (PRD & Documentation)

Selamat datang di repositori resmi **Nap's Vendor Jember**, platform katalog digital dan landing page modern berbasis **Next.js 15** untuk jasa konveksi apparel custom seragam (PDH, Vest Organisasi, Workshirt, Jaket, Kaos, ID Card, dan Merchandise).

---

## 🚀 1. Ringkasan Proyek (Product Requirement Document / PRD)

### 📌 Visi & Tujuan
Platform ini dirancang khusus untuk mempermudah calon pelanggan (instansi, mahasiswa, organisasi BEM/HIMA, komunitas, dan korporat) dalam:
- Menjelajahi katalog produk apparel seragam custom secara interaktif.
- Melihat *Proof of Work* (detail kualitas jahitan & bordir presisi).
- Mengakses panduan *Size Chart* (ukuran S-5XL).
- Mengajukan konsultasi & pemesanan cepat secara otomatis melalui **WhatsApp Direct Integration**.

---

## 🛠️ 2. Tech Stack & Dependensi Utama

| Kategori | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Framework Utama** | [Next.js 15 (App Router)](https://nextjs.org/) | React framework modern dengan Server & Client Components |
| **Bahasa Pemrograman** | [TypeScript 5](https://www.typescriptlang.org/) | Type safety & kenyamanan pengodingan |
| **UI Library & Engine** | [React 19](https://react.dev/) | React core versi terbaru |
| **Styling & Design System** | [Tailwind CSS v3](https://tailwindcss.com/) | Utility-first CSS dengan *Dark Aesthetic Theme* |
| **Komponen UI Primitives** | [@radix-ui/react](https://www.radix-ui.com/) | Radix Tabs, Dialog (Modal), Slot, Accordion |
| **Icon Set** | [Lucide React](https://lucide.dev/) | Icon SVG modern, ringan, dan konsisten |
| **Utilities** | `clsx`, `tailwind-merge`, `cva` | Manajemen class dynamic & varian komponen Shadcn UI |

---

## ✨ 3. Fitur Utama & Modul

### 📱 A. Hero Section Interaktif
- Tagline dinamis & value proposition utama (100% Custom Order, Bahan Nagata/American Drill, MOQ 12 Pcs, Pengerjaan 10-14 Hari).
- *Best Seller Showcase Card* dengan indikator badge visual.
- Tombol CTA langsung menuju WhatsApp Admin & Scroll otomatis ke Katalog.

### 🛍️ B. Katalog Produk Interaktif (`ProductCatalog` & `ProductCard`)
- **Fitur Filter Kategori**: Filter tab instan (*Semua*, *Kemeja*, *Rompi*, *Kaos*, *ID Card*) lengkap dengan counter jumlah produk dinamis.
- **Pencarian Real-time**: Search bar untuk memfilter produk berdasarkan nama, jenis, atau bahan secara serentak.
- **Kartu Produk Dynamic**: Tampilan thumbnail produk, badge jenis apparel, bahan, MOQ badge, floating button *Size Chart*, dan CTA *"Pesan WA"*.
- **Responsive Layout**: Tampilan grid 2 kolom di perangkat seluler dan hingga 4 kolom pada layar desktop.

### 🔍 C. Modal Popups (`SizeChartModal` & `OrderModal`)
- **Size Chart Modal**: Panduan tabel ukuran presisi (Kemeja/PDH, Rompi, Kaos, Jaket) untuk Lebar Dada, Panjang Badan, dan Panjang Lengan.
- **Order Modal**: Form pemesanan interaktif berbasis pilihan produk dengan input estimasi jumlah (Pcs) & catatan custom/desain.

### 💬 D. Integrasi WhatsApp Otomatis (`src/lib/whatsapp.ts`)
- Fungsi helper `getWhatsAppOrderUrl()` & `getGeneralWAUrl()`.
- Secara otomatis memformat pesan WhatsApp lengkap dengan emoji & detail spesifik:
  - *Nama Produk*
  - *Jenis Apparel*
  - *Bahan Kain*
  - *Jumlah Pesanan (Pcs)*
  - *Catatan / Desain Custom*
- Floating WhatsApp Button di sudut kanan bawah layar yang selalu aktif & accessible di semua perangkat.

### 📸 E. Showcase Proof of Work & Galeri (`ProofOfWork`)
- Menampilkan foto detail hasil produksi asli (kerapian obras, bordir komputer simetris, detail bahan).
- **Interactive Lightbox Modal**: Memperbesar preview foto ketika diklik dengan dukungan tombol penutup & overlay latar belakang.

### ❓ F. FAQ Accordion (`FAQSection`)
- Pertanyaan umum seputar Minimum Order Quantity (MOQ 12 pcs), durasi pengerjaan, sampel bahan, garansi jahitan, serta sistem pembayaran/DP.

---

## 📁 4. Struktur Direktori Proyek

```text
Naps/
├── public/
│   └── images/               # Asset gambar produk, portofolio, & logo
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout, font Inter, & metadata SEO
│   │   ├── page.tsx          # Homepage utama menyatukan seluruh section
│   │   └── globals.css       # Global styles & variabel Tailwind
│   ├── components/
│   │   ├── catalog/          # ProductCatalog.tsx & ProductCard.tsx
│   │   ├── faq/              # FAQSection.tsx
│   │   ├── home/             # HeroSection.tsx
│   │   ├── layout/           # Navbar.tsx, Footer.tsx, FloatingWA.tsx
│   │   ├── modals/           # OrderModal.tsx & SizeChartModal.tsx
│   │   ├── portfolio/        # ProofOfWork.tsx
│   │   └── ui/               # Komponen dasar (Button, Card, Tabs, Dialog)
│   ├── data/
│   │   ├── katalog.json      # Dataset produk katalog
│   │   └── portfolio.json    # Dataset portofolio & proof of work
│   └── lib/
│       ├── utils.ts          # Utility Class Name merger (clsx + tailwind-merge)
│       └── whatsapp.ts       # Generator URL WhatsApp API
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## ⚡ 5. Cara Menjalankan Proyek (Local Development)

### Prasyarat
- [Node.js](https://nodejs.org/) (Versi 18.x atau lebih baru)
- npm / yarn / pnpm

### Langkah Pemasangan & Pengujian
```bash
# 1. Clone repositori
git clone git@github.com:dmasspr174/Naps_Vendor.git
cd Naps_Vendor

# 2. Install dependensi
npm install

# 3. Jalankan server pengembangan lokal
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda untuk melihat hasilnya.

### Build untuk Produksi
```bash
# Membuat build bundle produksi teroptimasi
npm run build

# Menjalankan server hasil build produksi
npm run start
```

---

## 🎨 6. Palet Warna & Aesthetics Design System

- **Background Principal**: Deep Dark `#09090b` & `#121215` (Zinc Dark Theme)
- **Primary Accent**: Electric Gold / Bright Yellow (`#facc15` / `hsl(47, 95%, 53%)`)
- **WhatsApp Emerald**: Bright Green `#25D366` / Hover `#20bd5a`
- **Border & Subtle Glow**: Zinc-800/60 & Subtle Yellow Radial Ambient Glows.

---

© 2026 **Nap's Vendor Jember**. All rights reserved.
