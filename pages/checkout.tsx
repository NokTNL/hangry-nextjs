import { CheckoutItem } from '@/src/components/checkout/CheckoutItem'
import { CartContext } from '@/src/store/CartContext'
import { groupItemsByStore } from '@/src/utils/cart-utils'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react'
import { createRef, useContext, useState } from 'react'

const inputNames = ['userName', 'email', 'phoneNumber', 'tncCheckbox'] as const
/**
 * Utility function for mapping an array of names to an object with the names as the keys
 * @param fn the function that returns the desired property value
 */
function mapInputNamesToObj<V>(fn: (name: typeof inputNames[number]) => V) {
  // The type definition of Object.fromEntries is not smart to know that the array passed in is a tuple
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return Object.fromEntries(
    inputNames.map(name => [name, fn(name)] as const)
  ) as {
    [Key in typeof inputNames[number]]: V
  }
}

export default function CheckoutPage() {
  const {
    state: { items },
  } = useContext(CartContext)

  const inputRefs = mapInputNamesToObj(() => createRef<HTMLInputElement>())
  const [inputValidityStates, setInputValidityStates] = useState(
    mapInputNamesToObj(() => true)
  )
  const [isPlacingOrder, setPlacingOrder] = useState(false)

  const groupedStores = groupItemsByStore(items)
  const subtotal = items.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0
  )

  const handleConfirm = () => {
    const currentValidityStates = mapInputNamesToObj(
      name => inputRefs[name].current?.validity.valid ?? false
    )

    setInputValidityStates(currentValidityStates)

    const isWholeFormValid = inputNames.every(
      input => currentValidityStates[input] === true
    )
    if (isWholeFormValid) {
      setPlacingOrder(true)
    }
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
        <VStack as="form" spacing="20px">
          <FormControl isRequired isInvalid={!inputValidityStates.userName}>
            <FormLabel>Your name</FormLabel>
            <Input type="text" ref={inputRefs.userName} />
            <FormErrorMessage>Your name is required</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!inputValidityStates.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              ref={inputRefs.email}
              placeholder="example@email.com"
            />
            <FormErrorMessage>A valid email is required</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!inputValidityStates.phoneNumber}>
            <FormLabel>
              Phone no.{' '}
              <Text as="span" fontSize="12px">
                (optional)
              </Text>
            </FormLabel>
            <Input
              type="tel"
              ref={inputRefs.phoneNumber}
              placeholder="01234 567890"
              pattern="\d+"
            />
            <FormErrorMessage>The phone number must be valid</FormErrorMessage>
          </FormControl>

          <Box w="100%">
            <Checkbox isRequired ref={inputRefs.tncCheckbox}>
              I agree to the Terms and Conditions{' '}
              <Text as="span" color="red">
                *
              </Text>
            </Checkbox>
            {!inputValidityStates.tncCheckbox && (
              <Text color="red.500" fontSize="14px" aria-live="polite">
                You must agree to the Terms and Conditions
              </Text>
            )}
          </Box>
          <Box py="40px" w="100%">
            <Button
              w="100%"
              colorScheme="teal"
              onClick={handleConfirm}
              isDisabled={isPlacingOrder}
            >
              {isPlacingOrder ? 'Submitting order...' : 'Place Order'}
            </Button>
          </Box>
        </VStack>
      </VStack>
    </main>
  )
}
