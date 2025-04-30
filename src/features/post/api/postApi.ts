import { Post } from "../../../entities/post/model/type"

export const postApi = {
  add: async (newPost: Post): Promise<Post> => {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
    return await response.json()
  },
  update: async (selectedPost) => {
    const response = await fetch(`/api/posts/${selectedPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedPost),
    })
    return await response.json()
  },

  delete: async (postId) => {
    await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    })
  },
}
