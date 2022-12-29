import CheckDoneSVG from '@/src/assets/checkdone.svg'
import { CheckoutItem } from '@/src/components/checkout/CheckoutItem'
import { Transaction, transactionSchema } from '@/src/models/db'
import { MyMongoClient } from '@/src/utils/MyMongoClient'
import {
  Flex,
  Heading,
  HStack,
  Icon,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ObjectId } from 'mongodb'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

type TxDoneParams = {
  txId: string
}
type TxDonePageProps = {
  transaction: Transaction
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<TxDoneParams>
): Promise<GetServerSidePropsResult<TxDonePageProps>> {
  const txId = context.params?.txId

  if (!txId) {
    throw Error(`Params 'txId' is undefined `)
  }

  const db = await MyMongoClient.getDb()
  const collection = db.collection('transactions')

  const rawTransaction = await collection.findOne({
    _id: new ObjectId(txId),
  })
  if (rawTransaction === null || rawTransaction === undefined) {
    throw new Error('rawTransaction is null or undefined')
  }

  const typedTransaction = transactionSchema.parse({
    id: rawTransaction?._id.toString(),
    details: rawTransaction?.details,
    subtotal: rawTransaction?.subtotal,
  })

  return {
    props: {
      transaction: typedTransaction,
    },
  }
}

export default function TxDonePage({ transaction }: TxDonePageProps) {
  const groupedStores = transaction.details
  const subtotal = transaction.subtotal
  return (
    <main>
      <VStack px="30px" py="40px" spacing="40px" alignItems="stretch">
        <HStack
          as={Heading}
          fontSize="36px"
          fontWeight={600}
          justifyContent="center"
        >
          <Icon as={CheckDoneSVG} color="green" />
          <span>Order Received!</span>
        </HStack>
        <Text textAlign="center">Transaction ID: {transaction.id}</Text>
        <Heading as="h3" fontWeight="normal" color="gray.600" fontSize="24px">
          Your order details
        </Heading>
        {groupedStores.map(store => (
          <VStack
            align="stretch"
            as="li"
            listStyleType="none"
            title={store.store.name}
            key={store.store.id}
            spacing="20px"
          >
            <Text as="span" color="gray.600" fontSize="20px" fontWeight="700">
              {store.store.name}
            </Text>
            <VStack
              as="ul"
              alignItems="stretch"
              title="list of items"
              spacing="20px"
            >
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
        <Flex as="p" fontWeight="400" fontSize="20px">
          Subtotal:
          <Spacer as="span" />£{subtotal.toFixed(2)}
        </Flex>
      </VStack>
    </main>
  )
}
