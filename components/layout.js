import Head from 'next/head'
import { Box, Container } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import VoxelTree from './tree'

const NavBar = dynamic(() => import('./navbar'), { ssr: false })

export default function Layout({ children, router }) {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Neko Heya</title>
      </Head>

      <NavBar path={router.asPath} />
      <Container maxW="container.lg" pt={14}>
        <VoxelTree />
        {children}
      </Container>
    </Box>
  )
}

export const getInitialProps = appContext => {
  return { id: appContext.query.id }
}
