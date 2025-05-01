import { create } from "zustand"

type CommentModalStoreState = {
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
}

type CommentModalStoreActions = {
  setShowAddCommentDialog: (showAddCommentDialog: boolean) => void
  setShowEditCommentDialog: (showEditCommentDialog: boolean) => void
}

type CommentModalStore = CommentModalStoreState & CommentModalStoreActions

export const useCommentModalStore = create<CommentModalStore>((set) => ({
  showAddCommentDialog: false,
  setShowAddCommentDialog: (showAddCommentDialog) => set({ showAddCommentDialog }),

  showEditCommentDialog: false,
  setShowEditCommentDialog: (showEditCommentDialog) => set({ showEditCommentDialog }),
}))
