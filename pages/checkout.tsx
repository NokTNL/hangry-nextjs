import { CheckoutItem } from '@/src/components/checkout/CheckoutItem'
import { CartContext } from '@/src/store/CartContext'
import { groupItemsByStore } from '@/src/utils/cart-utils'
import { Heading, Text, VStack } from '@chakra-ui/react'
import { useContext } from 'react'

export default function CheckoutPage() {
  const {
    state: { items },
  } = useContext(CartContext)

  const groupedStores = groupItemsByStore(items)
  return (
    <main>
      <VStack p="24px" spacing="20px" align="stretch">
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
          >
            <Text as="span" color="gray.600" fontSize="20px" fontWeight="700">
              {store.store.name}
            </Text>
            <VStack as="ul" alignItems="stretch" title="list of items">
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
      </VStack>
    </main>
  )
}
