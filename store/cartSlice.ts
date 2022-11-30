import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store'
import {
  AddItemPayload,
  CartSliceState,
  CART_INITAL_STATE,
  CART_SLICE_NAME,
  LOCAL_STORAGE_KEY,
} from './constants'

export const cartSlice = createSlice({
  name: CART_SLICE_NAME,
  initialState: CART_INITAL_STATE,
  reducers: {
    initialSync(state, action: PayloadAction<CartSliceState>) {
      return action.payload
    },
    addItem(state, action: PayloadAction<AddItemPayload>) {
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
    },
  },
})

export const addItemSynced = createAsyncThunk(
  `${CART_SLICE_NAME}/addItemSynced`,
  (payload: AddItemPayload, { dispatch, getState }) => {
    dispatch(cartSlice.actions.addItem(payload))
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify((getState() as RootState).cart)
    )
  }
)
