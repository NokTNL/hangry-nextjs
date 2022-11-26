import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Heading, HStack, Text } from '@chakra-ui/react'
import { LIST_OF_STORES } from 'db/db'
import { AppHeader } from 'components/AppHeader'

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
      <AppHeader />
      <main>
        <Heading
          fontWeight="normal"
          color="gray.600"
          px="24px"
          py="20px"
          fontSize="24px"
        >
          Pick a store:
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
