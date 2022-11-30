import {
  Card,
  CardBody,
  HStack,
  Square,
  Text,
  useToast,
} from '@chakra-ui/react'
import Image from 'next/image'
import { MenuItemType } from 'pages/stores/[storeId]'
import { addItemSynced } from 'store/cartSlice'
import { useAppDispatch } from 'store/hooks'

type MenuItemProps = {
  item: MenuItemType
  storeDetails: {
    id: string
    name: string
  }
}

export function MenuItem({ item, storeDetails }: MenuItemProps) {
  const dispatch = useAppDispatch()
  const toast = useToast()

  const handleAddItem = (item: MenuItemType) => {
    dispatch(
      addItemSynced({
        store: {
          id: storeDetails.id,
          name: storeDetails.name,
        },
        item: {
          id: item.id,
          name: item.itemName,
          price: item.price,
        },
      })
    )

    toast({
      position: 'bottom-right',
      status: 'success',
      description: `${item.itemName} added to cart`,
    })
  }
  return (
    <Card
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
              alt=""
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
  )
}
