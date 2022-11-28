import {
  Card,
  CardBody,
  Heading,
  HStack,
  Spacer,
  Square,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { AppHeader } from 'components/AppHeader'
import { STORE_DB } from 'db/db'
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next'
import Image from 'next/image'
import { useCart } from 'store/CartContext'

type ParamsType = {
  storeId: string
}

type MenuItemType = {
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
  const { dispatch: cartDispatch } = useCart()
  const toast = useToast()

  const handleAddItem = (item: MenuItemType) => {
    cartDispatch({
      type: 'ADD_ITEM',
      payload: {
        store: {
          id: storeId,
          name: storeName,
        },
        item: {
          id: item.id,
          name: item.itemName,
          price: item.price,
        },
      },
    })
    toast({
      position: 'bottom-right',
      status: 'success',
      description: `${item.itemName} added to cart`,
    })
  }

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
          <Card
            key={item.id}
            as="li"
            role="button"
            onClick={() => {
              handleAddItem(item)
            }}
          >
            <CardBody>
              <HStack>
                <Square size="60px" position="relative">
                  <Image
                    src={item.photo}
                    alt={item.itemName}
                    fill
                    sizes="(max-width: 768px) 200px, 550px"
                  />
                </Square>
                <Text
                  fontSize="22px"
                  color="blackAlpha.800"
                  w="0" // To make flexGrow work
                  flexGrow="1"
                >
                  {item.itemName}
                </Text>
                <Text justifySelf="flex-end">£{item.price.toFixed(2)}</Text>
              </HStack>
            </CardBody>
          </Card>
        ))}
      </VStack>
    </>
  )
}
