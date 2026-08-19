"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare, ShoppingBag, Check } from "lucide-react";
import { getWhatsAppOrderUrl } from "@/lib/whatsapp";

interface ProductItem {
  id: string;
  nama: string;
  jenis: string;
  gambar: string;
  bahan: string;
}

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
    window.open(url, "_blank");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Form Pemesanan via WhatsApp
          </DialogTitle>
          <DialogDescription>
            Pesan <strong>{product.nama}</strong> langsung ke WhatsApp Admin Nap's Vendor Jember.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          {/* Product Quick Info Card */}
          <div className="p-3 rounded-lg bg-zinc-900 border border-border/80 flex items-center justify-between text-xs sm:text-sm">
            <div>
              <div className="font-semibold text-white">{product.nama}</div>
              <div className="text-muted-foreground flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[11px] font-medium border border-primary/20">{product.jenis}</span>
                <span>Bahan: {product.bahan}</span>
              </div>
            </div>
          </div>

          {/* Qty Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">Estimasi Jumlah Pcs (MOQ 12 pcs):</label>
            <input
              type="number"
              min={1}
              value={jumlah}
              onChange={(e) => setJumlah(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full h-10 rounded-md bg-zinc-900 border border-border px-3 text-sm text-white focus:outline-none focus:border-primary"
            />
          </div>

          {/* Catatan / Custom Request Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">Catatan / Detail Tambahan (Opsional):</label>
            <textarea
              rows={3}
              placeholder="Contoh: Tambah bordir nama di dada kanan & logo angkatan di lengan kiri..."
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              className="w-full rounded-md bg-zinc-900 border border-border p-3 text-sm text-white focus:outline-none focus:border-primary resize-none placeholder:text-zinc-600"
            />
          </div>

          <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            Pesan otomatis terformat secara rapi saat dialihkan ke WhatsApp.
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button variant="whatsapp" onClick={handleSendWA} className="gap-2">
            <MessageSquare className="w-4 h-4 fill-current" />
            Lanjut ke WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
