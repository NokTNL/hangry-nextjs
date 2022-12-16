import { StoreType } from '@/src/models/db'
import { Box, Card, CardBody, HStack, Square, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

type StoreItemPropType = {
  store: StoreType
}

export function StoreItem({ store }: StoreItemPropType) {
  return (
    <Box as="li" listStyleType="none">
      <Card as={Link} href={`/stores/${store.id}`}>
        <CardBody>
          <HStack spacing="30px">
            <Square size="80px" position="relative">
              <Image
                src={store.logoImage}
                alt=""
                fill
                sizes="(max-width: 768px) 200px, 550px"
              />
            </Square>

            <Text fontSize="22px" fontWeight="semibold" color="blackAlpha.800">
              {store.name}
            </Text>
          </HStack>
        </CardBody>
      </Card>
    </Box>
  )
}
