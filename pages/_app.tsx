import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { CartProvider } from 'store/CartContext'
import { AppHeader } from 'components/AppHeader'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CartProvider>
        <Head>
          <link rel="manifest" href="/manifest.json" />
        </Head>
        {pageProps.hideAppHeader ?? <AppHeader />}
        <Component {...pageProps} />
      </CartProvider>
    </ChakraProvider>
  )
}
