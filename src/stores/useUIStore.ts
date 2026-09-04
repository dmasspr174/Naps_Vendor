import { create } from "zustand";

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────
type ToastType = "success" | "error" | "info";

interface Toast {
  message: string;
  type: ToastType;
}

interface UIState {
  isMobileMenuOpen: boolean;
  activeToast: Toast | null;
}

interface UIActions {
  toggleMobileMenu: () => void;
  setMobileMenu: (open: boolean) => void;
  showToast: (message: string, type?: ToastType) => void;
  dismissToast: () => void;
}

// ──────────────────────────────────────────────────────────────────────────────
// Store
// Global overlay, drawer, and toast coordination.
// Components subscribe only to the slice they need to prevent re-renders.
// ──────────────────────────────────────────────────────────────────────────────
export const useUIStore = create<UIState & UIActions>((set) => ({
  isMobileMenuOpen: false,
  activeToast: null,

  toggleMobileMenu: () =>
    set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),

  setMobileMenu: (open) => set({ isMobileMenuOpen: open }),

  showToast: (message, type = "success") =>
    set({ activeToast: { message, type } }),

  dismissToast: () => set({ activeToast: null }),
}));
