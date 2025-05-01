import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { usePaginationStore } from "../entities/post/model/usePaginationStore"
import { usePostStore } from "../entities/post/model/usePostStore"
import { useSearchQueryStore } from "../entities/post/model/useSearchQueryStore"
import { useSortStore } from "../entities/post/model/useSortStore"
import { UserInfoModal } from "../entities/user/ui/UserInfoModal"
import { AddCommentForm } from "../features/comment/ui/AddCommentForm"
import { EditCommentForm } from "../features/comment/ui/EditCommentForm"
import { useSelectedTagStore } from "../features/post/model/useSelectedTagStore"
import { AddPostForm } from "../features/post/ui/AddPostForm"
import { EditPostForm } from "../features/post/ui/EditPostForm"
import { FilterPostSelect } from "../features/post/ui/FilterPostSelect"
import { SearchPostInput } from "../features/post/ui/SearchPostInput"
import { SortbyPostSelect } from "../features/post/ui/SortbyPostSelect"
import { SortPostSelect } from "../features/post/ui/SortPostSelect"
import { Card, CardContent } from "../shared/ui"
import { PaginationPost } from "../features/post/ui/PaginationPost"
import { PostDetailModal } from "../widgets/ui/PostDetailModal"
import { PostHeader } from "../widgets/ui/PostHeader"
import { PostTable } from "../widgets/ui/PostTable"
import { useLoadingStore } from "./model/useLoadingStore"
import { ResonsePostPagination, ResponseUser } from "../entities/post/model/type"

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // 전역 상태
  // const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
  const { setPosts, setTotal } = usePostStore()
  const { searchQuery, setSearchQuery } = useSearchQueryStore()
  // const setShowPostDetailDialog = usePostModalStore((state) => state.setShowPostDetailDialog)
  const { skip, limit, setLimit, setSkip } = usePaginationStore()
  const setLoading = useLoadingStore((state) => state.setLoading)
  const { sortBy, sortOrder, setSortBy, setSortOrder } = useSortStore()
  const { selectedTag, setSelectedTag } = useSelectedTagStore()
  // const setShowUserModal = useUserModalStore((state) => state.setShowUserModal)
  // 커스텀 훅

  // 지역 상태
  // const [total, setTotal] = useState(0)
  // const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
  // const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
  // const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "")
  // const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc")
  // const [loading, setLoading] = useState(false)
  // const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")

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

  // 게시물 가져오기
  const fetchPosts = () => {
    setLoading(true)
    let postsData: ResonsePostPagination
    let usersData: ResponseUser[]

    fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      .then((response) => response.json())
      .then((data) => {
        postsData = data
        return fetch("/api/users?limit=0&select=username,image")
      })
      .then((response) => response.json())
      .then((users) => {
        usersData = users.users
        const postsWithUsers = postsData.posts.map((post) => ({
          ...post,
          author: usersData.find((user) => user.id === post.userId),
        }))
        setPosts(postsWithUsers)
        setTotal(postsData.total)
      })
      .catch((error) => {
        console.error("게시물 가져오기 오류:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag) => {
    if (!tag || tag === "all") {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])
      const postsData = await postsResponse.json()
      const usersData = await usersResponse.json()

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      {/* 게시물 관리자 헤더 */}
      <PostHeader />
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <SearchPostInput />
            <FilterPostSelect />
            <SortbyPostSelect />
            <SortPostSelect />
          </div>

          {/* 게시물 테이블 */}
          <PostTable />
          {/* 페이지네이션 */}
          <PaginationPost />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <AddPostForm />

      {/* 게시물 수정 대화상자 */}
      <EditPostForm />

      {/* 댓글 추가 대화상자 */}
      <AddCommentForm />

      {/* 댓글 수정 대화상자 */}
      <EditCommentForm />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailModal />

      {/* 사용자 모달 */}
      <UserInfoModal />
    </Card>
  )
}

export default PostsManager
