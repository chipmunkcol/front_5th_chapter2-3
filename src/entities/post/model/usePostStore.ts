import { create } from "zustand"
import { NewPost, Post } from "./type"

type PostStoreState = {
  posts: Post[]
  newPost: NewPost
  selectedPost: Post | null
  total: number
}

type PostStoreActions = {
  setPosts: (posts: Post[]) => void
  setNewPost: (newPost: NewPost) => void
  setSelectedPost: (selectedPost: Post) => void
  setTotal: (total: number) => void
}

type PostStore = PostStoreState & PostStoreActions

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  newPost: { title: "", body: "", userId: 1 },
  setNewPost: (newPost) => set({ newPost }),

  selectedPost: null,
  setSelectedPost: (selectedPost) => set({ selectedPost }),

  total: 0,
  setTotal: (total) => set({ total }),
}))
