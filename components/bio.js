import { Box, Flex, Center, Text, Spacer } from '@chakra-ui/react'
import styled from '@emotion/styled'

/*export const BioSection = styled(Box)`*/
/*padding-left: 3.4em;*/
/*text-indent: -3.4em;*/
/*`*/

export const BioYear = styled.span`
  font-weight: bold;
  margin-right: 1em;
`

export default function BioSection({ date, text }) {
  return (
    <Flex alignItems="start">
      <Center w="260px">
          <BioYear>{date}</BioYear>
      </Center>
      <Box flex="1">
        <Text>{text}</Text>
      </Box>
    </Flex>
  )
}
