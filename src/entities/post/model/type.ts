export interface Post {
  author: ResponseUser | undefined
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  userId: number
}

export type NewPost = Pick<Post, "title" | "body" | "userId">

export interface ResonsePostPagination {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export interface ResponseUser {
  id: number
  username: string
  image: string
}

export interface ResponseTag {
  slug: string
  name: string
  url: string
}
