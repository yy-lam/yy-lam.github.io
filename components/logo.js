import Link from 'next/link'
import Image from 'next/image'
import { Text, useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  line-height: 10px;
  padding: 10px;
  &:hover img {
    transform: rotate(20deg);
  }
`

export default function Logo() {
  const logo = `/images/logo.png`

  return (
    <Link href="/">
      <a>
        <LogoBox>
          <Image
            src={logo}
            width={40}
            height={40}
            object-fit="cover"
            alt="logo"
          />
          <Text
            color={useColorModeValue('gray.800', 'whiteAlpha.900')}
            fontFamily="M PLUS Rouded 1c"
            fontWeight="bold"
            ml={3}
          >
            Neko Heya
          </Text>
        </LogoBox>
      </a>
    </Link>
  )
}
