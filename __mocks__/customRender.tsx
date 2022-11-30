import { configureStore } from '@reduxjs/toolkit'
import { render, RenderOptions } from '@testing-library/react'
import { AppWrapper } from 'components/utils/AppWrapper'
import { rootReducer, RootState } from 'store'

export const createmockReduxStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export const customRender = (
  Component: React.ReactElement,
  options?: { preloadedState?: RootState } & RenderOptions
) => {
  const store = createmockReduxStore(options?.preloadedState)
  const spyDispatch = jest.spyOn(store, 'dispatch')

  render(<AppWrapper store={store}>{Component}</AppWrapper>)

  // expose the mocked Redux store
  return { store, spyDispatch }
}
