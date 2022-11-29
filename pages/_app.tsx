import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { CartProvider } from 'store/CartContext'
import { AppHeader } from 'components/AppHeader'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CartProvider>
        {pageProps.hideAppHeader ?? <AppHeader />}
        <Component {...pageProps} />
      </CartProvider>
    </ChakraProvider>
  )
}
