import { StoreItem } from '@/src/components/stores/StoreItem'
import { GetStaticPropsResult } from 'next'
import Head from 'next/head'

import { StoreType, storeSchema } from '@/src/models/db'
import { Heading, VStack } from '@chakra-ui/react'
import { connectMongoDB } from '@/src/utils/db-utils'
import { z } from 'zod'

type StoresPageStaticProps = {
  stores: StoreType[]
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<StoresPageStaticProps>
> {
  const stores = await connectMongoDB(async db => {
    const collection = db.collection('stores')
    const storesData = (await collection.find().toArray()).map(
      ({ _id, ...data }) => ({ id: _id.toString(), ...data })
    )

    const parsedStores = z.array(storeSchema).parse(storesData)
    return parsedStores
  })

  return {
    props: {
      stores: stores,
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
