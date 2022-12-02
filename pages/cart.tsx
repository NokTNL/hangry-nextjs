import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import { CartItem } from 'components/cart/CartItem'
import { useCart } from 'store/CartContext'
import { groupItemsByStore } from 'utils/cart-utils'

export default function CartPage() {
  const { state } = useCart()

  const groupedStores = groupItemsByStore(state.items)

  return (
    <main>
      <Heading
        fontWeight="normal"
        color="gray.600"
        px="24px"
        pt="20px"
        fontSize="24px"
        id="page-heading"
      >
        Shopping Cart
      </Heading>
      <VStack
        as="ul"
        alignItems="stretch"
        p="20px"
        spacing="20px"
        aria-labelledby="page-heading"
      >
        {groupedStores.map(store => (
          <Box
            as="li"
            listStyleType="none"
            title={store.store.name}
            key={store.store.id}
          >
            <VStack as="ul" px="4px" alignItems="stretch" title="list of items">
              <Text as="span" color="gray.600" fontSize="20px" fontWeight="700">
                {store.store.name}
              </Text>
              {store.items.map(item => (
                <CartItem key={item.item.id} itemDetails={item} />
              ))}
            </VStack>
          </Box>
        ))}
      </VStack>
    </main>
  )
}
