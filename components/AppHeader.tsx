import {
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  Spacer,
  Text,
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import CartSVG from 'assets/cart.svg'
import NextJsPNG from 'assets/nextjs.png'

export function AppHeader() {
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
        </Center>
      </Flex>
    </header>
  )
}
