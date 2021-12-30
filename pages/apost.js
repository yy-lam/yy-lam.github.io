import Link from 'next/link'

const APost = () => {
  return (
    <>
      <h1>A Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  )
}

export default APost
