import { render, screen, within } from '@testing-library/react'
import CartPage from 'pages/cart'
import { CartProvider } from 'store/CartContext'

const MOCK_SOME_ITEMS_INIT_STATE = {
  items: [
    {
      store: {
        id: '1',
        name: 'Starbucks',
      },
      item: {
        id: 'item1',
        name: 'Cappucino',
        price: 2,
        photo: '/food-img-url-1',
      },
      quantity: 10,
    },
    {
      store: {
        id: '1',
        name: 'Starbucks',
      },
      item: {
        id: 'item2',
        name: 'Iced Latte',
        price: 3,
        photo: '/food-img-url-2',
      },
      quantity: 15,
    },
    {
      store: {
        id: '2',
        name: 'Pret a Manger',
      },
      item: {
        id: 'item3',
        name: 'Expresso',
        price: 3.5,
        photo: '/food-img-url-3',
      },
      quantity: 20,
    },
  ],
}

describe('/cart page', () => {
  test('Display items grouped together in one store', () => {
    render(
      <CartProvider initialState={MOCK_SOME_ITEMS_INIT_STATE}>
        <CartPage />
      </CartProvider>
    )

    const starbucksEl = screen.getByRole('listitem', {
      name: /Starbucks/i,
    })

    const MOCK_STARBUCK_ITEMS = MOCK_SOME_ITEMS_INIT_STATE.items.filter(
      item => item.store.name === 'Starbucks'
    )

    for (const item of MOCK_STARBUCK_ITEMS) {
      const itemEl = within(starbucksEl).getByRole('listitem', {
        name: new RegExp(item.item.name, 'i'),
      })
      expect(within(itemEl).getByRole('img')).toHaveAttribute(
        'src',
        expect.stringMatching(item.item.photo.replace(/^\//, ''))
      )
      expect(
        within(itemEl).getByText(new RegExp(`£${item.item.price}`))
      ).toBeInTheDocument()
      expect(
        within(itemEl).getByRole('spinbutton', { name: /quantity/i })
      ).toHaveValue(item.quantity.toString())
    }
  })
  test.todo('Display items grouped into multiple stores')
})
