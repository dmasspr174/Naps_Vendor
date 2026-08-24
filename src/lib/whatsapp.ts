import { OrderDetails } from "@/types";

export const WA_NUMBER = "62801336295556"; // Default WA Number Nap's Vendor Jember

/**
 * Formats structured order details into a clean, legible WhatsApp chat message.
 */
export function formatWhatsAppOrderMessage(details: OrderDetails): string {
  const { namaProduk, jenis, bahan, jumlah, catatan } = details;

  const lines = [
    "Halo Admin Nap's Vendor Jember,",
    "",
    "Saya tertarik dan ingin memesan produk konveksi berikut:",
    `📌 *Nama Produk*: ${namaProduk}`,
  ];

  if (jenis) lines.push(`🏷️ *Jenis*: ${jenis}`);
  if (bahan) lines.push(`🧶 *Bahan*: ${bahan}`);
  if (jumlah) lines.push(`🔢 *Estimasi Jumlah*: ${jumlah} pcs`);
  if (catatan && catatan.trim()) lines.push(`📝 *Catatan / Desain*: ${catatan.trim()}`);

  lines.push("");
  lines.push("Mohon info mengenai rincian harga, estimasi waktu pengerjaan, dan prosedur pemesanannya. Terima kasih!");

  return lines.join("\n");
}

/**
 * Generates direct WhatsApp click-to-chat URL for an order.
 */
export function getWhatsAppOrderUrl(details: OrderDetails): string {
  const message = formatWhatsAppOrderMessage(details);
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates general WhatsApp consultation URL.
 */
export function getGeneralWAUrl(customText?: string): string {
  const defaultText =
    "Halo Admin Nap's Vendor Jember, saya ingin berkonsultasi mengenai pembuatan seragam / konveksi custom.";
  const text = customText || defaultText;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}
