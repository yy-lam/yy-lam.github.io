import { useRouter } from 'next/router'
import Transition from '../components/transition'

export default function DynamicPage() {
  const router = useRouter()
  const { postId } = router.query
  return (
    <Transition>
      <h1>A default page ({postId})</h1>
    </Transition>
  )
}
