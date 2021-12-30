// dynamic routes page
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Heading } from '@chakra-ui/react'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({ postData }) {
  // A react component to render this page
  const router = useRouter()
  return (
    <Layout router={router}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Heading as="h1">{postData.title}</Heading>
      <br />
      {postData.data}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  // Fetch data using params
  const postData = await getPostData(params.id)
  return {
    props: { postData }
  }
}
