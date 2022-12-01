import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import { CartItem } from 'components/cart/CartItem'
import { useCart } from 'store/CartContext'

export default function CartPage() {
  const { state } = useCart()

  const starBucksItems = state.items.filter(
    item => item.store.name === 'Starbucks'
  )

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
        spacing="15px"
        aria-labelledby="page-heading"
      >
        <Box as="li" listStyleType="none" title={'Starbucks'}>
          <VStack as="ul" px="4px" alignItems="stretch">
            <Text as="span" color="gray.600" fontSize="20px" fontWeight="700">
              Starbucks
            </Text>
            {starBucksItems.map(item => (
              <CartItem key={item.item.id} itemDetails={item} />
            ))}
          </VStack>
        </Box>

        {/* {state.items.map(item => (
            <MenuItem
              item={item}
              key={item.id}
              storeDetails={{ name: storeName, id: storeId }}
            />
          ))} */}
      </VStack>
    </main>
  )
}
