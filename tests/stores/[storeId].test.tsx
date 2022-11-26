import { render, screen } from '@testing-library/react'
import StoreMenuPage, {
  getStaticPaths,
  getStaticProps,
  StaticPropsType,
} from 'pages/stores/[storeId]'

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

    const EXPECTED_RESULT = {
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

    expect(pageProps.props).toEqual(EXPECTED_RESULT)
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
})
