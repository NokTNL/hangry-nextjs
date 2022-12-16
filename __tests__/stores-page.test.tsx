import { render, screen } from '@testing-library/react'
import StoresPage from 'pages/stores'

describe.skip('Stores page', () => {
  // TODO: move server generated pages tests to another file?
  test.skip('Get the correct page props', () => {
    const pageProps = getStaticProps()
    expect(pageProps.props.stores).toEqual(STORE_DB)
  })
  test('page renders list of links for stores correctly', () => {
    const mockListOfStores = [
      {
        id: '1',
        logoImage: '/img/starbucks.svg',
        name: 'Starbucks',
        menu: [],
      },
      {
        id: '2',
        logoImage: '/img/burger-king.svg',
        name: 'Burger King',
        menu: [],
      },
      {
        id: '3',
        logoImage: '/img/mcdonalds.svg',
        name: 'McDonalds',
        menu: [],
      },
    ]
    render(<StoresPage stores={mockListOfStores} />)

    expect(
      screen.getAllByRole('link', { name: /Starbucks|Burger King|McDonalds/i })
    ).toHaveLength(3)
    expect(screen.getByRole('link', { name: 'Starbucks' })).toHaveAttribute(
      'href',
      '/stores/1'
    )
    expect(screen.getByRole('link', { name: 'Burger King' })).toHaveAttribute(
      'href',
      '/stores/2'
    )
    expect(screen.getByRole('link', { name: 'McDonalds' })).toHaveAttribute(
      'href',
      '/stores/3'
    )
  })
})
