import { AppHeader } from 'components/AppHeader'
import { AppWrapper } from 'components/utils/AppWrapper'
import type { AppProps } from 'next/app'
import { store } from 'store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper store={store}>
      {pageProps.hideAppHeader ?? <AppHeader />}
      <Component {...pageProps} />
    </AppWrapper>
  )
}
