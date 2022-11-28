import { Heading, VStack } from '@chakra-ui/react'
import { AppHeader } from 'components/AppHeader'
import { STORE_DB } from 'db/db'
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next'
import { MenuItem } from '../../components/stores/MenuItem'

type ParamsType = {
  storeId: string
}

export type MenuItemType = {
  id: string
  itemName: string
  price: number
  photo: string
}

export type StaticPropsType = {
  storeId: string
  storeName: string
  menu: MenuItemType[]
}

export const getStaticPaths = (
  context: GetStaticPropsContext,
  testUtils?: {
    mockDB?: typeof STORE_DB
  }
): GetStaticPathsResult<ParamsType> => {
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
  context: GetStaticPropsContext<ParamsType>,
  testUtils?: {
    mockDB?: typeof STORE_DB
  }
): GetStaticPropsResult<StaticPropsType> => {
  const storeDB = testUtils?.mockDB ?? STORE_DB

  const targetStoreId = context.params?.storeId!

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
}: StaticPropsType) {
  return (
    <>
      <AppHeader />
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
