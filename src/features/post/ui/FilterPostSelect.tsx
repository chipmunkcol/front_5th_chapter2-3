import { useNavigate } from "react-router-dom"
import { usePaginationStore } from "../../../entities/post/model/usePaginationStore"
import { usePostStore } from "../../../entities/post/model/usePostStore"
import { useSearchQueryStore } from "../../../entities/post/model/useSearchQueryStore"
import { useSortStore } from "../../../entities/post/model/useSortStore"
import { useLoadingStore } from "../../../pages/model/useLoadingStore"
import { Select } from "../../../shared/ui"
import { ResonsePostPagination, ResponseUser } from "../model/type"
import { useFetchTag } from "../model/useFetchTag"
import { useSelectedTagStore } from "../model/useSelectedTagStore"
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"

// 태그로 필터
export const FilterPostSelect = () => {
  const { tags } = useFetchTag()
  const { selectedTag, setSelectedTag } = useSelectedTagStore()
  const setLoading = useLoadingStore((state) => state.setLoading)
  const { skip, limit } = usePaginationStore()
  const { setPosts, setTotal } = usePostStore()
  const searchQuery = useSearchQueryStore((state) => state.searchQuery)
  const { sortBy, sortOrder } = useSortStore()

  const navigate = useNavigate()

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

  return (
    <Select
      value={selectedTag}
      onValueChange={(value) => {
        setSelectedTag(value)
        fetchPostsByTag(value)
        updateURL()
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags.map((tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
