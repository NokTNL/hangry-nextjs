import StoresPage, { getStaticProps } from 'pages/stores'
import { STORE_DB } from 'db/db'
import { render, screen } from '@testing-library/react'

describe('/stores page - Unit tests', () => {
  test('Get the correct page props', () => {
    const pageProps = getStaticProps()
    expect(pageProps.props.stores).toEqual(STORE_DB)
  })
  test('page renders list of links for stores correctly', () => {
    const mockListOfStores = [
      {
        id: 1,
        logoImage: '/img/starbucks.svg',
        name: 'Starbucks',
      },
      {
        id: 2,
        logoImage: '/img/burger-king.svg',
        name: 'Burger King',
      },
      {
        id: 3,
        logoImage: '/img/mcdonalds.svg',
        name: 'McDonalds',
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
