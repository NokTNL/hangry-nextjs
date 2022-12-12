import { render, screen } from '@testing-library/react'
import StoreMenuPage from 'pages/stores/[storeId]'
import { wrap } from 'src/__mocks__/utils'
import userEvent from '@testing-library/user-event'

const MOCK_PAGE_PROPS_STARBUCKS = {
  storeId: '1',
  storeName: 'Starbucks',
  menu: [
    {
      id: 'item1',
      itemName: 'Cappucino',
      price: 3.5,
      photo: '/food-img-url-1',
    },
    {
      id: 'item2',
      itemName: 'Expresso',
      price: 2,
      photo: '/food-img-url-2',
    },
  ],
}

describe(`Cart icon`, () => {
  test(`No items, show '0' on cart icon `, () => {
    render(wrap(StoreMenuPage, MOCK_PAGE_PROPS_STARBUCKS))

    expect(screen.getByText(/cart item count/i)).toHaveTextContent('0')
  })
  test(`One menu item clicked, show '1' on cart icon`, async () => {
    const user = userEvent.setup()

    render(wrap(StoreMenuPage, MOCK_PAGE_PROPS_STARBUCKS))

    await user.click(screen.getByRole('button', { name: /Cappucino/ }))

    expect(screen.getByText(/cart item count/i)).toHaveTextContent('1')
  })
  test(`One menu item x 1 + One menu item x 2, show '3' on cart icon`, async () => {
    const user = userEvent.setup()

    render(wrap(StoreMenuPage, MOCK_PAGE_PROPS_STARBUCKS))

    await user.click(screen.getByRole('button', { name: /Cappucino/ }))
    await user.click(screen.getByRole('button', { name: /Expresso/ }))
    await user.click(screen.getByRole('button', { name: /Expresso/ }))

    expect(screen.getByText(/cart item count/i)).toHaveTextContent('3')
  })
})
