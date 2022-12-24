import { CartItemType } from '@/src/store/constants'
import { Card, CardBody, HStack, Square, Text } from '@chakra-ui/react'
import Image from 'next/image'

type CheckoutItemProps = {
  item: Omit<CartItemType, 'store'>
  store: CartItemType['store']
}

export function CheckoutItem({ item, store }: CheckoutItemProps) {
  return (
    <>
      <Card as="li" title={item.item.name}>
        <CardBody>
          <HStack spacing="20px">
            <Square size="60px" position="relative">
              <Image
                src={item.item.photo}
                alt=""
                fill
                sizes="(max-width: 768px) 200px, 550px"
              />
            </Square>

            <Text fontSize="22px" color="blackAlpha.800" flexGrow="1">
              {item.item.name}
            </Text>
            <Text>£{item.item.price.toFixed(2)}</Text>
            <Text>x {item.quantity}</Text>
          </HStack>
        </CardBody>
      </Card>
    </>
  )
}
