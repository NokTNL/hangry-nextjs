import { Heading, Center, Button, VStack, Text } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'

export function getStaticProps() {
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
          <Button>
            <Link href="/stores">Browse Hangry Stores</Link>
          </Button>
        </VStack>
      </Center>
    </>
  )
}
