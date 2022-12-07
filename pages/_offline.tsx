import { Heading, VStack } from '@chakra-ui/react'

export default function OfflinePage() {
  return (
    <main>
      <VStack align="center" px="50px" py="32px" spacing="20px">
        <Heading fontWeight={600}>Oops!</Heading>
        <p>
          {`You cannot visit this page as you are offline. Please check your internet
          connection.`}
        </p>
      </VStack>
    </main>
  )
}
