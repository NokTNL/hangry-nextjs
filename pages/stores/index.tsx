import { StoreItem } from '@/src/components/stores/StoreItem'
import { GetStaticPropsResult } from 'next'
import Head from 'next/head'

import { storeSchema, StoreType } from '@/src/models/db'
import { MyMongoClient } from '@/src/utils/MyMongoClient'
import { Heading, VStack } from '@chakra-ui/react'
import { z } from 'zod'

type StoresPageStaticProps = {
  stores: StoreType[]
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<StoresPageStaticProps>
> {
  const db = await MyMongoClient.getDb()
  const collection = db.collection('stores')

  const storesData = (await collection.find().toArray()).map(
    ({ _id, ...data }) => ({ id: _id.toString(), ...data })
  )
  const parsedStores = z.array(storeSchema).parse(storesData)

  return {
    props: {
      stores: parsedStores,
    },
  }
}

export default function StoresPage({ stores }: StoresPageStaticProps) {
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
