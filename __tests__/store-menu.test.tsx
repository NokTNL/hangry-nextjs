import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StoreMenuPage, {
  getStaticPaths,
  getStaticProps,
  StoreMenuStaticProps,
} from 'pages/stores/[storeId]'
import { wrapPage } from '__tests__/__mocks__/utils'

const MOCK_STORE_DB = [
  {
    id: '1',
    logoImage: '/img/starbucks.svg',
    name: 'Starbucks',
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
  },
  {
    id: '2',
    logoImage: '/img/burger-king.svg',
    name: 'Burger King',
    menu: [],
  },
]

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

describe('Store Menu Page', () => {
  // TODO: move server generated pages tests to another file?
  test.skip('Get correct paths from getStaticPaths', () => {
    const getStaticPathResult = getStaticPaths(
      {},
      {
        mockDB: MOCK_STORE_DB,
      }
    )

    expect(getStaticPathResult.paths).toEqual([
      {
        params: {
          storeId: '1',
        },
      },
      {
        params: {
          storeId: '2',
        },
      },
    ])
  })
  test.skip('Get correct page props for existing store ids', () => {
    const MOCK_CONTEXT = {
      params: {
        storeId: '1',
      },
    }
    const pageProps = getStaticProps(MOCK_CONTEXT, {
      mockDB: MOCK_STORE_DB,
    }) as { props: StoreMenuStaticProps }

    expect(pageProps.props).toEqual(MOCK_PAGE_PROPS_STARBUCKS)
  })
  test.skip('getStaticProps throws errror for undefined/non-existing store ids', () => {
    const MOCK_CONTEXT = {
      params: {
        storeId: '99999',
      },
    }

    expect(() => {
      getStaticProps(MOCK_CONTEXT, { mockDB: MOCK_STORE_DB })
    }).toThrow()
  })
  test('Renders the menu items details as buttons', () => {
    render(wrapPage(StoreMenuPage, MOCK_PAGE_PROPS_STARBUCKS))

    const capuccinoButton = screen.getByRole('button', { name: /Cappucino/i })
    const expressoButton = screen.getByRole('button', { name: /Expresso/i })

    // Item photos
    expect(within(capuccinoButton).getByRole('img')).toHaveAttribute(
      'src',
      expect.stringMatching(/food-img-url-1/)
    )
    expect(within(expressoButton).getByRole('img')).toHaveAttribute(
      'src',
      expect.stringMatching(/food-img-url-2/)
    )
    // Item prices
    expect(within(capuccinoButton).getByText(/£3\.50/)).toBeInTheDocument()
    expect(within(expressoButton).getByText(/£2\.00/)).toBeInTheDocument()
  })
  test('Add one item, shows confirmation modal', async () => {
    const user = userEvent.setup()

    render(wrapPage(StoreMenuPage, MOCK_PAGE_PROPS_STARBUCKS))
    await user.click(screen.getByRole('button', { name: /Expresso/ }))

    expect(screen.getByRole('status')).toHaveTextContent(
      /Expresso added to cart/
    )
  })
})
