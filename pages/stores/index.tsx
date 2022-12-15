import { StoreItem } from '@/src/components/stores/StoreItem'
import { GetStaticPropsResult } from 'next'
import Head from 'next/head'

import { StoresData, storesSchema } from '@/src/models/db'
import { Heading, VStack } from '@chakra-ui/react'
import { MongoClient } from 'mongodb'

type StoresPageStaticProps = {
  stores: StoresData
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<StoresPageStaticProps>
> {
  // 🤯 remove credentials from here!
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.woa4fgk.mongodb.net/?retryWrites=true&w=majority`
  )
  const db = client.db('hangry-nextjs')
  const collection = db.collection('stores')
  const storesData = (await collection.find().toArray()).map(
    ({ _id, ...data }) => ({ id: _id.toString(), ...data })
  )

  const parsedStores = storesSchema.parse(storesData)

  await client.close()

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
