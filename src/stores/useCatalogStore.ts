import { create } from "zustand";

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────
type CategoryType = "Semua" | "Kemeja" | "Rompi" | "Kaos" | "id card";
type SortType = "terbaru" | "nama_asc" | "nama_desc";

interface CatalogState {
  searchQuery: string;
  selectedCategory: CategoryType;
  sortBy: SortType;
}

interface CatalogActions {
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: CategoryType) => void;
  setSortBy: (sort: SortType) => void;
  resetFilters: () => void;
}

const DEFAULT_STATE: CatalogState = {
  searchQuery: "",
  selectedCategory: "Semua",
  sortBy: "terbaru",
};

// ──────────────────────────────────────────────────────────────────────────────
// Store
// Manages filter/search/sort state shared between CatalogGridClient and
// any future header search widget — eliminates prop drilling.
// ──────────────────────────────────────────────────────────────────────────────
export const useCatalogStore = create<CatalogState & CatalogActions>((set) => ({
  ...DEFAULT_STATE,

  setSearchQuery: (query) => set({ searchQuery: query }),

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  setSortBy: (sort) => set({ sortBy: sort }),

  resetFilters: () => set(DEFAULT_STATE),
}));
