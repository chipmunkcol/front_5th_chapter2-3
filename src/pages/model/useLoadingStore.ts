import { create } from "zustand"

type LoadingStoreState = {
  loading: boolean
}

type LoadingStoreActions = {
  setLoading: (loading: boolean) => void
}

type LoadingStore = LoadingStoreState & LoadingStoreActions

export const useLoadingStore = create<LoadingStore>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
}))
