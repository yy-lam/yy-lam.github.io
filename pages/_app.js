import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/layout'
import '../styles/global.css'
import theme from '../lib/theme'
import { AnimatePresence } from 'framer-motion'

// Special component works as the root component React will render
// Compent is a props that holds the actualw page contents
// pageProps are specific props that we are getting
export default function MyApp({ Component, pageProps, router }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout router={router}>
        <AnimatePresence exitBeforeEnter initial={true}>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </ChakraProvider>
  )
}
