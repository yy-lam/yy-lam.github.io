import { useRouter } from 'next/router'
import Layout from '../components/layout'

export default function DynamicPage() {
  const router = useRouter()
  const { postId } = router.query
  return (
    <Layout router={router}>
      <h1>A default page ({postId})</h1>
    </Layout>
  )
}
