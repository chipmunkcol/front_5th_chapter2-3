import { NewComment } from "../../../entities/comment/model/type"
import { useCommentModalStore } from "../../../entities/comment/model/useCommentModalStore"
import { useCommentStore } from "../../../entities/comment/model/useCommentStore"
import { commentApi } from "../api/commentApi"
import { Dialog, DialogContent, DialogTitle, Button, DialogHeader, Textarea } from "../../../shared/ui"

export const AddCommentForm = () => {
  const { setComments, newComment, setNewComment } = useCommentStore()
  const { showAddCommentDialog, setShowAddCommentDialog } = useCommentModalStore()

  // 댓글 추가
  const addComment = async (newComment: NewComment) => {
    try {
      const data = await commentApi.add(newComment)
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      setShowAddCommentDialog(false)

      // type 이 user: { id: number } 가 아닌 userId
      setNewComment({ body: "", postId: null, userId: 1 })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader className="">
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setNewComment({ ...newComment, body: e.target.value })
            }
          />
          <Button onClick={() => addComment(newComment)}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
