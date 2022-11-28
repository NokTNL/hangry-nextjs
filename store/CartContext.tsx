import { useContext, useEffect } from 'react'
import { createContext, PropsWithChildren, useReducer } from 'react'
import {
  CartActionTypes,
  CartContextState,
  CartProviderProps,
  CONTEXT_DEFAULT_VALUE,
  LOCAL_STORAGE_KEY,
} from './constants'

/**
 * Context
 */

export const CartContext = createContext(CONTEXT_DEFAULT_VALUE)

export function CartProvider({
  children,
  mockContextValue,
}: PropsWithChildren & CartProviderProps) {
  const initialState = mockContextValue?.state ?? CONTEXT_DEFAULT_VALUE.state
  const mockDispatch = mockContextValue?.dispatch

  const [state, dispatch] = useReducer(cartReducer, initialState)

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
    <CartContext.Provider value={{ state, dispatch: mockDispatch ?? dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

/**
 * Reducer
 */

export function cartReducer(
  state: CartContextState,
  action: CartActionTypes
): CartContextState {
  let newState = state

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
