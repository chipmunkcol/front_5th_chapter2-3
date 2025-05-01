import { ShowAddPostModalBtn } from "../../features/post/ui/ShowAddPostModalBtn"
import { CardHeader, CardTitle } from "../../shared/ui"

export const PostHeader = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>게시물 관리자</span>
        <ShowAddPostModalBtn />
      </CardTitle>
    </CardHeader>
  )
}
