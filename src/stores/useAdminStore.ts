import { create } from "zustand";
import { ProductItem } from "@/types";

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────
type ModalMode = "create" | "edit";

interface AdminState {
  // Modal state
  isProductModalOpen: boolean;
  modalMode: ModalMode;
  editingProduct: ProductItem | null;

  // Delete dialog state
  isDeleteDialogOpen: boolean;
  targetDeleteProduct: ProductItem | null;

  // Upload progress feedback
  isUploading: boolean;
  uploadProgress: number; // 0–100

  // Toast / notification feedback
  toastMessage: string | null;
  toastType: "success" | "error" | "info";
}

interface AdminActions {
  openCreateModal: () => void;
  openEditModal: (product: ProductItem) => void;
  closeProductModal: () => void;

  openDeleteDialog: (product: ProductItem) => void;
  closeDeleteDialog: () => void;

  setUploadProgress: (progress: number) => void;
  resetUploadState: () => void;

  showToast: (message: string, type?: "success" | "error" | "info") => void;
  dismissToast: () => void;
}

// ──────────────────────────────────────────────────────────────────────────────
// Store
// ──────────────────────────────────────────────────────────────────────────────
export const useAdminStore = create<AdminState & AdminActions>((set) => ({
  // Initial state
  isProductModalOpen: false,
  modalMode: "create",
  editingProduct: null,
  isDeleteDialogOpen: false,
  targetDeleteProduct: null,
  isUploading: false,
  uploadProgress: 0,
  toastMessage: null,
  toastType: "success",

  // Modal actions
  openCreateModal: () =>
    set({ isProductModalOpen: true, modalMode: "create", editingProduct: null }),

  openEditModal: (product) =>
    set({ isProductModalOpen: true, modalMode: "edit", editingProduct: product }),

  closeProductModal: () =>
    set({ isProductModalOpen: false, editingProduct: null }),

  // Delete dialog actions
  openDeleteDialog: (product) =>
    set({ isDeleteDialogOpen: true, targetDeleteProduct: product }),

  closeDeleteDialog: () =>
    set({ isDeleteDialogOpen: false, targetDeleteProduct: null }),

  // Upload progress actions
  setUploadProgress: (progress) =>
    set({ isUploading: progress > 0 && progress < 100, uploadProgress: progress }),

  resetUploadState: () => set({ isUploading: false, uploadProgress: 0 }),

  // Toast actions
  showToast: (message, type = "success") =>
    set({ toastMessage: message, toastType: type }),

  dismissToast: () => set({ toastMessage: null }),
}));
