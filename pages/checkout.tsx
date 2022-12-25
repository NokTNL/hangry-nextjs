import { CheckoutItem } from '@/src/components/checkout/CheckoutItem'
import { CartContext } from '@/src/store/CartContext'
import { groupItemsByStore } from '@/src/utils/cart-utils'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FocusEventHandler, useContext, useRef, useState } from 'react'

enum refNames {
  userName,
  email,
  phoneNumber,
}

export default function CheckoutPage() {
  const {
    state: { items },
  } = useContext(CartContext)
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]
  const [isFormValid, setFormValid] = useState(false)

  const groupedStores = groupItemsByStore(items)
  const subtotal = items.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0
  )
  const handleInput: FocusEventHandler<HTMLInputElement> = () => {
    if (inputRefs.every(refItem => refItem.current?.validity.valid)) {
      setFormValid(true)
    } else {
      setFormValid(false)
    }
  }

  const handleConfirm = () => {
    console.log('confirmed')
  }

  return (
    <main>
      <VStack p="24px" spacing="30px" align="stretch">
        <Heading
          fontWeight="normal"
          color="gray.600"
          fontSize="24px"
          id="page-heading"
        >
          Checkout
        </Heading>
        {groupedStores.map(store => (
          <VStack
            align="stretch"
            as="li"
            listStyleType="none"
            title={store.store.name}
            key={store.store.id}
            spacing="20px"
          >
            <Text as="span" color="gray.600" fontSize="20px" fontWeight="700">
              {store.store.name}
            </Text>
            <VStack
              as="ul"
              alignItems="stretch"
              title="list of items"
              spacing="20px"
            >
              {store.items.map(item => (
                <CheckoutItem
                  key={item.item.id}
                  item={item}
                  store={store.store}
                />
              ))}
            </VStack>
          </VStack>
        ))}
        <Flex as="p" fontWeight="600" fontSize="24px">
          Subtotal:
          <Spacer as="span" />£{subtotal.toFixed(2)}
        </Flex>
        <Heading
          fontWeight="normal"
          color="gray.600"
          fontSize="24px"
          id="page-heading"
        >
          Your details
        </Heading>
        <VStack as="form">
          <FormControl isRequired>
            <FormLabel>Your name</FormLabel>
            <Input
              type="text"
              name="name"
              onInput={handleInput}
              ref={inputRefs[refNames.userName]}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="example@email.com"
              onInput={handleInput}
              ref={inputRefs[refNames.email]}
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              Phone no.{' '}
              <Text as="span" fontSize="12px">
                (optional)
              </Text>
            </FormLabel>
            <Input
              type="tel"
              placeholder="01234 567890"
              pattern="d"
              onInput={handleInput}
              ref={inputRefs[refNames.phoneNumber]}
            />
          </FormControl>
          <Box py="40px" w="100%">
            <Button
              w="100%"
              colorScheme="teal"
              disabled={!isFormValid}
              onClick={handleConfirm}
            >
              Place Order
            </Button>
          </Box>
        </VStack>
      </VStack>
    </main>
  )
}
