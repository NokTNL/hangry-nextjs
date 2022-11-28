import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StoreMenuPage, {
  getStaticPaths,
  getStaticProps,
  StaticPropsType,
} from 'pages/stores/[storeId]'
import { CartProvider, cartReducer } from 'store/CartContext'

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
    const getStaticPathResult = getStaticPaths(undefined as any, {
      mockDB: MOCK_STORE_DB,
    })

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
  test('Renders the menu items details', () => {
    render(<StoreMenuPage {...MOCK_PAGE_PROPS} />)
    // Item names
    expect(screen.getByText(/Cappucino/i)).toBeInTheDocument()
    expect(screen.getByText(/Expresso/i)).toBeInTheDocument()
    // Item photos
    expect(screen.getByRole('img', { name: /Cappucino/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /Expresso/i })).toBeInTheDocument()
    // Item prices
    expect(screen.getByText(/£3\.50/)).toBeInTheDocument()
    expect(screen.getByText(/£2\.00/)).toBeInTheDocument()
  })
  test('Dispatch add item action when menu item clicked', async () => {
    const MOCK_CART_CONTEXT = {
      dispatch: jest.fn(),
    }

    const user = userEvent.setup()
    render(
      <CartProvider mockContextValue={MOCK_CART_CONTEXT}>
        <StoreMenuPage {...MOCK_PAGE_PROPS} />
      </CartProvider>
    )

    await user.click(screen.getByText(/Cappucino/))

    expect(MOCK_CART_CONTEXT.dispatch).toHaveBeenCalledWith({
      type: 'ADD_ITEM',
      payload: {
        store: {
          id: '1',
          name: 'Starbucks',
        },
        item: {
          id: 'item1',
          name: 'Cappucino',
          price: 3.5,
        },
      },
    })
  })
  test('Reducer add one item  when ADD_ITEM action is dispatched', () => {
    const MOCK_INIT_STATE = {
      items: [],
    }
    const MOCK_ACTION = {
      type: 'ADD_ITEM' as const,
      payload: {
        store: {
          id: '1',
          name: 'Starbucks',
        },
        item: {
          id: 'item1',
          name: 'Cappucino',
          price: 3.5,
        },
      },
    }
    const newState = cartReducer(MOCK_INIT_STATE, MOCK_ACTION)

    expect(newState.items).toEqual([
      {
        store: {
          id: '1',
          name: 'Starbucks',
        },
        item: {
          id: 'item1',
          name: 'Cappucino',
          price: 3.5,
        },
        quantity: 1,
      },
    ])
  })
})
