import { Plus } from "lucide-react"
import { usePostModalStore } from "../../../entities/post/model/usePostModalStore"
import { Button } from "../../../shared/ui"

export const ShowAddPostModalBtn = () => {
  const setShowAddDialog = usePostModalStore((state) => state.setShowAddDialog)

  return (
    <Button onClick={() => setShowAddDialog(true)}>
      <Plus className="w-4 h-4 mr-2" />
      게시물 추가
    </Button>
  )
}
