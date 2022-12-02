import {
  Button,
  Card,
  CardBody,
  Center,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Square,
  Text,
  VStack,
} from '@chakra-ui/react'
import DeleteSvg from 'assets/delete.svg'
import Image from 'next/image'
import { useState } from 'react'
import { useCart } from 'store/CartContext'
import { CartItemType } from 'store/constants'

type CartItemProps = {
  item: Omit<CartItemType, 'store'>
  store: CartItemType['store']
}

export function CartItem({ item, store }: CartItemProps) {
  const { dispatch: cartDispatch } = useCart()
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false)

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

  const handleConfirmRemove = () => {
    cartDispatch({
      type: 'DELETE_ITEM',
      payload: {
        store: store,
        item: item.item,
      },
    })
    setRemoveModalOpen(false)
  }

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

            <VStack flexGrow="1">
              <HStack w="100%">
                <Text fontSize="22px" color="blackAlpha.800" flexGrow="1">
                  {item.item.name}
                </Text>
                <Text justifySelf="flex-end">
                  £{item.item.price.toFixed(2)}
                </Text>
              </HStack>
              <HStack alignSelf="flex-end" spacing="14px">
                <Icon
                  as={DeleteSvg}
                  fontSize="24px"
                  color="red.500"
                  role="button"
                  aria-label="remove item"
                  onClick={() => setRemoveModalOpen(true)}
                />
                {/* TODO: add validation that items with 0 quantity cannot be checked out */}
                <NumberInput
                  w="100px"
                  size="sm"
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
              </HStack>
            </VStack>
          </HStack>
        </CardBody>
      </Card>
      <Modal
        isOpen={isRemoveModalOpen}
        onClose={() => setRemoveModalOpen(false)}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Are you sure to remove ${store.name} - ${item.item.name}?`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Square size="120px" position="relative">
                <Image
                  src={item.item.photo}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 200px, 550px"
                />
              </Square>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={handleConfirmRemove}
              aria-label="confirm remove"
            >
              Remove
            </Button>
            <Button variant="ghost" onClick={() => setRemoveModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
