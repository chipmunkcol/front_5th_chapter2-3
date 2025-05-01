import { create } from "zustand"

type SortStoreState = {
  sortBy: string
  sortOrder: string
}

type SortStoreActions = {
  setSortBy: (sortBy: string) => void
  setSortOrder: (sortOrder: string) => void
}

type SortStore = SortStoreState & SortStoreActions

export const useSortStore = create<SortStore>((set) => ({
  sortBy: "",
  setSortBy: (sortBy) => set({ sortBy }),
  sortOrder: "asc",
  setSortOrder: (sortOrder) => set({ sortOrder }),
}))
