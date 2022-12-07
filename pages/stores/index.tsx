import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { StoreItem } from './../../components/stores/StoreItem'

import { Heading, VStack } from '@chakra-ui/react'
import { STORE_DB } from 'db/db'

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
        <title>Hangry NextJS | Stores</title>
      </Head>
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
            <StoreItem store={store} key={store.id} />
          ))}
        </VStack>
      </main>
    </>
  )
}
