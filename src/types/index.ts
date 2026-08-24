export interface ProductItem {
  id: string;
  nama: string;
  jenis: string;
  gambar: string;
  bahan: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface SizeChartRow {
  size: string;
  chest: string;
  length: string;
  sleeve?: string;
}

export interface SizeChartCategory {
  title: string;
  description: string;
  headers: string[];
  rows: SizeChartRow[];
}

export type SizeChartsData = Record<string, SizeChartCategory>;

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface OrderDetails {
  namaProduk: string;
  jenis?: string;
  bahan?: string;
  jumlah?: number | string;
  catatan?: string;
}
