import {
  Card,
  CardBody,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Square,
  Text,
  VStack,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useCart } from 'store/CartContext'
import { CartItemType } from 'store/constants'

type CartItemProps = {
  item: Omit<CartItemType, 'store'>
  store: CartItemType['store']
}

export function CartItem({ item, store }: CartItemProps) {
  const { dispatch: cartDispatch } = useCart()

  const handleChangeQuantity = (newQuantity: string) => {
    const parsedQuantity = newQuantity === '' ? 0 : parseInt(newQuantity)
    cartDispatch({
      type: 'CHANGE_ITEM_QUANTITY',
      payload: {
        store: store,
        item: item.item,
        newQuantity: parsedQuantity,
      },
    })
  }
  return (
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

          <VStack flexGrow="1">
            <HStack w="100%">
              <Text fontSize="22px" color="blackAlpha.800" flexGrow="1">
                {item.item.name}
              </Text>
              <Text justifySelf="flex-end">£{item.item.price.toFixed(2)}</Text>
            </HStack>
            {/* TODO: add validation that items with 0 quantity cannot be checked out */}
            <NumberInput
              w="100px"
              size="sm"
              alignSelf="flex-end"
              aria-label="quantity"
              min={1}
              value={item.quantity === 0 ? '' : item.quantity}
              onChange={handleChangeQuantity}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </VStack>
        </HStack>
      </CardBody>
    </Card>
  )
}
