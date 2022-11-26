import { Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

export function AppHeader({}) {
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
        <Heading color="blackAlpha.800" fontSize="26px">
          <Link href="/stores">
            Hangry{' '}
            <Text as="span" color="white">
              NextJS
            </Text>
          </Link>
        </Heading>
        <Spacer />
        <Link href="/cart">
          <Image
            src="/icons/cart.svg"
            alt="shopping cart"
            width={35}
            height={35}
          />
        </Link>
      </Flex>
    </header>
  )
}
