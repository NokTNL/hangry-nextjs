import { Card, CardBody, Heading, HStack, Spacer, Text } from '@chakra-ui/react'
import { AppHeader } from 'components/AppHeader'
import { STORE_DB } from 'db/db'
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next'
import Image from 'next/image'

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
    photo: string
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

export default function StoreMenuPage({ menu, storeName }: StaticPropsType) {
  return (
    <>
      <AppHeader />
      <Heading
        fontWeight="normal"
        color="gray.600"
        px="24px"
        py="20px"
        fontSize="24px"
      >
        {storeName}
      </Heading>
      {menu.map(item => (
        <Card key={item.id} mx="20px" my="15px">
          <CardBody>
            <HStack spacing="24px">
              <Image
                src={item.photo}
                alt={item.itemName}
                width={60}
                height={60}
              />
              <Text fontSize="22px" color="blackAlpha.800" w="145px">
                {item.itemName}
              </Text>
              <Text justifySelf="flex-end">£{item.price.toFixed(2)}</Text>
            </HStack>
          </CardBody>
        </Card>
      ))}
    </>
  )
}
