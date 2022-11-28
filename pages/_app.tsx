import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { CartProvider } from 'store/CartContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ChakraProvider>
  )
}
