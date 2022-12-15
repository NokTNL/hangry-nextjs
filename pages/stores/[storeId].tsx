import { Heading, VStack } from '@chakra-ui/react'
import { MenuItemType, STORE_DB } from '@/db/dummyDb'
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next'
import Head from 'next/head'
import { MenuItem } from '@/src/components/stores/MenuItem'

type StoreMenuParams = {
  storeId: string
}

export type StoreMenuStaticProps = {
  storeId: string
  storeName: string
  menu: MenuItemType[]
}

export const getStaticPaths = (
  context: GetStaticPropsContext,
  testUtils?: {
    mockDB?: typeof STORE_DB
  }
): GetStaticPathsResult<StoreMenuParams> => {
  const storeDB = testUtils?.mockDB ?? STORE_DB
  return {
    paths: storeDB.map(store => ({
      params: {
        storeId: store.id,
      },
    })),

    fallback: false,
  }
}

export const getStaticProps = (
  context: GetStaticPropsContext<StoreMenuParams>,
  testUtils?: {
    mockDB?: typeof STORE_DB
  }
): GetStaticPropsResult<StoreMenuStaticProps> => {
  const storeDB = testUtils?.mockDB ?? STORE_DB

  const targetStoreId = context.params?.storeId
  if (!targetStoreId) {
    throw Error(`URL does not have [storeId] param`)
  }

  const store = storeDB.find(store => store.id === targetStoreId)
  if (!store) {
    throw Error(`The store with id '${targetStoreId}' cannot be found `)
  }

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
