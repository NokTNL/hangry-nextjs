import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CartPage from 'pages/cart'
import StoreMenuPage, {
  getStaticProps,
  StoreMenuStaticProps,
} from 'pages/stores/[storeId]'
import { wrapPage } from './mocks/utils'

describe('Menu & Cart functionality', () => {
  let StarbucksPageProps: StoreMenuStaticProps
  let BKPageProps: StoreMenuStaticProps

  beforeAll(async () => {
    StarbucksPageProps = await getStaticProps({
      params: { storeId: '111111111111111111111111' },
    }).then(
      // @ts-ignore
      res => res.props
    )
    BKPageProps = await getStaticProps({
      params: { storeId: '222222222222222222222222' },
    }).then(
      // @ts-ignore
      res => res.props
    )
  })
  test(`Add one item, display the item's full details in the cart, quantity = 1`, async () => {
    const user = userEvent.setup()

    const StarbucksPageProps = await getStaticProps({
      params: { storeId: '111111111111111111111111' },
    }).then(
      // @ts-ignore
      res => res.props
    )

    const { rerender } = render(wrapPage(StoreMenuPage, StarbucksPageProps))

    await user.click(screen.getByRole('button', { name: /Cappuccino/ }))

    rerender(wrapPage(CartPage, {}))

    // Within Starbucks item
    const starbucksEl = screen.getByRole('listitem', {
      name: /Starbucks/i,
    })
    // Within Capuccino item
    const CappuccinoEl = within(starbucksEl).getByRole('listitem', {
      name: /Cappuccino/,
    })
    expect(within(CappuccinoEl).getByRole('img')).toHaveAttribute(
      'src',
      expect.stringMatching(/food-img-url-1/)
    )
    expect(within(CappuccinoEl).getByText(/£3\.50/)).toBeInTheDocument()
    expect(
      within(CappuccinoEl).getByRole('spinbutton', { name: /quantity/i })
    ).toHaveValue('1')
  })
  test(`Add same item twice, increment item's quantity to 2`, async () => {
    const user = userEvent.setup()

    const { rerender } = render(wrapPage(StoreMenuPage, StarbucksPageProps))

    // Click two times
    await user.click(screen.getByRole('button', { name: /Cappuccino/ }))
    await user.click(screen.getByRole('button', { name: /Cappuccino/ }))

    rerender(wrapPage(CartPage, {}))

    // Within Starbucks item
    const starbucksEl = screen.getByRole('listitem', {
      name: /Starbucks/i,
    })
    // Within Capuccino item
    const CappuccinoEl = within(starbucksEl).getByRole('listitem', {
      name: /Cappuccino/,
    })
    expect(
      within(CappuccinoEl).getByRole('spinbutton', { name: /quantity/i })
    ).toHaveValue('2')
  })
  test('Added items from the same store grouped into one store, with all correct info', async () => {
    const user = userEvent.setup()

    const { rerender } = render(wrapPage(StoreMenuPage, StarbucksPageProps))

    // 2 Cappuccino, 3 Expresso
    await user.click(screen.getByRole('button', { name: /Cappuccino/ }))
    await user.click(screen.getByRole('button', { name: /Cappuccino/ }))
    await user.click(screen.getByRole('button', { name: /Expresso/ }))
    await user.click(screen.getByRole('button', { name: /Expresso/ }))
    await user.click(screen.getByRole('button', { name: /Expresso/ }))

    rerender(wrapPage(CartPage, {}))

    const starbucksEl = screen.getByRole('listitem', {
      name: /Starbucks/i,
    })

    // Cappuccino item
    const CappuccinoEl = within(starbucksEl).getByRole('listitem', {
      name: /Cappuccino/,
    })
    expect(within(CappuccinoEl).getByRole('img')).toHaveAttribute(
      'src',
      expect.stringMatching(/food-img-url-1/)
    )
    expect(within(CappuccinoEl).getByText(/£3\.50/)).toBeInTheDocument()
    expect(
      within(CappuccinoEl).getByRole('spinbutton', { name: /quantity/i })
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

    const { rerender } = render(wrapPage(StoreMenuPage, StarbucksPageProps))
    await user.click(screen.getByRole('button', { name: /Cappuccino/ }))
    await user.click(screen.getByRole('button', { name: /Expresso/ }))
    await user.click(screen.getByRole('button', { name: /Expresso/ }))

    // Add items in Burger King page

    rerender(wrapPage(StoreMenuPage, BKPageProps))
    await user.click(screen.getByRole('button', { name: /Chicken Royale/ }))
    await user.click(screen.getByRole('button', { name: /Chicken Royale/ }))

    // Cart Page
    rerender(wrapPage(CartPage, {}))

    // Starbucks
    const starbucksEl = screen.getByRole('listitem', {
      name: /Starbucks/i,
    })
    expect(
      within(starbucksEl).getByRole('listitem', {
        name: /Cappuccino/,
      })
    ).toBeInTheDocument()
    expect(
      within(starbucksEl).getByRole('listitem', {
        name: /Expresso/,
      })
    ).toBeInTheDocument()

    // Burger King
    const burgerKingeEl = screen.getByRole('listitem', {
      name: /Burger King/i,
    })
    expect(
      within(burgerKingeEl).getByRole('listitem', {
        name: /Chicken Royale/,
      })
    ).toBeInTheDocument()
  })
  test('Spinbutton changes item quantity', async () => {
    const user = userEvent.setup()

    const { rerender } = render(wrapPage(StoreMenuPage, BKPageProps))

    await user.click(screen.getByRole('button', { name: /Chicken Royale/ }))

    rerender(wrapPage(CartPage, {}))

    const icedLatteEl = screen.getByRole('listitem', { name: /Chicken Royale/ })
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
    const { rerender } = render(wrapPage(StoreMenuPage, StarbucksPageProps))
    await user.click(screen.getByRole('button', { name: /Cappuccino/ }))
    await user.click(screen.getByRole('button', { name: /Expresso/ }))

    // Add items in Burger King page
    rerender(wrapPage(StoreMenuPage, BKPageProps))
    await user.click(screen.getByRole('button', { name: /Chicken Royale/ }))

    // Cart page
    rerender(wrapPage(CartPage, {}))

    const CappuccinoEl = screen.getByRole('listitem', { name: /Cappuccino/ })

    await user.click(
      within(CappuccinoEl).getByRole('button', { name: /remove item/i })
    )

    await user.click(screen.getByRole('button', { name: /confirm remove/i }))

    // Target item removed
    expect(
      screen.queryByRole('listitem', { name: /Cappuccino/ })
    ).not.toBeInTheDocument()

    // Remaining items should still be in the document
    expect(
      screen.getByRole('listitem', { name: /Expresso/ })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('listitem', { name: /Chicken Royale/ })
    ).toBeInTheDocument()
  })
  test(`Display correct subtotal value`, async () => {
    const user = userEvent.setup()
    // Add items in Starbucks page

    const { rerender } = render(wrapPage(StoreMenuPage, StarbucksPageProps))
    // 2x Capuucino
    await user.click(screen.getByRole('button', { name: /Cappuccino/ }))
    await user.click(screen.getByRole('button', { name: /Cappuccino/ }))
    // 3x Expresso
    await user.click(screen.getByRole('button', { name: /Expresso/ }))
    await user.click(screen.getByRole('button', { name: /Expresso/ }))
    await user.click(screen.getByRole('button', { name: /Expresso/ }))
    // Add items in Burger King page
    rerender(wrapPage(StoreMenuPage, BKPageProps))
    // 4x Chicken Royale
    await user.click(screen.getByRole('button', { name: /Chicken Royale/ }))
    await user.click(screen.getByRole('button', { name: /Chicken Royale/ }))
    await user.click(screen.getByRole('button', { name: /Chicken Royale/ }))
    await user.click(screen.getByRole('button', { name: /Chicken Royale/ }))

    // Cart page
    rerender(wrapPage(CartPage, {}))

    expect(screen.getByText(/Subtotal/i)).toHaveTextContent(/£42\.96/i)
  })
})
