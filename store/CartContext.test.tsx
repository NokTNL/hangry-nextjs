import { render, waitFor } from '@testing-library/react'
import { CartProvider, cartReducer } from './CartContext'
import { LOCAL_STORAGE_KEY } from './constants'

const MOCK_EMPTY_INIT_STATE = {
  items: [],
}

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
      },
      quantity: 1,
    },
  ],
}

const ADD_ITEM_ACTION_CAPPUNICCINO = {
  type: 'ADD_ITEM' as const,
  payload: {
    store: {
      id: '1',
      name: 'Starbucks',
    },
    item: {
      id: 'item1',
      name: 'Cappucino',
      price: 3.5,
    },
  },
}

describe('CartContext reducer', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  test('Add one item when ADD_ITEM action is dispatched', () => {
    const newState = cartReducer(
      MOCK_EMPTY_INIT_STATE,
      ADD_ITEM_ACTION_CAPPUNICCINO
    )

    expect(newState.items).toEqual([
      {
        store: {
          id: '1',
          name: 'Starbucks',
        },
        item: {
          id: 'item1',
          name: 'Cappucino',
          price: 3.5,
        },
        quantity: 1,
      },
    ])
  })
  test(`Only increment item's quantity item already exists`, () => {
    const newState = cartReducer(
      MOCK_SOME_ITEMS_INIT_STATE,
      ADD_ITEM_ACTION_CAPPUNICCINO
    )

    expect(newState.items).toEqual([
      {
        store: {
          id: '1',
          name: 'Starbucks',
        },
        item: {
          id: 'item1',
          name: 'Cappucino',
          price: 3.5,
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
        },
        quantity: 1,
      },
    ])
  })
  test(`Store cart state in local storage when adding items`, () => {
    // Mocking/Spying directly on localStorage is NOT possible with jsdom: https://stackoverflow.com/a/54157998
    // !!! BUT you can call localStorage directly in your test code!

    const newState = cartReducer(
      MOCK_EMPTY_INIT_STATE,
      ADD_ITEM_ACTION_CAPPUNICCINO
    )

    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toEqual(
      JSON.stringify(newState)
    )
  })
  test(`Cart state synced from local storage initially`, () => {
    const MOCK_CART_CONTEXT = {
      dispatch: jest.fn(),
    }

    // Mocking that the local storage has been pre-populated with cart data
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(MOCK_SOME_ITEMS_INIT_STATE)
    )

    render(<CartProvider mockContextValue={MOCK_CART_CONTEXT} />)

    waitFor(() => {
      expect(MOCK_CART_CONTEXT.dispatch).toHaveBeenCalledWith(
        'INITIAL_SYNC',
        MOCK_SOME_ITEMS_INIT_STATE
      )
    })
  })
})
