import { create } from "zustand"
import { Comment, NewComment } from "./type"

type CommentStoreState = {
  comments: Record<number, Comment[]>
  selectedComment: Comment | null
  newComment: NewComment
}

type CommentStoreActions = {
  setComments: (
    comments: Record<number, Comment[]> | ((prev: Record<number, Comment[]>) => Record<number, Comment[]>),
  ) => void
  setSelectedComment: (selectedComment: Comment | null) => void
  setNewComment: (newComment: NewComment | ((prev: NewComment) => NewComment)) => void
}

type CommentStore = CommentStoreState & CommentStoreActions

export const useCommentStore = create<CommentStore>((set) => ({
  comments: {},
  setComments: (comments) =>
    set((state) => ({
      comments: typeof comments === "function" ? comments(state.comments) : comments,
    })),

  selectedComment: null,
  setSelectedComment: (selectedComment) => set({ selectedComment }),

  newComment: {
    body: "",
    postId: null,
    userId: 1,
  },
  setNewComment: (newComment) => set({ newComment }),
}))
