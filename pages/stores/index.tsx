import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import {
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  Square,
  Text,
  VStack,
} from '@chakra-ui/react'
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
        <VStack as="ul" alignItems="stretch" p="20px" spacing="15px">
          {stores.map(store => (
            <Box as="li" key={store.id} listStyleType="none">
              <Card as={Link} href={`/stores/${store.id}`}>
                <CardBody>
                  <HStack spacing="30px">
                    <Square size="80px" position="relative">
                      <Image
                        src={store.logoImage}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 200px, 550px"
                      />
                    </Square>

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
            </Box>
          ))}
        </VStack>
      </main>
    </>
  )
}
