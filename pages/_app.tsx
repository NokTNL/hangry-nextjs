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
          {/* For PWA */}
          <link rel="manifest" href="/manifest.json" />

          <meta name="theme-color" content="#09cbd2" />
          <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
          <link
            rel="apple-touch-icon"
            sizes="75x75"
            href="/img/chicken-royle-small.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="200x200"
            href="/img/chicken-royle-medium.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="512x512"
            href="/img/chicken-royle-large.png"
          />
        </Head>
        {pageProps.hideAppHeader ?? <AppHeader />}
        <Component {...pageProps} />
      </CartProvider>
    </ChakraProvider>
  )
}
