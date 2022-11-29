import { render, waitFor } from '@testing-library/react'
import { CartProvider, cartReducer } from './CartContext'
import { CONTEXT_DEFAULT_VALUE, LOCAL_STORAGE_KEY } from './constants'

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
  test('Add one item when ADD_ITEM action is passed into cart reducer', () => {
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
  test(`Only increment item's quantity if item already exists`, () => {
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
  test(`Save cart state in local storage when adding items`, () => {
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
    const spyContextValues = {
      state: {} as any,
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
