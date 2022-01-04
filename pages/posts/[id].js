// dynamic routes page
import Head from 'next/head'
import { Heading, Text } from '@chakra-ui/react'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Transition from '../../components/transition'

export default function Post({ postData }) {
  // A react component to render this page
  return (
    <Transition>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Heading as="h1">{postData.title}</Heading>
      <br />
      <Text>Date: {postData.date}</Text>
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Transition>
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
