import { Trash2 } from "lucide-react"
import { usePostStore } from "../../../entities/post/model/usePostStore"
import { Button } from "../../../shared/ui"
import { postApi } from "../api/postApi"

interface Props {
  postId: number
}

export const DeletePostBtn = ({ postId }: Props) => {
  const { posts, setPosts } = usePostStore()

  // 게시물 삭제
  const deletePost = async (postId: number) => {
    try {
      await postApi.delete(postId)
      setPosts(posts.filter((post) => post.id !== postId))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={() => deletePost(postId)}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}
