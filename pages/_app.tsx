import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { PropsWithChildren } from 'react'
import { AppHeader } from '@/src/components/AppHeader'
import { DocumentHead } from '@/src/components/DocumentHead'
import { AppWrapperProps, CustomPageProps } from '@/src/models/_app'
import { CartProvider } from '@/src/store/CartContext'

export default function App(
  {
    Component,
    pageProps,
  }: AppProps<CustomPageProps> /* The generic <CustomPageProps> will be used as the type of `pageProps` instead of the default `any` */
) {
  return (
    <AppWrapper pageProps={pageProps}>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export function AppWrapper({
  children,
  pageProps = {},
}: PropsWithChildren<AppWrapperProps>) {
  return (
    <ChakraProvider>
      <CartProvider>
        <DocumentHead />

        {/* Service Worker: only enabled for production */}
        {process.env.NODE_ENV === 'production' && <Script src="/setupSW.js" />}

        {pageProps.hideAppHeader ?? <AppHeader />}
        {/* vvvv Page component will go to here */}
        {children}
      </CartProvider>
    </ChakraProvider>
  )
}
