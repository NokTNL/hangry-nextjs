import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Box, Flex, Heading, HStack, Text } from '@chakra-ui/react'
import { LIST_OF_STORES } from 'db/db'

export function getStaticProps() {
  return {
    props: {
      stores: LIST_OF_STORES,
    },
  }
}

export default function StoresPage({
  stores,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Hangry NextJS: Stores</title>
        <meta
          name="description"
          content="Get the latest food available on Hangry NextJS!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header style={{ position: 'sticky', top: '0' }}>
        <Flex
          backgroundColor="teal.300"
          h="70px"
          align="center"
          py="20px"
          px="28px"
        >
          <Heading color="blackAlpha.800" fontSize="30px">
            Hangry NextJS
          </Heading>
        </Flex>
      </header>
      <main>
        <Heading fontWeight="normal" color="blackAlpha.800" px="16px" py="10px">
          Stores
        </Heading>
        <ul>
          {stores.map(store => (
            <HStack key={store.id} as="li" spacing="30px" px="30px" py="16px">
              <Image src={store.logoImage} alt="" width={80} height={80} />
              <Link href={`/stores/${store.id}`}>
                <Text
                  fontSize="22px"
                  fontWeight="semibold"
                  color="blackAlpha.800"
                >
                  {store.name}
                </Text>
              </Link>
            </HStack>
          ))}
        </ul>
      </main>
    </>
  )
}
