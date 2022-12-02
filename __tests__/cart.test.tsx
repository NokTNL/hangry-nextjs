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
  test('Display all details of items, grouped in one store', () => {
    render(
      <CartProvider initialState={MOCK_SOME_ITEMS_INIT_STATE}>
        <CartPage />
      </CartProvider>
    )

    const starbucksEl = screen.getByRole('listitem', {
      name: /Starbucks/i,
    })
    // Capucino item
    const cappucinoEl = within(starbucksEl).getByRole('listitem', {
      name: /Cappucino/,
    })
    expect(within(cappucinoEl).getByRole('img')).toHaveAttribute(
      'src',
      expect.stringMatching(/food-img-url-1/)
    )
    expect(within(cappucinoEl).getByText(/£2\.00/)).toBeInTheDocument()
    expect(
      within(cappucinoEl).getByRole('spinbutton', { name: /quantity/i })
    ).toHaveValue('10')

    // Iced Latte item
    const icedLatteEl = within(starbucksEl).getByRole('listitem', {
      name: /Iced Latte/,
    })
    expect(within(icedLatteEl).getByRole('img')).toHaveAttribute(
      'src',
      expect.stringMatching(/food-img-url-2/)
    )
    expect(within(icedLatteEl).getByText(/£3\.00/)).toBeInTheDocument()
    expect(
      within(icedLatteEl).getByRole('spinbutton', { name: /quantity/i })
    ).toHaveValue('15')
  })
  test('Display titles of items grouped into multiple stores', () => {
    render(
      <CartProvider initialState={MOCK_SOME_ITEMS_INIT_STATE}>
        <CartPage />
      </CartProvider>
    )

    // Starbucks
    const starbucksEl = screen.getByRole('listitem', {
      name: /Starbucks/i,
    })
    expect(
      within(starbucksEl).getByRole('listitem', {
        name: /Cappucino/,
      })
    ).toBeInTheDocument()
    expect(
      within(starbucksEl).getByRole('listitem', {
        name: /Iced Latte/,
      })
    ).toBeInTheDocument()

    // Pret a Manger
    const pretEl = screen.getByRole('listitem', {
      name: /Pret a Manger/i,
    })
    expect(
      within(pretEl).getByRole('listitem', {
        name: /Expresso/,
      })
    ).toBeInTheDocument()
  })
})
