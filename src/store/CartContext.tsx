import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import {
  CartActionTypes,
  CartContextType,
  CART_CONTEXT_DEFAULT_VALUE,
  LOCAL_STORAGE_KEY,
} from './constants'

/**
 * Context
 */

export const CartContext = createContext(CART_CONTEXT_DEFAULT_VALUE)

export function CartProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(
    cartReducer,
    CART_CONTEXT_DEFAULT_VALUE.state
  )

  // Initial Sync from Local Storage
  useEffect(() => {
    if (window?.localStorage) {
      const storedStateString = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (storedStateString === null) return
      const storedState = JSON.parse(storedStateString)

      dispatch({ type: 'INITIAL_SYNC', payload: storedState })
    }
  }, [])

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

/**
 * Reducer
 */

export function cartReducer(
  state: CartContextType['state'],
  action: CartActionTypes
): CartContextType['state'] {
  let newState = { ...state }

  switch (action.type) {
    case 'INITIAL_SYNC': {
      return action.payload
    }
    case 'ADD_ITEM': {
      const newItem = action.payload

      const doesItemAlreadyExist = state.items.some(
        item => item.item.id === newItem.item.id
      )

      const newArrayOfItems = doesItemAlreadyExist
        ? state.items.map(item => {
            if (item.item.id === newItem.item.id) {
              return {
                ...item,
                quantity: item.quantity + 1,
              }
            } else {
              return item
            }
          })
        : // New item
          [
            ...state.items,
            {
              ...newItem,
              quantity: 1,
            },
          ]

      newState = {
        ...state,
        items: newArrayOfItems,
      }
      break
    }
    case 'CHANGE_ITEM_QUANTITY': {
      const {
        store: payloadStore,
        item: payloadItem,
        newQuantity,
      } = action.payload
      const foundItem = newState.items.find(
        item =>
          item.store.id === payloadStore.id && item.item.id === payloadItem.id
      )
      if (foundItem) {
        foundItem.quantity = newQuantity
      }
      break
    }
    case 'DELETE_ITEM': {
      const { store: payloadStore, item: payloadItem } = action.payload
      newState.items = newState.items.filter(
        item =>
          !(
            item.store.id === payloadStore.id && item.item.id === payloadItem.id
          )
      )
      break
    }
    case 'CLEAR_CART': {
      newState = { items: [] }
      break
    }
  }

  // Sync with Local Storage
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState))
  return newState
}

/**
 * Custom Hook
 */
export function useCart() {
  return useContext(CartContext)
}
