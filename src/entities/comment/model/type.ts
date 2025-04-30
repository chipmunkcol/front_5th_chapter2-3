// {
//   "id": 1,
//   "body": "This is some awesome thinking!",
//   "postId": 242,
//   "likes": 3,
//   "user": {
//     "id": 105,
//     "username": "emmac",
//     "fullName": "Emma Wilson"
//   }
// }

export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: {
    id: number
    username: string
    fullName: string
  }
}

// export type NewComment = Pick<Comment, "body" | "postId" | "userId">
export type NewComment = {
  body: string
  postId: number
  userId: number
}
