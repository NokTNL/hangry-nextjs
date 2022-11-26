import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Card, CardBody, Heading, HStack, Text } from '@chakra-ui/react'
import { STORE_DB } from 'db/db'
import { AppHeader } from 'components/AppHeader'

export function getStaticProps() {
  return {
    props: {
      stores: STORE_DB,
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
          pt="20px"
          fontSize="24px"
        >
          Pick a store:
        </Heading>
        <ul>
          {stores.map(store => (
            <li key={store.id}>
              <Card as={Link} mx="20px" my="15px" href={`/stores/${store.id}`}>
                <CardBody>
                  <HStack spacing="30px">
                    <Image
                      src={store.logoImage}
                      alt=""
                      width={80}
                      height={80}
                    />

                    <Text
                      fontSize="22px"
                      fontWeight="semibold"
                      color="blackAlpha.800"
                    >
                      {store.name}
                    </Text>
                  </HStack>
                </CardBody>
              </Card>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
