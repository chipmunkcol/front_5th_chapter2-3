import { create } from "zustand"
import { NewPost, Post } from "./type"

type PostStoreState = {
  posts: Post[]
  newPost: NewPost
}

type PostStoreActions = {
  setPosts: (posts: Post[]) => void
  setNewPost: (newPost: NewPost) => void
}

type PostStore = PostStoreState & PostStoreActions

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  newPost: { title: "", body: "", userId: 1 },
  setNewPost: (newPost) => set((state) => ({ ...state, newPost })),
}))
