import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StoreMenuPage, {
  getStaticPaths,
  getStaticProps,
  StaticPropsType,
} from 'pages/stores/[storeId]'
import { addItemSynced, cartSlice } from 'store/cartSlice'
import { customRender } from '__mocks__/customRender'

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
  test('Renders the menu items details as buttons', () => {
    customRender(<StoreMenuPage {...MOCK_PAGE_PROPS} />)

    const capuccinoButton = screen.getByRole('button', { name: /Cappucino/i })
    const expressoButton = screen.getByRole('button', { name: /Expresso/i })

    // Item photos
    expect(
      within(capuccinoButton).getByRole('img').getAttribute('src')
    ).toMatch(/food-img-url-1/)
    expect(within(expressoButton).getByRole('img').getAttribute('src')).toMatch(
      /food-img-url-2/
    )
    // Item prices
    expect(within(capuccinoButton).getByText(/£3\.50/)).toBeInTheDocument()
    expect(within(expressoButton).getByText(/£2\.00/)).toBeInTheDocument()
  })
  test('Dispatch add item action when menu item clicked', async () => {
    const user = userEvent.setup()

    const { spyDispatch } = customRender(<StoreMenuPage {...MOCK_PAGE_PROPS} />)

    await user.click(screen.getByText(/Cappucino/))

    // Below is expecting the corresponding thunk action is dispatched
    // TODO: make a custom matcher for this
    const dispatchedThunkAction = await spyDispatch.mock.results[0].value

    expect(dispatchedThunkAction.type).toMatch(
      new RegExp(
        `${addItemSynced.fulfilled}|${addItemSynced.pending}|${addItemSynced.rejected}`
      )
    )
    expect(dispatchedThunkAction.meta.arg).toEqual({
      store: {
        id: '1',
        name: 'Starbucks',
      },
      item: {
        id: 'item1',
        name: 'Cappucino',
        price: 3.5,
      },
    })
  })
})
