import { useContext } from 'react'
import { createContext, PropsWithChildren, useReducer } from 'react'

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

/**
 * Context
 */
type CartContextState = typeof DEFAULT_VALUE.state

const DEFAULT_VALUE = {
  state: {
    items: [] as CartItemType[],
  },
  dispatch: (action: CartActionTypes) => {},
}

export const CartContext = createContext(DEFAULT_VALUE)

type CartProviderProps = {
  mockContextValue?: Partial<typeof DEFAULT_VALUE>
}

export function CartProvider({
  children,
  mockContextValue,
}: PropsWithChildren & CartProviderProps) {
  const initialState = mockContextValue?.state ?? DEFAULT_VALUE.state
  const mockDispatch = mockContextValue?.dispatch

  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <CartContext.Provider value={{ state, dispatch: mockDispatch ?? dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

/**
 * Reducer
 */
type CartActionTypes = {
  type: 'ADD_ITEM'
  payload: Omit<CartItemType, 'quantity'>
}

export function cartReducer(
  state: CartContextState,
  action: CartActionTypes
): CartContextState {
  switch (action.type) {
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

      return {
        ...state,
        items: newArrayOfItems,
      }
    }
  }
}

/**
 * Custom Hook
 */
export function useCart() {
  return useContext(CartContext)
}
