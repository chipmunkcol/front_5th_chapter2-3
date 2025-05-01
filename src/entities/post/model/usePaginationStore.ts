import { create } from "zustand"

type PaginationStoreState = {
  skip: number
  limit: number
}

type PaginationStoreActions = {
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
}

type PaginationStore = PaginationStoreState & PaginationStoreActions

export const usePaginationStore = create<PaginationStore>((set) => ({
  skip: 0,
  setSkip: (skip) => set({ skip }),
  limit: 10,
  setLimit: (limit) => set({ limit }),
}))
