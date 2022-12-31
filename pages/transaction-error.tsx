import { Button, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react'
import ErrorSvg from '@/src/assets/error.svg'
import Link from 'next/link'

export default function TxErrorPage() {
  return (
    <main>
      <VStack px="30px" py="40px" spacing="40px" alignItems="stretch">
        <HStack
          as={Heading}
          fontSize="36px"
          fontWeight={600}
          justifyContent="center"
        >
          <Icon as={ErrorSvg} color="red.500" />
          <span>Oopsie!</span>
        </HStack>
        <Text textAlign="center">
          Something went wrong when processing your order. Please go back and
          try again.
        </Text>
        <Button as={Link} href="/checkout">
          Go back to Checkout page
        </Button>
      </VStack>
    </main>
  )
}
