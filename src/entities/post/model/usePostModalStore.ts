import { create } from "zustand"

type PostModalStoreState = {
  showAddDialog: boolean
  showEditDialog: boolean
  showPostDetailDialog: boolean
}

type PostModalStoreActions = {
  setShowAddDialog: (showAddDialog: boolean) => void
  setShowEditDialog: (showEditDialog: boolean) => void
  setShowPostDetailDialog: (showPostDetailDialog: boolean) => void
}

type PostModalStore = PostModalStoreState & PostModalStoreActions

export const usePostModalStore = create<PostModalStore>((set) => ({
  showAddDialog: false,
  setShowAddDialog: (showAddDialog) => set({ showAddDialog }),

  showEditDialog: false,
  setShowEditDialog: (showEditDialog) => set({ showEditDialog }),

  showPostDetailDialog: false,
  setShowPostDetailDialog: (showPostDetailDialog) => set({ showPostDetailDialog }),
}))
