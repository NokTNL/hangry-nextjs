/**
 * Types
 */
export type CartItemType = {
  store: {
    id: string
    name: string
  }
  item: {
    id: string
    name: string
    price: number
  }
  quantity: number
}

export type CartContextState = typeof CONTEXT_DEFAULT_VALUE.state

export type CartProviderProps = {
  initialState?: CartContextState
  spyContextValues?: {
    state?: CartContextState
    dispatch?: (action: CartActionTypes) => void
  }
}

export type CartActionTypes =
  | {
      type: 'INITIAL_SYNC'
      payload: CartContextState
    }
  | {
      type: 'ADD_ITEM'
      payload: Omit<CartItemType, 'quantity'>
    }

/**
 * Constants
 */
export const LOCAL_STORAGE_KEY = 'hangry-nextjs-cart'

export const CONTEXT_DEFAULT_VALUE = {
  state: {
    items: [] as CartItemType[],
  },
  dispatch: (action: CartActionTypes) => {},
}
