import { AppWrapper } from 'pages/_app'
import { CustomPageProps } from 'src/models/_app'

/**
 * Wrap a component with `AppWrapper` and pass page props in
 * @type `P` Page props type
 */
export function wrap<P>(
  Component: React.ComponentType<P>,
  pageProps: CustomPageProps & P
) {
  return (
    <AppWrapper pageProps={pageProps}>
      <Component {...pageProps} />
    </AppWrapper>
  )
}
