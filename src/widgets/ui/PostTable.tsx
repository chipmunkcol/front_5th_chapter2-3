// 게시물 테이블 렌더링
const renderPostTable = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">ID</TableHead>
        <TableHead>제목</TableHead>
        <TableHead className="w-[150px]">작성자</TableHead>
        <TableHead className="w-[150px]">반응</TableHead>
        <TableHead className="w-[150px]">작업</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <PostList />
    </TableBody>
  </Table>
)

export const PostTable = () => {
  return <>{loading ? <div className="flex justify-center p-4">로딩 중...</div> : renderPostTable()}</>
}
