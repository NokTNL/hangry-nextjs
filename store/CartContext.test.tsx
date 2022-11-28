import { cartReducer } from './CartContext'

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
})
