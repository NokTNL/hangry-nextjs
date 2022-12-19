import { render, screen } from '@testing-library/react'
import StoreMenuPage, {
  getStaticProps,
  StoreMenuStaticProps,
} from 'pages/stores/[storeId]'
import { wrapPage } from '__tests__/__mocks__/utils'
import userEvent from '@testing-library/user-event'

describe(`Cart icon`, () => {
  let StarbucksPageProps: StoreMenuStaticProps

  beforeAll(async () => {
    StarbucksPageProps = await getStaticProps({
      params: { storeId: '111111111111111111111111' },
    }).then(
      // @ts-ignore
      res => res.props
    )
  })
  test(`No items, show '0' on cart icon `, () => {
    render(wrapPage(StoreMenuPage, StarbucksPageProps))

    expect(screen.getByText(/cart item count/i)).toHaveTextContent('0')
  })
  test(`One menu item clicked, show '1' on cart icon`, async () => {
    const user = userEvent.setup()

    render(wrapPage(StoreMenuPage, StarbucksPageProps))

    await user.click(screen.getByRole('button', { name: /Cappuccino/ }))

    expect(screen.getByText(/cart item count/i)).toHaveTextContent('1')
  })
  test(`One menu item x 1 + One menu item x 2, show '3' on cart icon`, async () => {
    const user = userEvent.setup()

    render(wrapPage(StoreMenuPage, StarbucksPageProps))

    await user.click(screen.getByRole('button', { name: /Cappuccino/ }))
    await user.click(screen.getByRole('button', { name: /Expresso/ }))
    await user.click(screen.getByRole('button', { name: /Expresso/ }))

    expect(screen.getByText(/cart item count/i)).toHaveTextContent('3')
  })
})
