import { useRouter } from 'next/router'

export default function DynamicPage() {
  const router = useRouter()
  const { postId } = router.query
  return (
      <h1>A default page ({postId})</h1>
  )
}
