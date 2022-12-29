import { MyMongoClient } from '@/src/utils/MyMongoClient'
import httpMocks from 'node-mocks-http'
import transactionHandler from '@/pages/api/transaction'
import { ObjectId } from 'mongodb'
import { render, screen } from '@testing-library/react'
import { wrapPage } from './mocks/utils'
import CheckoutPage from '@/pages/checkout'
import userEvent from '@testing-library/user-event'

const reqBody = {
  subtotal: 10.99,
  details: [
    {
      store: {
        id: '639b183136d87ed1b334219b',
        name: 'Starbucks',
      },
      items: [
        {
          item: {
            id: 'item1',
            name: 'Cappuccino',
            price: 3.5,
            photo: '/img/starbucks-cappuccino.jpeg',
          },
          quantity: 1,
        },
      ],
    },
    {
      store: {
        id: '639b183136d87ed1b334219c',
        name: 'Burger King',
      },
      items: [
        {
          item: {
            id: 'item10',
            name: 'Chicken Royale',
            price: 7.49,
            photo: '/img/chicken-royle.png',
          },
          quantity: 1,
        },
      ],
    },
  ],
}
describe('DELETE - API test', () => {
  it('POST request adds new transaction to the DB', async () => {
    const request = httpMocks.createRequest({
      method: 'POST',
      // Wrong typing - only works if you JSON.stringfy it
      // @ts-ignore
      body: JSON.stringify(reqBody),
    })
    const response = httpMocks.createResponse()
    await transactionHandler(request, response)

    const txId = response._getJSONData().txId

    const db = await MyMongoClient.getDb()
    const collection = db.collection('transactions')
    const newTransaction = await collection.findOne({ _id: new ObjectId(txId) })

    // @ts-ignore
    expect(newTransaction.details).toEqual(reqBody.details)
    // @ts-ignore
    expect(newTransaction.subtotal).toEqual(reqBody.subtotal)
    // @ts-ignore
    expect(newTransaction._id).toEqual(new ObjectId(txId))
  })
  it.skip('Submits the form and able to query the newly added transaction', async () => {
    const user = userEvent.setup()
    render(wrapPage(CheckoutPage, {}))

    await user.type(screen.getByRole('textbox', { name: /Your name/i }), 'ABC')
    await user.type(
      screen.getByRole('textbox', { name: /Email/i }),
      'abc@c.com'
    )
    await user.click(
      screen.getByRole('checkbox', { name: /Terms and Conditions/i })
    )

    await user.click(screen.getByRole('button', { name: /place order/i }))

    expect(
      screen.getByRole('button', { name: /submitting order/i })
    ).toBeDisabled()
  })
})
