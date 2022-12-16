import { StoreMenuItemType } from '../models/db'

/**
 * Types
 */
export type CartItemType = {
  store: {
    id: string
    name: string
  }
  item: Omit<StoreMenuItemType, 'itemName'> & {
    name: StoreMenuItemType['itemName']
  } // Renaming property
  quantity: number
}

export type CartContextType = {
  state: {
    items: CartItemType[]
  }
  dispatch: (action: CartActionTypes) => void
}

export type CartActionTypes =
  | {
      type: 'INITIAL_SYNC'
      payload: CartContextType['state']
    }
  | {
      type: 'ADD_ITEM'
      payload: Omit<CartItemType, 'quantity'>
    }
  | {
      type: 'CHANGE_ITEM_QUANTITY'
      payload: {
        store: CartItemType['store']
        item: CartItemType['item']
        newQuantity: number
      }
    }
  | {
      type: 'DELETE_ITEM'
      payload: {
        store: CartItemType['store']
        item: CartItemType['item']
      }
    }

/**
 * Constants
 */
export const LOCAL_STORAGE_KEY = 'hangry-nextjs-cart' as const

export const CART_CONTEXT_DEFAULT_VALUE: CartContextType = {
  state: {
    items: [],
  },
  dispatch: () => {},
}
