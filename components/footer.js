import { Box } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box align="center" opacity={0.5} fontSize="sm">
      &copy; {new Date().getFullYear()} Yuk Yeung Lam. All Rights Reserved.
    </Box>
  )
}
