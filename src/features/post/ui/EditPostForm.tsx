import { Post } from "../../../entities/post/model/type"
import { usePostModalStore } from "../../../entities/post/model/usePostModalStore"
import { usePostStore } from "../../../entities/post/model/usePostStore"
import { postApi } from "../api/postApi"
import { Dialog, DialogContent, DialogTitle, Button, DialogHeader, Input, Textarea } from "../../../shared/ui"

export const EditPostForm = () => {
  const { posts, setPosts, selectedPost, setSelectedPost } = usePostStore()
  const { showEditDialog, setShowEditDialog } = usePostModalStore()

  // 게시물 업데이트
  const updatePost = async (selectedPost: Post) => {
    try {
      const data = await postApi.update(selectedPost)
      setPosts(posts.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              selectedPost && setSelectedPost({ ...selectedPost, title: e.target.value })
            }
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              selectedPost && setSelectedPost({ ...selectedPost, body: e.target.value })
            }
          />
          <Button onClick={() => selectedPost && updatePost(selectedPost)}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
