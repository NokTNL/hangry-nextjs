import { Heading, Center, Button, VStack, Text } from '@chakra-ui/react'
import { GetStaticPropsResult } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { CustomPageProps } from '@/src/models/_app'

export function getStaticProps(): GetStaticPropsResult<CustomPageProps> {
  return {
    props: {
      hideAppHeader: true,
    },
  }
}

export default function Home() {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Get the latest food available on NextJS!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center as="main" h="100vh" p="20px">
        <VStack spacing="30px">
          <Heading color="gray.700" textAlign="center">
            Hangry NextJS is styled with{' '}
            <Text as="span" color="teal.500">
              Chakra UI!
            </Text>
          </Heading>

          <Link href="/stores">
            <Button>Browse Hangry Stores</Button>
          </Link>
        </VStack>
      </Center>
    </>
  )
}
