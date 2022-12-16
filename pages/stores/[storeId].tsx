import { MenuItem } from '@/src/components/stores/MenuItem'
import { StoreMenuItemType, storeSchema } from '@/src/models/db'
import { connectMongoDB } from '@/src/utils/db-utils'
import { Heading, VStack } from '@chakra-ui/react'
import { ObjectId } from 'mongodb'
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next'
import Head from 'next/head'

type StoreMenuParams = {
  storeId: string
}

export type StoreMenuStaticProps = {
  storeId: string
  storeName: string
  menu: StoreMenuItemType[]
}

export const getStaticPaths = async (): Promise<
  GetStaticPathsResult<StoreMenuParams>
> => {
  const storeIds = await connectMongoDB(async db => {
    const collection = db.collection('stores')
    const rawStoresData = await collection
      //                        vvv 'turns on' projection of the _id field
      .find({}, { projection: { _id: true } })
      .toArray()

    const storeIds = rawStoresData.map(({ _id }) => _id.toString())

    return storeIds
  })

  return {
    paths: storeIds.map(id => ({
      params: {
        storeId: id,
      },
    })),

    fallback: false,
  }
}

export const getStaticProps = async (
  context: GetStaticPropsContext<StoreMenuParams>
): Promise<GetStaticPropsResult<StoreMenuStaticProps>> => {
  const targetStoreId = context.params?.storeId

  if (!targetStoreId) {
    throw Error(`URL does not have [storeId] param`)
  }

  const store = await connectMongoDB(async db => {
    const collection = db.collection('stores')
    const rawTargetStore = await collection.findOne({
      _id: new ObjectId(targetStoreId),
    })
    if (!rawTargetStore) {
      throw Error(`The store with id '${targetStoreId}' cannot be found `)
    }
    const targetStore = { ...rawTargetStore, id: rawTargetStore._id.toString() }
    const parsedStore = storeSchema.parse(targetStore)
    return parsedStore
  })

  return {
    props: {
      storeId: targetStoreId,
      storeName: store.name,
      menu: store.menu,
    },
  }
}

export default function StoreMenuPage({
  menu,
  storeName,
  storeId,
}: StoreMenuStaticProps) {
  return (
    <>
      <Head>
        <title>{`Hangry NextJS | ${storeName}`}</title>
      </Head>
      <Heading
        fontWeight="normal"
        color="gray.600"
        px="24px"
        pt="20px"
        fontSize="24px"
      >
        {storeName}
      </Heading>
      <VStack as="ul" alignItems="stretch" p="20px" spacing="15px">
        {menu.map(item => (
          <MenuItem
            item={item}
            key={item.id}
            storeDetails={{ name: storeName, id: storeId }}
          />
        ))}
      </VStack>
    </>
  )
}
