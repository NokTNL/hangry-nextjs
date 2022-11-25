import { getStaticProps, LIST_OF_STORES } from '../stores'

describe('/stores page', () => {
  test('Get the correct page props', () => {
    const pageProps = getStaticProps()
    expect(pageProps.props.stores).toEqual(LIST_OF_STORES)
  })
})
