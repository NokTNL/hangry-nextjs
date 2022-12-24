import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StoreMenuPage, { getStaticProps } from 'pages/stores/[storeId]'
import { wrapPage } from '@/__tests__/mocks/utils'

describe('Store Menu Page', () => {
  test('Throws error if store Id does not exist', async () => {
    await expect(
      getStaticProps({
        params: { storeId: '1827b6123497217641927098' },
      })
    ).rejects.toThrow(
      /The store with id '1827b6123497217641927098' cannot be found/i
    )
  })
  test('Renders the menu items details as buttons', async () => {
    const StarbucksPageProps = await getStaticProps({
      params: { storeId: '111111111111111111111111' },
    }).then(
      // @ts-ignore
      res => res.props
    )
    render(wrapPage(StoreMenuPage, StarbucksPageProps))

    const capuccinoButton = screen.getByRole('button', { name: /Cappuccino/i })
    const expressoButton = screen.getByRole('button', { name: /Expresso/i })

    // Item photos
    expect(within(capuccinoButton).getByRole('img')).toHaveAttribute(
      'src',
      expect.stringMatching(/starbucks-cappuccino.jpeg/)
    )
    expect(within(expressoButton).getByRole('img')).toHaveAttribute(
      'src',
      expect.stringMatching(/starbucks-expresso.webp/)
    )
    // Item prices
    expect(within(capuccinoButton).getByText(/£3\.50/)).toBeInTheDocument()
    expect(within(expressoButton).getByText(/£2\.00/)).toBeInTheDocument()
  })
  test('Add one item, shows confirmation modal', async () => {
    const user = userEvent.setup()

    const StarbucksPageProps = await getStaticProps({
      params: { storeId: '111111111111111111111111' },
    }).then(
      // @ts-ignore
      res => res.props
    )
    render(wrapPage(StoreMenuPage, StarbucksPageProps))
    await user.click(screen.getByRole('button', { name: /Expresso/ }))

    expect(screen.getByRole('status')).toHaveTextContent(
      /Expresso added to cart/
    )
  })
})
