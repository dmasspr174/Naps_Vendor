"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Check } from "lucide-react";
import { getWhatsAppOrderUrl } from "@/lib/whatsapp";
import { ProductItem } from "@/types";
import { WhatsAppIcon } from "@/components/catalog/ProductCard";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductItem | null;
}

export function OrderModal({ isOpen, onClose, product }: OrderModalProps) {
  const [jumlah, setJumlah] = React.useState<number>(12);
  const [catatan, setCatatan] = React.useState<string>("");

  if (!product) return null;

  const handleSendWA = () => {
    const url = getWhatsAppOrderUrl({
      namaProduk: product.nama,
      jenis: product.jenis,
      bahan: product.bahan,
      jumlah: jumlah,
      catatan: catatan,
    });
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-white border-slate-100 text-slate-900 rounded-2xl shadow-xl p-6">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl font-bold flex items-center gap-2 text-slate-900">
            <ShoppingBag className="w-5 h-5 text-amber-500" aria-hidden="true" />
            Form Pemesanan via WhatsApp
          </DialogTitle>
          <DialogDescription className="font-sans text-slate-500 text-xs sm:text-sm font-medium">
            Pesan <strong className="text-slate-900 font-semibold">{product.nama}</strong> langsung ke WhatsApp Admin Nap's Vendor Jember.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          {/* Product Quick Info Card */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs sm:text-sm">
            <div>
              <div className="font-heading font-bold text-slate-900">{product.nama}</div>
              <div className="text-slate-500 font-medium flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[11px] font-bold border border-amber-200/60">
                  {product.jenis}
                </span>
                <span>Bahan: {product.bahan}</span>
              </div>
            </div>
          </div>

          {/* Qty Input */}
          <div className="space-y-1.5">
            <label htmlFor="order-qty-input" className="text-xs font-semibold text-slate-700">
              Estimasi Jumlah Pcs (MOQ 12 pcs):
            </label>
            <input
              id="order-qty-input"
              type="number"
              min={1}
              value={jumlah}
              onChange={(e) => setJumlah(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full h-11 rounded-xl bg-white border border-slate-200 px-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-xs"
            />
          </div>

          {/* Catatan / Custom Request Input */}
          <div className="space-y-1.5">
            <label htmlFor="order-notes-input" className="text-xs font-semibold text-slate-700">
              Catatan / Detail Desain Tambahan (Opsional):
            </label>
            <textarea
              id="order-notes-input"
              rows={3}
              placeholder="Contoh: Tambah bordir nama di dada kanan & logo angkatan di lengan kiri..."
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              className="w-full rounded-xl bg-white border border-slate-200 p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none placeholder:text-slate-400 transition-all shadow-xs"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
            <span>Pesan otomatis terformat rapi saat dialihkan ke WhatsApp.</span>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0 pt-2">
          <Button variant="outline" onClick={onClose} className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100">
            Batal
          </Button>
          <Button variant="whatsapp" onClick={handleSendWA} className="gap-2 rounded-xl">
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            Lanjut ke WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
