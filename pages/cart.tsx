import { CartItem } from '@/src/components/cart/CartItem'
import { useCart } from '@/src/store/CartContext'
import { groupItemsByStore } from '@/src/utils/cart-utils'
import { Button, Flex, Heading, Spacer, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function CartPage() {
  const router = useRouter()
  const {
    state: { items },
  } = useCart()

  const subtotal = items.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0
  )

  const groupedStores = groupItemsByStore(items)
  const isCheckoutDisabled =
    groupedStores.length === 0 || items.some(item => item.quantity === 0)

  return (
    <main>
      <VStack p="24px" spacing="20px" align="stretch">
        <Heading
          fontWeight="normal"
          color="gray.600"
          fontSize="24px"
          id="page-heading"
        >
          Shopping Cart
        </Heading>
        <VStack
          as="ul"
          alignItems="stretch"
          spacing="20px"
          aria-labelledby="page-heading"
        >
          {groupedStores.map(store => (
            <VStack
              align="stretch"
              as="li"
              listStyleType="none"
              title={store.store.name}
              key={store.store.id}
            >
              <Text as="span" color="gray.600" fontSize="20px" fontWeight="700">
                {store.store.name}
              </Text>
              <VStack as="ul" alignItems="stretch" title="list of items">
                {store.items.map(item => (
                  <CartItem
                    key={item.item.id}
                    item={item}
                    store={store.store}
                  />
                ))}
              </VStack>
            </VStack>
          ))}
        </VStack>
        <Flex as="p" fontWeight="600" fontSize="24px">
          Subtotal:
          <Spacer as="span" />£{subtotal.toFixed(2)}
        </Flex>
        <Button
          colorScheme="teal"
          disabled={isCheckoutDisabled}
          onClick={() => {
            router.push('/checkout')
          }}
        >
          Checkout
        </Button>
      </VStack>
    </main>
  )
}
