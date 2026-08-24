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
import { MessageSquare, ShoppingBag, Check } from "lucide-react";
import { getWhatsAppOrderUrl } from "@/lib/whatsapp";
import { ProductItem } from "@/types";

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
      <DialogContent className="max-w-md bg-zinc-950 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" aria-hidden="true" />
            Form Pemesanan via WhatsApp
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-xs">
            Pesan <strong className="text-white">{product.nama}</strong> langsung ke WhatsApp Admin Nap's Vendor Jember.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          {/* Product Quick Info Card */}
          <div className="p-3 rounded-lg bg-zinc-900 border border-border/80 flex items-center justify-between text-xs sm:text-sm">
            <div>
              <div className="font-semibold text-white">{product.nama}</div>
              <div className="text-muted-foreground flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[11px] font-medium border border-primary/20">
                  {product.jenis}
                </span>
                <span>Bahan: {product.bahan}</span>
              </div>
            </div>
          </div>

          {/* Qty Input */}
          <div className="space-y-1.5">
            <label htmlFor="order-qty-input" className="text-xs font-semibold text-zinc-300">
              Estimasi Jumlah Pcs (MOQ 12 pcs):
            </label>
            <input
              id="order-qty-input"
              type="number"
              min={1}
              value={jumlah}
              onChange={(e) => setJumlah(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full h-10 rounded-md bg-zinc-900 border border-border px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* Catatan / Custom Request Input */}
          <div className="space-y-1.5">
            <label htmlFor="order-notes-input" className="text-xs font-semibold text-zinc-300">
              Catatan / Detail Desain Tambahan (Opsional):
            </label>
            <textarea
              id="order-notes-input"
              rows={3}
              placeholder="Contoh: Tambah bordir nama di dada kanan & logo angkatan di lengan kiri..."
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              className="w-full rounded-md bg-zinc-900 border border-border p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none placeholder:text-zinc-600 transition-all"
            />
          </div>

          <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
            <span>Pesan otomatis terformat rapi saat dialihkan ke WhatsApp.</span>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} className="border-zinc-700">
            Batal
          </Button>
          <Button variant="whatsapp" onClick={handleSendWA} className="gap-2">
            <MessageSquare className="w-4 h-4 fill-current" aria-hidden="true" />
            Lanjut ke WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
