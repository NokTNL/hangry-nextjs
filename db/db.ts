/**
 * This is a dummy DB. It can only be used as static data and cannot be updated
 */
export const STORE_DB = [
  {
    id: '1',
    logoImage: '/img/starbucks.svg',
    name: 'Starbucks',
    menu: [
      {
        id: 'item1',
        itemName: 'Cappuccino',
        price: 3.5,
        photo: '/img/starbucks-cappuccino.jpeg',
      },
      {
        id: 'item2',
        itemName: 'Expresso',
        price: 2,
        photo: '/img/starbucks-expresso.webp',
      },
    ],
  },
  {
    id: '2',
    logoImage: '/img/burger-king.svg',
    name: 'Burger King',
    menu: [
      {
        id: 'item10',
        itemName: 'Chicken Royale',
        price: 7.49,
        photo: '/img/chicken-royle.png',
      },
    ],
  },
  {
    id: '3',
    logoImage: '/img/mcdonalds.svg',
    name: 'McDonalds',
    menu: [],
  },
]

export type StoreType = typeof STORE_DB[number]

export type MenuItemType = StoreType['menu'][number]
