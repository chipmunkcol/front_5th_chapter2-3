import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { useCommentModalStore } from "../../entities/comment/model/useCommentModalStore"
import { useCommentStore } from "../../entities/comment/model/useCommentStore"
import { usePostModalStore } from "../../entities/post/model/usePostModalStore"
import { usePostStore } from "../../entities/post/model/usePostStore"
import { useSearchQueryStore } from "../../entities/post/model/useSearchQueryStore"
import { Dialog, DialogContent, DialogTitle, Button, DialogHeader } from "../../shared/ui"
import { highlightText } from "../../shared/ui/HighlightText"

// 댓글 렌더링
const RenderComments = ({ postId }: { postId: number }) => {
  const searchQuery = useSearchQueryStore((state) => state.searchQuery)
  const { comments, setComments, setNewComment, setSelectedComment } = useCommentStore()
  const { setShowAddCommentDialog, setShowEditCommentDialog } = useCommentModalStore()

  // 댓글 좋아요
  const likeComment = async (id, postId) => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: [postId].find((c) => c.id === id).likes + 1 }),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
        ),
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  // 댓글 삭제
  const deleteComment = async (id, postId) => {
    try {
      await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      })
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }))
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment)
                  setShowEditCommentDialog(true)
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const PostDetailModal = () => {
  const selectedPost = usePostStore((state) => state.selectedPost)
  const { showPostDetailDialog, setShowPostDetailDialog } = usePostModalStore()
  const searchQuery = useSearchQueryStore((state) => state.searchQuery)

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="">
          <DialogTitle>{selectedPost && highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{selectedPost && highlightText(selectedPost?.body, searchQuery)}</p>

          {selectedPost?.id !== undefined && <RenderComments postId={selectedPost.id} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
