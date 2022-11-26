import { AppHeader } from 'components/AppHeader'
import { STORE_DB } from 'db/db'
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next'

type ParamsType = {
  storeId: string
}

export type StaticPropsType = {
  storeId: string
  storeName: string
  menu: {
    id: string
    itemName: string
    price: number
  }[]
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

export default function StoreMenuPage({ menu, storeId }: StaticPropsType) {
  return (
    <>
      <AppHeader />
      <div>{`id: ${storeId}`}</div>
      {JSON.stringify(menu)}
    </>
  )
}
