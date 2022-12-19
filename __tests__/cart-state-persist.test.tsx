import { render, screen } from '@testing-library/react'
// import { CartProvider } from './CartContext'
// import { getContextDefaultValue, LOCAL_STORAGE_KEY } from './constants'
import userEvent from '@testing-library/user-event'
import { wrapPage } from '@/__tests__/mocks/utils'
import StoreMenuPage from 'pages/stores/[storeId]'
import { useContext } from 'react'
import { CartContext } from '@/src/store/CartContext'

// const MOCK_SOME_ITEMS_INIT_STATE = {
//   items: [
//     {
//       store: {
//         id: '1',
//         name: 'Starbucks',
//       },
//       item: {
//         id: 'item1',
//         name: 'Cappucino',
//         price: 3.5,
//         photo: '/food-img-url-1',
//       },
//       quantity: 1,
//     },
//     {
//       store: {
//         id: '1',
//         name: 'Starbucks',
//       },
//       item: {
//         id: 'item2',
//         name: 'Expresso',
//         price: 3.5,
//         photo: '/food-img-url-2',
//       },
//       quantity: 1,
//     },
//   ],
// }
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

describe.skip('Cart State Storage', () => {
  // TODO: This should better be tested in E2E, as you can't mock browser reopen and can't test properly without touchin implementation details
  test.skip(`Cart state synced from local storage initially`, () => {
    const spyContextValues = {
      state: {
        ...getContextDefaultValue().state,
      },
    }

    // Mocking that the local storage has been pre-populated with cart data
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(MOCK_SOME_ITEMS_INIT_STATE)
    )

    render(<CartProvider spyContextValues={spyContextValues} />)

    expect(spyContextValues.state).toEqual(MOCK_SOME_ITEMS_INIT_STATE)
  })

  test.skip(`Save cart state in local storage when adding items`, async () => {
    // Mocking/Spying directly on localStorage is NOT possible with jsdom: https://stackoverflow.com/a/54157998
    // !!! BUT you can call localStorage directly in your test code!
    const spyContextValues = {
      state: {
        ...getContextDefaultValue().state,
        items: [],
      },
    }

    const user = userEvent.setup()

    render(
      <CartProvider spyContextValues={spyContextValues}>
        <StoreMenuPage {...MOCK_PAGE_PROPS_STARBUCKS} />
      </CartProvider>
    )

    await user.click(screen.getByText(/Cappucino/))

    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toEqual(
      JSON.stringify(spyContextValues.state)
    )
  })
})
