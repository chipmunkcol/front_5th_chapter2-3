import { create } from "zustand"

type SearchQueryStoreState = {
  searchQuery: string
}

type SearchQueryStoreActions = {
  setSearchQuery: (searchQuery: string) => void
}

type SearchQueryStore = SearchQueryStoreState & SearchQueryStoreActions

export const useSearchQueryStore = create<SearchQueryStore>((set) => ({
  searchQuery: "",
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}))
