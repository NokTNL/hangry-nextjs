import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StoreMenuPage, {
  getStaticPaths,
  getStaticProps,
  StaticPropsType,
} from 'pages/stores/[storeId]'
import { CartProvider } from 'store/CartContext'
import { getContextDefaultValue, LOCAL_STORAGE_KEY } from 'store/constants'

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

const MOCK_PAGE_PROPS = {
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

describe('/stores/[storeId] page - Unit tests', () => {
  test('Get correct paths from getStaticPaths', () => {
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
  test('Get correct page props for existing store ids', () => {
    const MOCK_CONTEXT = {
      params: {
        storeId: '1',
      },
    }
    const pageProps = getStaticProps(MOCK_CONTEXT, {
      mockDB: MOCK_STORE_DB,
    }) as { props: StaticPropsType }

    expect(pageProps.props).toEqual(MOCK_PAGE_PROPS)
  })
  test('getStaticProps throws errror for undefined/non-existing store ids', () => {
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
    render(<StoreMenuPage {...MOCK_PAGE_PROPS} />)

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
  test('Menu item clicked, add one item to cart', async () => {
    const spyContextValues = {
      state: {
        ...getContextDefaultValue().state,
        items: [],
      },
    }

    const user = userEvent.setup()
    render(
      <CartProvider spyContextValues={spyContextValues}>
        <StoreMenuPage {...MOCK_PAGE_PROPS} />
      </CartProvider>
    )

    await user.click(screen.getByText(/Cappucino/))

    expect(spyContextValues.state.items).toEqual([
      {
        store: {
          id: '1',
          name: 'Starbucks',
        },
        item: {
          id: 'item1',
          name: 'Cappucino',
          price: 3.5,
          photo: expect.anything(),
        },
        quantity: 1,
      },
    ])
  })
  test('Different item clicked, add one item to cart', async () => {
    const spyContextValues = {
      state: {
        ...getContextDefaultValue().state,
        items: [],
      },
    }

    const user = userEvent.setup()
    render(
      <CartProvider spyContextValues={spyContextValues}>
        <StoreMenuPage {...MOCK_PAGE_PROPS} />
      </CartProvider>
    )

    await user.click(screen.getByText(/Cappucino/))
    await user.click(screen.getByText(/Expresso/))

    expect(spyContextValues.state.items).toEqual([
      {
        store: {
          id: '1',
          name: 'Starbucks',
        },
        item: {
          id: 'item1',
          name: 'Cappucino',
          price: 3.5,
          photo: expect.anything(),
        },
        quantity: 1,
      },
      {
        store: {
          id: '1',
          name: 'Starbucks',
        },
        item: {
          id: 'item2',
          name: 'Expresso',
          price: 2,
          photo: expect.anything(),
        },
        quantity: 1,
      },
    ])
  })
  test(`Only increment item's quantity if item already exists`, async () => {
    const spyContextValues = {
      state: {
        ...getContextDefaultValue().state,
        items: [],
      },
    }

    const user = userEvent.setup()
    render(
      <CartProvider spyContextValues={spyContextValues}>
        <StoreMenuPage {...MOCK_PAGE_PROPS} />
      </CartProvider>
    )

    // Click two times
    await user.click(screen.getByText(/Cappucino/))
    await user.click(screen.getByText(/Cappucino/))

    expect(spyContextValues.state.items).toEqual([
      {
        store: {
          id: '1',
          name: 'Starbucks',
        },
        item: {
          id: 'item1',
          name: 'Cappucino',
          price: 3.5,
          photo: expect.anything(),
        },
        quantity: 2,
      },
    ])
  })
  test(`Save cart state in local storage when adding items`, async () => {
    // Mocking/Spying directly on localStorage is NOT possible with jsdom: https://stackoverflow.com/a/54157998
    // !!! BUT you can call localStorage directly in your test code!
    const spyContextValues = {
      state: {
        ...getContextDefaultValue().state,
        items: [],
      },
    }

    const user = userEvent.setup()

    render(
      <CartProvider spyContextValues={spyContextValues}>
        <StoreMenuPage {...MOCK_PAGE_PROPS} />
      </CartProvider>
    )

    await user.click(screen.getByText(/Cappucino/))
    render(<CartProvider spyContextValues={spyContextValues} />)

    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toEqual(
      JSON.stringify(spyContextValues.state)
    )
  })
})
