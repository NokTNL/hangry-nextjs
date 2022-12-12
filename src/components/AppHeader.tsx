import {
  Center,
  Circle,
  Flex,
  Heading,
  HStack,
  Icon,
  Spacer,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import CartSVG from 'src/assets/cart.svg'
import NextJsPNG from 'src/assets/nextjs.png'
import { CartContext } from 'src/store/CartContext'

export function AppHeader() {
  const { state: cartState } = useContext(CartContext)

  const numberOfItems = cartState.items.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <header
      style={{
        position: 'sticky',
        top: '0',
      }}
    >
      <Flex
        backgroundColor="teal.300"
        h="70px"
        align="center"
        py="20px"
        px="28px"
      >
        <Heading>
          <HStack as={Link} href="/stores">
            <Text fontWeight="light" fontSize="26px">
              Hangry
            </Text>
            <Image src={NextJsPNG} alt="NextJS" height={40} priority />
          </HStack>
        </Heading>
        <Spacer />
        <Center as={Link} href="/cart">
          <Icon as={CartSVG} fontSize="35px" color="white" />
          <Circle
            bgColor={'red.400'}
            size="18px"
            color="white"
            fontSize="13px"
            fontWeight={700}
            justifyContent={'center'}
            position="relative"
            bottom="10px"
          >
            <VisuallyHidden>Cart item count: {numberOfItems}</VisuallyHidden>
            <Text aria-hidden>{numberOfItems}</Text>
          </Circle>
        </Center>
      </Flex>
    </header>
  )
}
