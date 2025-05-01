import { Comment } from "../../../entities/comment/model/type"
import { useCommentModalStore } from "../../../entities/comment/model/useCommentModalStore"
import { useCommentStore } from "../../../entities/comment/model/useCommentStore"
import { commentApi } from "../api/commentApi"
import { Dialog, DialogContent, DialogTitle, Button, DialogHeader, Textarea } from "../../../shared/ui"

export const EditCommentForm = () => {
  const { setComments, selectedComment, setSelectedComment } = useCommentStore()
  const { showEditCommentDialog, setShowEditCommentDialog } = useCommentModalStore()

  // 댓글 업데이트
  const updateComment = async (selectedComment: Comment) => {
    if (!selectedComment) return
    try {
      const data = await commentApi.update(selectedComment)
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => selectedComment && setSelectedComment({ ...selectedComment, body: e.target.value })}
          />
          <Button onClick={() => selectedComment && updateComment(selectedComment)}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
