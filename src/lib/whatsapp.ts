export const WA_NUMBER = "62801336295556"; // Default WA Number from Nap's Instagram bio

export interface OrderDetails {
  namaProduk: string;
  jenis?: string;
  bahan?: string;
  jumlah?: number | string;
  catatan?: string;
}

/**
 * Generates direct WhatsApp click-to-chat API URL with formatted text message.
 */
export function getWhatsAppOrderUrl(details: OrderDetails): string {
  const { namaProduk, jenis, bahan, jumlah, catatan } = details;
  
  let message = `Halo Admin Nap's Vendor Jember,\n\nSaya tertarik dan ingin memesan produk berikut:\n`;
  message += `📌 *Nama Produk*: ${namaProduk}\n`;
  
  if (jenis) message += `🏷️ *Jenis*: ${jenis}\n`;
  if (bahan) message += `🧶 *Bahan*: ${bahan}\n`;
  if (jumlah) message += `🔢 *Estimasi Jumlah*: ${jumlah} pcs\n`;
  if (catatan && catatan.trim() !== '') message += `📝 *Catatan/Desain*: ${catatan}\n`;
  
  message += `\nMohon info mengenai harga, estimasi pengerjaan, dan prosedur pemesanannya. Terima kasih!`;
  
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getGeneralWAUrl(customText?: string): string {
  const text = customText || "Halo Admin Nap's Vendor Jember, saya ingin berkonsultasi mengenai pembuatan seragam / konveksi custom.";
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}
