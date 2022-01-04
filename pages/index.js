import { Container, Box, Heading, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'
import profilePic from '../public/images/profile.jpg'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import BioSection from '../components/bio'
import Transition from '../components/transition'

export default function Page() {
  return (
    <Transition>
      <Container>
        <Box
          borderRadius="lg"
          bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.300')}
          p={3}
          mb={6}
          align="center"
        >
          Hello, I&apos;m a CS grad student/software engineer.
        </Box>

        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          align="center"
        >
          <Image
            unoptimized={true}
            src={profilePic}
            alt="my profile"
            width="100%"
            height="100%"
            className="portfolio"
            objectFit="cover"
          />
          <Heading as="h2" variant="page-title">
            Lam, Yuk Yeung
          </Heading>
        </Box>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title">
            Work
          </Heading>
          <Paragraph>
            Yeung is a master student in computer science &amp; a software
            engineer in Finance. Currently, he is building a quantitative model
            for a SaaS Finance startup, and he will join Goldman Sachs as a
            Software Developer intern this summer.
          </Paragraph>
        </Section>

        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            Bio
          </Heading>
          <BioSection
            date="2022.05 (expected)"
            text="Work as a software developer summer intern at Goldman Sachs"
          />
          <BioSection date="2021.12" text="Joined a SasS Finance startup" />
          <BioSection
            date="2021.06"
            text="Worked as a software engineer intern at a research institute"
          />
          <BioSection
            date="2021.02"
            text="Started Master's in Computer Science at Tufts University"
          />
          <BioSection
            date="2020.11"
            text="Worked as a data science intern at a logistic company"
          />
          <BioSection
            date="2020.08"
            text="Graduated from CMU with B.S. in Statistics &amp; Machine Learning"
          />
        </Section>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title">
            <Link href="/posts">
              <a>Posts</a>
            </Link>
          </Heading>
        </Section>
      </Container>
    </Transition>
  )
}
