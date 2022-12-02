import { render } from '@testing-library/react'
import { CartProvider } from './CartContext'
import { CONTEXT_DEFAULT_VALUE, LOCAL_STORAGE_KEY } from './constants'

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
        price: 3.5,
        photo: '/food-img-url-1',
      },
      quantity: 1,
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
      quantity: 1,
    },
  ],
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  test(`Cart state synced from local storage initially`, () => {
    const spyContextValues = {
      state: {
        ...CONTEXT_DEFAULT_VALUE.state,
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
})
