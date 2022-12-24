import { render, screen, within } from '@testing-library/react'
// import { CartProvider } from './CartContext'
// import { getContextDefaultValue, LOCAL_STORAGE_KEY } from './constants'
import CartPage from '@/pages/cart'
import { LOCAL_STORAGE_KEY } from '@/src/store/constants'
import { wrapPage } from '@/__tests__/mocks/utils'
import userEvent from '@testing-library/user-event'
import StoreMenuPage, { getStaticProps } from 'pages/stores/[storeId]'

const MOCK_SOME_ITEMS_INIT_STATE = {
  items: [
    {
      store: {
        id: '1',
        name: 'Starbucks',
      },
      item: {
        id: 'item1',
        name: 'Cappuccino',
        price: 3.5,
        photo: '/food-img-url-1',
      },
      quantity: 2,
    },
    {
      store: {
        id: '1',
        name: 'Starbucks',
      },
      item: {
        id: 'item2',
        name: 'Expresso',
        price: 3.5,
        photo: '/food-img-url-2',
      },
      quantity: 3,
    },
  ],
}

describe('Cart State Storage', () => {
  test(`Cart state synced from local storage initially`, () => {
    // Mocking/Spying directly on localStorage is NOT possible with jsdom: https://stackoverflow.com/a/54157998
    // !!! BUT you can call localStorage directly in your test code!

    // Mocking that the local storage has been pre-populated with cart data
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(MOCK_SOME_ITEMS_INIT_STATE)
    )

    render(wrapPage(CartPage, {}))

    const StarbucksEl = screen.getByRole('listitem', { name: /Starbucks/ })
    // Cappuccino
    const CappuccinoEl = within(StarbucksEl).getByRole('listitem', {
      name: /Cappuccino/,
    })
    expect(
      within(CappuccinoEl).getByRole('spinbutton', { name: /quantity/i })
    ).toHaveValue('2')
    // Expresso
    const ExpressoEl = within(StarbucksEl).getByRole('listitem', {
      name: /Expresso/,
    })
    expect(
      within(ExpressoEl).getByRole('spinbutton', { name: /quantity/i })
    ).toHaveValue('3')
  })

  test(`Save cart state in local storage when adding items`, async () => {
    const StarbucksPageProps = await getStaticProps({
      params: { storeId: '111111111111111111111111' },
    }).then(
      // @ts-ignore
      res => res.props
    )

    const user = userEvent.setup()

    render(wrapPage(StoreMenuPage, StarbucksPageProps))

    await user.click(screen.getByRole('button', { name: /Cappuccino/ }))
    await user.click(screen.getByRole('button', { name: /Cappuccino/ }))

    const localStorageCartItems = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) ?? ''
    ).items

    expect(localStorageCartItems).toHaveLength(1)
    expect(localStorageCartItems[0].store.name).toEqual('Starbucks')
    expect(localStorageCartItems[0].item.name).toEqual('Cappuccino')
    expect(localStorageCartItems[0].quantity).toEqual(2)
  })
})
