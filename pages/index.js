import { Container, Box, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'
import profilePic from '../public/images/profile.jpg'
import { getSortedPostsData } from '../lib/posts'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import BioSection from '../components/bio'

const Page = ({ postsData }) => {
  return (
    <Container>
      <Box borderRadius="lg" bg="red.300" p={3} mb={6} align="center">
        Hello, I&apos;m a CS grad student/software engineer.
      </Box>

      <Box flexShrink={0} mt={{ base: 4, md: 0 }} ml={{ md: 6 }} align="center">
        <Image
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
        <BioSection date="2022.05 (expected)" text="Worked as a software developer summer intern at Goldman Sachs" />
        <BioSection date="2021.12" text="Joined a SasS Finance startup" />
        <BioSection date="2021.06" text="Worked as a software engineer summer intern at a research institute" />
        <BioSection date="2021.02" text="Started MSCS in Tufts University" />
        <BioSection date="2020.11" text="Worked as a data science intern at a logistic company" />
        <BioSection date="2020.08" text="Graduated from CMU (B.S. in Statistics &amp; Machine Learning)" />
      </Section>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Section delay={0.1}>
            <Heading as="h3" variant="section-title">
              Posts
            </Heading>
            <ul>
              {postsData.map(({ id, date, title }) => (
                <li key={id}>
                  <Link href={'/posts/' + id}>
                    <a>{title}</a>
                  </Link>
                  <br />
                  {date}
                </li>
              ))}
            </ul>
          </Section>
        </Box>
      </Box>
    </Container>
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

export default Page
