import { Search } from "lucide-react"
import { usePaginationStore } from "../../../entities/post/model/usePaginationStore"
import { usePostStore } from "../../../entities/post/model/usePostStore"
import { useSearchQueryStore } from "../../../entities/post/model/useSearchQueryStore"
import { useLoadingStore } from "../../../pages/model/useLoadingStore"
import { Input } from "../../../shared/ui"
import { ResonsePostPagination, ResponseUser } from "../../../entities/post/model/type"

export const SearchPostInput = () => {
  const { searchQuery, setSearchQuery } = useSearchQueryStore()
  const { setPosts, setTotal } = usePostStore()
  const setLoading = useLoadingStore((state) => state.setLoading)
  const { skip, limit } = usePaginationStore()

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

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`)
      const data = await response.json()
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    setLoading(false)
  }

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && searchPosts()}
        />
      </div>
    </div>
  )
}
