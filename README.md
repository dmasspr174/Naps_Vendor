# 🧶 Nap's Vendor Jember — Web Catalog & Custom Apparel Platform

<p align="center">
  <a href="https://naps-vendor.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-naps--vendor.vercel.app-facc15?style=for-the-badge&logo=vercel&logoColor=black&labelColor=09090b" alt="Live Demo on Vercel" />
  </a>
  <img src="https://img.shields.io/badge/Next.js_15-App_Router-black?style=for-the-badge&logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/React_19-09090b?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Supabase-Database_&_Auth-3ECF8E?style=for-the-badge&logo=supabase" alt="Supabase" />
</p>

---

## 🌐 Live Website

Website resmi dan katalog digital Nap's Vendor Jember dapat diakses secara live di:  
👉 **[https://naps-vendor.vercel.app/](https://naps-vendor.vercel.app/)**

---

## 📖 1. Tentang Proyek

**Nap's Vendor Jember** adalah platform katalog digital dan portofolio modern untuk jasa konveksi apparel seragam kustom (Kemeja PDH/PDL BEM, Vest Organisasi, Workshirt, Jaket, Kaos Polo, ID Card, dan Merchandise) yang berpusat di Jember, Jawa Timur.

Platform ini mengusung konsep **Direct-to-WhatsApp Conversion**, memungkinkan calon pelanggan menjelajahi katalog, memeriksa spesifikasi bahan, memilih ukuran standar (*size chart*), dan melakukan pemesanan instan tanpa alur *checkout* yang rumit. Selain itu, web ini kini dilengkapi dengan **Sistem Manajemen Konten (CMS)** khusus admin untuk mengelola katalog secara langsung.

---

## ✨ 2. Fitur Utama

- ⚡ **Performa Tinggi & Core Web Vitals Teroptimasi**:
  - Menggunakan `next/image` dengan format modern (AVIF/WebP), *device sizing*, dan prioritas aset LCP.
  - *Lazy loading* berbasis `next/dynamic` pada komponen modal untuk memperkecil ukuran *initial JavaScript bundle*.
- 💬 **Sistem Pemesanan Cerdas Direct-to-WhatsApp**:
  - Formulir pemesanan interaktif (`OrderModal`) yang otomatis memformat detail pesanan (*nama produk, jenis, bahan, jumlah estimasi, dan catatan desain custom*) ke WhatsApp Admin.
- 🛍️ **Katalog Digital Interaktif (`/catalog`)**:
  - Filter kategori instan dengan *counter badge* dinamis.
  - Pencarian *real-time* berbasis nama produk, kategori, atau jenis bahan kain.
  - Manajemen *State* global untuk UI & Katalog menggunakan **Zustand**.
- 📐 **Panduan Ukuran Standar (`SizeChartModal` & `/bantuan`)**:
  - Tabel panduan ukuran presisi untuk pakaian kemeja, rompi, dan kaos.
- 🔐 **Admin Dashboard & CMS Terintegrasi (`/admin`)**:
  - Halaman dashboard terproteksi untuk manajemen penuh data produk (Create, Read, Update, Delete) yang terhubung *real-time* ke **Supabase**.
  - Sistem Autentikasi Admin yang di-*handle* oleh **Supabase Auth**.
  - Form interaktif dan modal (`AddProductModal`, `EditProductModal`) mempermudah *update* inventaris produk.
- 📸 **Proof of Work & Galeri Workshop**:
  - Dokumentasi foto detail jahitan, obras, dan bordir komputer presisi dilengkapi *Interactive Lightbox Modal*.
- ♿ **Aksesibilitas (a11y - WCAG AA/AAA Compliant) & SEO**:
  - HTML5 semantik ketat dengan implementasi Next.js Metadata API di setiap halaman.

---

## 🛠️ 3. Tech Stack

| Lapisan | Teknologi | Kegunaan |
| :--- | :--- | :--- |
| **Framework** | [Next.js 15 (App Router)](https://nextjs.org/) | Hybrid Server & Client Rendering, API Routes & Server Actions |
| **Bahasa** | [TypeScript 5](https://www.typescriptlang.org/) | Strict Type Safety & Centralized Interfaces |
| **Database & Auth** | [Supabase](https://supabase.com/) | PostgreSQL Database, Storage, & Authentication System |
| **State Management**| [Zustand](https://zustand-demo.pmnd.rs/) | Global state management yang ringan dan reaktif |
| **UI Library** | [React 19](https://react.dev/) | Core UI Component Architecture |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) | Dark Aesthetic Design System & Utilities |
| **Komponen Primitives** | [Radix UI](https://www.radix-ui.com/) / [shadcn/ui](https://ui.shadcn.com/) | Tabs, Dialog Modal, Accordion, Carousel |

---

## 📁 4. Struktur Direktori Utama

```text
Naps/
├── public/               # Asset gambar produk statis, ikon & logo
├── src/
│   ├── app/              # Routing Aplikasi (Next.js App Router)
│   │   ├── admin/        # Dashboard Admin Terproteksi (Login & Manajemen Katalog)
│   │   ├── catalog/      # Halaman Katalog Konsumen
│   │   ├── bantuan/      # Pusat Bantuan & FAQ
│   │   └── actions/      # Next.js Server Actions untuk mutasi data backend
│   ├── components/       # Reusable React Components
│   │   ├── admin/        # Komponen khusus untuk Dashboard Admin (Modals, Forms)
│   │   ├── catalog/      # Grid, Kartu Produk, Filter Katalog
│   │   ├── modals/       # Pop-up Dialog untuk interaksi User
│   │   ├── ui/           # Komponen UI Dasar (Buttons, Inputs, Dialog)
│   │   └── skeletons/    # UI Skeleton untuk Loading state
│   ├── lib/              # Utility Functions & Integrasi Eksternal
│   │   ├── supabase/     # Konfigurasi SSR/Client & Middleware Supabase
│   │   └── whatsapp.ts   # Helper untuk memformat URL WhatsApp API
│   ├── stores/           # Konfigurasi State Management (Zustand: useAdminStore.ts, useCatalogStore.ts, dll)
│   └── types/            # Definisi Interface & Tipe Data global TypeScript
├── next.config.ts        # Konfigurasi Build, Env & Image Next.js
├── tailwind.config.ts    # Tema, Warna & Konfigurasi Desain Tailwind
└── package.json          # Manajemen Dependensi & Scripts
```

---

## ⚡ 5. Cara Menjalankan Proyek Secara Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) (versi 18.x atau lebih baru)
- Project & Kredensial [Supabase](https://supabase.com/) (`NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

### Langkah Instalasi
```bash
# 1. Clone repositori
git clone git@github.com:dmasspr174/Naps_Vendor.git
cd Naps_Vendor

# 2. Install dependensi
npm install

# 3. Konfigurasi Environment Variables
# Buat file .env di root folder dan sesuaikan variabel berikut:
# NEXT_PUBLIC_SUPABASE_URL="your_supabase_project_url"
# NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"

# 4. Jalankan server development
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

---

## 🎨 6. Design System & Palet Warna

- **Background Principal**: Deep Dark `#09090b` & `#121215` (Zinc Dark Palette)
- **Primary Accent**: Electric Gold / Bright Yellow (`#facc15` / `hsl(47, 95%, 53%)`)
- **WhatsApp Brand**: Bright Emerald `#25D366` / Hover `#20bd5a`
- **Border & Surfaces**: `#27272a` (Zinc 800) dengan efek *ambient glow* halus

---

## 📄 Lisensi & Hak Cipta

© 2026 **Nap's Vendor Jember**. All rights reserved.  
Dikembangkan dengan standar kualitas konveksi & performa web modern.
