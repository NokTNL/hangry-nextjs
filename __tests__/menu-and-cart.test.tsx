import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CartPage from 'pages/cart'
import StoreMenuPage from 'pages/stores/[storeId]'
import { wrapPage } from './__mocks__/utils'

const MOCK_PAGE_PROPS = {
  Starbucks: {
    storeId: '1',
    storeName: 'Starbucks',
    menu: [
      {
        id: 'item1',
        itemName: 'Cappucino',
        price: 3.5,
        photo: '/food-img-url-1',
      },
      {
        id: 'item2',
        itemName: 'Expresso',
        price: 2,
        photo: '/food-img-url-2',
      },
    ],
  },
  'Pret a Manger': {
    storeId: '2',
    storeName: 'Pret a Manger',
    menu: [
      {
        id: 'item3',
        itemName: 'Iced Latte',
        price: 5.2,
        photo: '/food-img-url-3',
      },
    ],
  },
}

describe('Menu & Cart functionality', () => {
  test(`Add one item, display the item's full details in the cart, quantity = 1`, async () => {
    const user = userEvent.setup()

    const { rerender } = render(
      wrapPage(StoreMenuPage, MOCK_PAGE_PROPS['Starbucks'])
    )
    await user.click(screen.getByRole('button', { name: /Cappucino/ }))

    rerender(wrapPage(CartPage, {}))

    // Within Starbucks item
    const starbucksEl = screen.getByRole('listitem', {
      name: /Starbucks/i,
    })
    // Within Capuccino item
    const cappucinoEl = within(starbucksEl).getByRole('listitem', {
      name: /Cappucino/,
    })
    expect(within(cappucinoEl).getByRole('img')).toHaveAttribute(
      'src',
      expect.stringMatching(/food-img-url-1/)
    )
    expect(within(cappucinoEl).getByText(/£3\.50/)).toBeInTheDocument()
    expect(
      within(cappucinoEl).getByRole('spinbutton', { name: /quantity/i })
    ).toHaveValue('1')
  })
  test(`Add same item twice, increment item's quantity to 2`, async () => {
    const user = userEvent.setup()

    const { rerender } = render(
      wrapPage(StoreMenuPage, MOCK_PAGE_PROPS['Starbucks'])
    )

    // Click two times
    await user.click(screen.getByRole('button', { name: /Cappucino/ }))
    await user.click(screen.getByRole('button', { name: /Cappucino/ }))

    rerender(wrapPage(CartPage, {}))

    // Within Starbucks item
    const starbucksEl = screen.getByRole('listitem', {
      name: /Starbucks/i,
    })
    // Within Capuccino item
    const cappucinoEl = within(starbucksEl).getByRole('listitem', {
      name: /Cappucino/,
    })
    expect(
      within(cappucinoEl).getByRole('spinbutton', { name: /quantity/i })
    ).toHaveValue('2')
  })
  test('Added items from the same store grouped into one store, with all correct info', async () => {
    const user = userEvent.setup()
    const { rerender } = render(
      wrapPage(StoreMenuPage, MOCK_PAGE_PROPS['Starbucks'])
    )

    // 2 Cappucino, 3 Expresso
    await user.click(screen.getByRole('button', { name: /Cappucino/ }))
    await user.click(screen.getByRole('button', { name: /Cappucino/ }))
    await user.click(screen.getByRole('button', { name: /Expresso/ }))
    await user.click(screen.getByRole('button', { name: /Expresso/ }))
    await user.click(screen.getByRole('button', { name: /Expresso/ }))

    rerender(wrapPage(CartPage, {}))

    const starbucksEl = screen.getByRole('listitem', {
      name: /Starbucks/i,
    })

    // Cappucino item
    const cappucinoEl = within(starbucksEl).getByRole('listitem', {
      name: /Cappucino/,
    })
    expect(within(cappucinoEl).getByRole('img')).toHaveAttribute(
      'src',
      expect.stringMatching(/food-img-url-1/)
    )
    expect(within(cappucinoEl).getByText(/£3\.50/)).toBeInTheDocument()
    expect(
      within(cappucinoEl).getByRole('spinbutton', { name: /quantity/i })
    ).toHaveValue('2')

    // Expresso item
    const expressoEl = within(starbucksEl).getByRole('listitem', {
      name: /Expresso/,
    })
    expect(within(expressoEl).getByRole('img')).toHaveAttribute(
      'src',
      expect.stringMatching(/food-img-url-2/)
    )
    expect(within(expressoEl).getByText(/£2\.00/)).toBeInTheDocument()
    expect(
      within(expressoEl).getByRole('spinbutton', { name: /quantity/i })
    ).toHaveValue('3')
  })
  test('Display titles of items grouped into multiple stores', async () => {
    const user = userEvent.setup()

    // Add items in Starbucks page
    const { rerender } = render(
      wrapPage(StoreMenuPage, MOCK_PAGE_PROPS['Starbucks'])
    )
    await user.click(screen.getByRole('button', { name: /Cappucino/ }))
    await user.click(screen.getByRole('button', { name: /Expresso/ }))
    await user.click(screen.getByRole('button', { name: /Expresso/ }))

    // Add items in Pret a Manger page
    rerender(wrapPage(StoreMenuPage, MOCK_PAGE_PROPS['Pret a Manger']))
    await user.click(screen.getByRole('button', { name: /Iced Latte/ }))
    await user.click(screen.getByRole('button', { name: /Iced Latte/ }))

    // Cart Page
    rerender(wrapPage(CartPage, {}))

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
        name: /Expresso/,
      })
    ).toBeInTheDocument()

    // Pret a Manger
    const pretEl = screen.getByRole('listitem', {
      name: /Pret a Manger/i,
    })
    expect(
      within(pretEl).getByRole('listitem', {
        name: /Iced Latte/,
      })
    ).toBeInTheDocument()
  })
  test('Spinbutton changes item quantity', async () => {
    const user = userEvent.setup()

    const { rerender } = render(
      wrapPage(StoreMenuPage, MOCK_PAGE_PROPS['Pret a Manger'])
    )

    await user.click(screen.getByRole('button', { name: /Iced Latte/ }))

    rerender(wrapPage(CartPage, {}))

    const icedLatteEl = screen.getByRole('listitem', { name: /Iced Latte/ })
    const icedLatteQuantityInput = within(icedLatteEl).getByRole('spinbutton', {
      name: /quantity/i,
    })

    await user.clear(icedLatteQuantityInput)
    await user.type(icedLatteQuantityInput, '100')

    expect(
      within(icedLatteEl).getByRole('spinbutton', {
        name: /quantity/i,
      })
    ).toHaveValue('100')
  })
  test('Delete button shows confirmation modal, confirm, then delete item', async () => {
    const user = userEvent.setup()

    // Add items in Starbucks page
    const { rerender } = render(
      wrapPage(StoreMenuPage, MOCK_PAGE_PROPS['Starbucks'])
    )
    await user.click(screen.getByRole('button', { name: /Cappucino/ }))
    await user.click(screen.getByRole('button', { name: /Expresso/ }))

    // Add items in Pret a Manger page
    rerender(wrapPage(StoreMenuPage, MOCK_PAGE_PROPS['Pret a Manger']))
    await user.click(screen.getByRole('button', { name: /Iced Latte/ }))

    // Cart page
    rerender(wrapPage(CartPage, {}))

    const cappucinoEl = screen.getByRole('listitem', { name: /Cappucino/ })

    await user.click(
      within(cappucinoEl).getByRole('button', { name: /remove item/i })
    )

    await user.click(screen.getByRole('button', { name: /confirm remove/i }))

    // Target item removed
    expect(
      screen.queryByRole('listitem', { name: /Cappucino/ })
    ).not.toBeInTheDocument()

    // Remaining items should still be in the document
    expect(
      screen.getByRole('listitem', { name: /Expresso/ })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('listitem', { name: /Iced Latte/ })
    ).toBeInTheDocument()
  })
  test(`Display correct subtotal value`, async () => {
    const user = userEvent.setup()
    // Add items in Starbucks page
    const { rerender } = render(
      wrapPage(StoreMenuPage, MOCK_PAGE_PROPS['Starbucks'])
    )
    // 2x Capuucino
    await user.click(screen.getByRole('button', { name: /Cappucino/ }))
    await user.click(screen.getByRole('button', { name: /Cappucino/ }))
    // 3x Expresso
    await user.click(screen.getByRole('button', { name: /Expresso/ }))
    await user.click(screen.getByRole('button', { name: /Expresso/ }))
    await user.click(screen.getByRole('button', { name: /Expresso/ }))
    // Add items in Pret page
    rerender(wrapPage(StoreMenuPage, MOCK_PAGE_PROPS['Pret a Manger']))
    // 4x Iced Latte
    await user.click(screen.getByRole('button', { name: /Iced Latte/ }))
    await user.click(screen.getByRole('button', { name: /Iced Latte/ }))
    await user.click(screen.getByRole('button', { name: /Iced Latte/ }))
    await user.click(screen.getByRole('button', { name: /Iced Latte/ }))

    // Cart page
    rerender(wrapPage(CartPage, {}))

    expect(screen.getByText(/Subtotal/i)).toHaveTextContent(/£33\.80/i)
  })
})
