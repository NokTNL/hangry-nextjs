import { render, screen } from '@testing-library/react'
import StoresPage, { getStaticProps } from 'pages/stores'
import { wrapPage } from './mocks/utils'

describe('Stores page', () => {
  test('page renders list of links for stores correctly', async () => {
    const pageProps = await getStaticProps().then(
      // @ts-ignore
      result => result.props
    )
    render(wrapPage(StoresPage, pageProps))

    expect(
      screen.getAllByRole('link', { name: /Starbucks|Burger King|McDonalds/i })
    ).toHaveLength(3)
    expect(screen.getByRole('link', { name: 'Starbucks' })).toHaveAttribute(
      'href',
      '/stores/111111111111111111111111'
    )
    expect(screen.getByRole('link', { name: 'Burger King' })).toHaveAttribute(
      'href',
      '/stores/222222222222222222222222'
    )
    expect(screen.getByRole('link', { name: 'McDonalds' })).toHaveAttribute(
      'href',
      '/stores/333333333333333333333333'
    )
  })
})
