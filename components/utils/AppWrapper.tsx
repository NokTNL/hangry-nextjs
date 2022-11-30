import { ChakraProvider } from '@chakra-ui/react'
import { Provider as ReduxProvider } from 'react-redux'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { PropsWithChildren } from 'react'
import { LocalStorageWrapper } from './LocalStorageWrapper'

export function AppWrapper({
  children,
  store,
}: PropsWithChildren & { store: ToolkitStore }) {
  return (
    <ChakraProvider>
      <LocalStorageWrapper store={store}>
        <ReduxProvider store={store}>{children}</ReduxProvider>
      </LocalStorageWrapper>
    </ChakraProvider>
  )
}
