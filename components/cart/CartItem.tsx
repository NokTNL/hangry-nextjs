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
import { CartItemType } from 'store/constants'

type CartItemProps = {
  itemDetails: Omit<CartItemType, 'store'>
}

export function CartItem({ itemDetails }: CartItemProps) {
  return (
    <Card as="li" title={itemDetails.item.name}>
      <CardBody>
        <HStack spacing="20px">
          <Square size="60px" position="relative">
            <Image
              src={itemDetails.item.photo}
              alt=""
              fill
              sizes="(max-width: 768px) 200px, 550px"
            />
          </Square>

          <VStack flexGrow="1">
            <HStack w="100%">
              <Text fontSize="22px" color="blackAlpha.800" flexGrow="1">
                {itemDetails.item.name}
              </Text>
              <Text justifySelf="flex-end">
                £{itemDetails.item.price.toFixed(2)}
              </Text>
            </HStack>
            <NumberInput
              w="100px"
              size="sm"
              alignSelf="flex-end"
              aria-label="quantity"
              value={itemDetails.quantity}
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
