import { create } from "zustand"

type SelectedTagStoreState = {
  selectedTag: string
}

type SelectedTagStoreActions = {
  setSelectedTag: (selectedTag: string) => void
}

type SelectedTagStore = SelectedTagStoreState & SelectedTagStoreActions

export const useSelectedTagStore = create<SelectedTagStore>((set) => ({
  selectedTag: "",
  setSelectedTag: (selectedTag) => set({ selectedTag }),
}))
