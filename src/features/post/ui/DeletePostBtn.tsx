import { postApi } from "../api/postApi"

export const DeletePostBtn = ({ postId }) => {
  // 게시물 삭제
  const deletePost = async (postId) => {
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
