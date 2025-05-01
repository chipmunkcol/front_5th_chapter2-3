import { useNavigate } from "react-router-dom"
import { usePaginationStore } from "../../entities/post/model/usePaginationStore"
import { usePostStore } from "../../entities/post/model/usePostStore"
import { useSearchQueryStore } from "../../entities/post/model/useSearchQueryStore"
import { useSortStore } from "../../entities/post/model/useSortStore"
import { useSelectedTagStore } from "../../features/post/model/useSelectedTagStore"
import { DeletePostBtn } from "../../features/post/ui/DeletePostBtn"
import { Button, TableCell, TableRow } from "../../shared/ui"
import { highlightText } from "../../shared/ui/HighlightText"
import { usePostModalStore } from "../../entities/post/model/usePostModalStore"
import { useCommentStore } from "../../entities/comment/model/useCommentStore"
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react"
import { useUserStore } from "../../entities/user/model/useUserStore"
import { useUserModalStore } from "../../entities/user/model/useUserModalStore"

export const PostList = () => {
  const { posts, setSelectedPost } = usePostStore()
  const { setSelectedUser } = useUserStore()
  const { setShowUserModal } = useUserModalStore()
  const { comments, setComments } = useCommentStore()
  const { setShowPostDetailDialog, setShowEditDialog } = usePostModalStore()
  const searchQuery = useSearchQueryStore((state) => state.searchQuery)
  const { selectedTag, setSelectedTag } = useSelectedTagStore()
  const { skip, limit } = usePaginationStore()
  const { sortBy, sortOrder } = useSortStore()
  const navigate = useNavigate()

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const response = await fetch(`/api/comments/post/${postId}`)
      const data = await response.json()
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  // 게시물 상세 보기
  const openPostDetail = (post) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = async (user) => {
    try {
      const response = await fetch(`/api/users/${user.id}`)
      const userData = await response.json()
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  return (
    <>
      {posts.map((post) => (
        <TableRow key={post.id}>
          <TableCell>{post.id}</TableCell>
          <TableCell>
            <div className="space-y-1">
              <div>{highlightText(post.title, searchQuery)}</div>

              <div className="flex flex-wrap gap-1">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                      selectedTag === tag
                        ? "text-white bg-blue-500 hover:bg-blue-600"
                        : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                    }`}
                    onClick={() => {
                      setSelectedTag(tag)
                      updateURL()
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author)}>
              <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
              <span>{post.author?.username}</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4" />
              <span>{post.reactions?.likes || 0}</span>
              <ThumbsDown className="w-4 h-4" />
              <span>{post.reactions?.dislikes || 0}</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
                <MessageSquare className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedPost(post)
                  setShowEditDialog(true)
                }}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              {/*  */}
              <DeletePostBtn postId={post.id} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
