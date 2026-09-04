import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductItem } from "@/types";

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────
export interface CartItem {
  id: string;
  nama: string;
  jenis: string;
  bahan: string;
  kuantiti: number;
}

interface CartState {
  items: CartItem[];
}

interface CartActions {
  addItem: (product: ProductItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearItems: () => void;
}

// ──────────────────────────────────────────────────────────────────────────────
// Store
// Persisted to localStorage so inquiry basket survives page reloads.
// SSR-safe: zustand/middleware persist only runs in browser contexts.
// ──────────────────────────────────────────────────────────────────────────────
export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const existing = get().items.find((i) => i.id === product.id);
        if (existing) {
          // If already in basket, increment quantity
          set({
            items: get().items.map((i) =>
              i.id === product.id ? { ...i, kuantiti: i.kuantiti + 1 } : i
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              {
                id: product.id,
                nama: product.nama,
                jenis: product.jenis,
                bahan: product.bahan,
                kuantiti: 1,
              },
            ],
          });
        }
      },

      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),

      updateQuantity: (id, qty) => {
        if (qty < 1) {
          // Auto-remove if quantity drops to zero
          set({ items: get().items.filter((i) => i.id !== id) });
        } else {
          set({
            items: get().items.map((i) =>
              i.id === id ? { ...i, kuantiti: qty } : i
            ),
          });
        }
      },

      clearItems: () => set({ items: [] }),
    }),
    {
      name: "naps-vendor-inquiry-basket",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
