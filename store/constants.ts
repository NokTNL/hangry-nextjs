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

export type CartSliceState = typeof CART_INITAL_STATE

export type AddItemPayload = Omit<CartItemType, 'quantity'>

/**
 * Constants
 */
export const LOCAL_STORAGE_KEY = 'hangry-nextjs-cart'

export const CART_SLICE_NAME = 'cart'

export const CART_INITAL_STATE = {
  items: [] as CartItemType[],
}
