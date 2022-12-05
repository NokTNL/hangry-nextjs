import { Box, Flex, Heading, Spacer, Text, VStack } from '@chakra-ui/react'
import { CartItem } from 'components/cart/CartItem'
import { useCart } from 'store/CartContext'
import { groupItemsByStore } from 'utils/cart-utils'

export default function CartPage() {
  const { state } = useCart()

  const subtotal = state.items.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0
  )

  const groupedStores = groupItemsByStore(state.items)

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
      </VStack>
    </main>
  )
}
