import Link from 'next/link'
import { Heading, Center, Grid, GridItem } from '@chakra-ui/react'
import Transition from '../../components/transition'
import { getSortedPostsData } from '../../lib/posts'

export default function Posts({ postsData }) {
  return (
    <Transition>
      <Heading as="h3" marginLeft="1em" fontSize={30} mb={7}>
        All Posts
      </Heading>
      <Center>
        <Grid w="68%" templateColumns="repeat(2, 1fr)" gap={6}>
          {postsData.map(({ id, date, title }) => (
            <GridItem key={id}>
              <Link href={'/posts/' + id}>
                <a>{title}</a>
              </Link>
              <br />
              {date}
            </GridItem>
          ))}
        </Grid>
      </Center>
    </Transition>
  )
}

export async function getStaticProps() {
  const postsData = getSortedPostsData()
  return {
    props: {
      postsData
    }
  }
}
