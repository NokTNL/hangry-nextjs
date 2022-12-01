import { createmockReduxStore, customRender } from '__mocks__/customRender'
import { addItemSynced } from './cartSlice'
import { LOCAL_STORAGE_KEY } from './constants'

const MOCK_EMPTY_INIT_STATE = {
  cart: {
    items: [],
  },
}

const MOCK_SOME_ITEMS_INIT_STATE = {
  cart: {
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
  },
}

const ADD_ITEM_CAPPUNICCINO_PAYLOAD = {
  store: {
    id: '1',
    name: 'Starbucks',
  },
  item: {
    id: 'item1',
    name: 'Cappucino',
    price: 3.5,
  },
}

describe('cartSlice', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  test(`Add one item when 'addItem' action is dispatched`, async () => {
    const store = createmockReduxStore(MOCK_EMPTY_INIT_STATE)
    await store.dispatch(addItemSynced(ADD_ITEM_CAPPUNICCINO_PAYLOAD))

    expect(store.getState().cart.items).toEqual([
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
  test(`Only increment item's quantity if item already exists`, async () => {
    const store = createmockReduxStore(MOCK_SOME_ITEMS_INIT_STATE)
    await store.dispatch(addItemSynced(ADD_ITEM_CAPPUNICCINO_PAYLOAD))

    expect(store.getState().cart.items).toEqual([
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
  test(`Save cart state in local storage when adding items`, async () => {
    // Mocking/Spying directly on localStorage is NOT possible with jsdom: https://stackoverflow.com/a/54157998
    // !!! BUT you can call localStorage directly in your test code!

    const store = createmockReduxStore(MOCK_EMPTY_INIT_STATE)
    await store.dispatch(addItemSynced(ADD_ITEM_CAPPUNICCINO_PAYLOAD))

    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toEqual(
      JSON.stringify(store.getState().cart)
    )
  })
  test(`Cart state synced from local storage initially`, () => {
    // Mocking that the local storage has been pre-populated with cart data
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(MOCK_SOME_ITEMS_INIT_STATE)
    )

    const { store } = customRender(<></>)

    expect(store.getState().cart).toEqual(MOCK_SOME_ITEMS_INIT_STATE)
  })
})
