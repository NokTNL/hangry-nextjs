import { ObjectID } from 'bson'

const db = [
  {
    _id: new ObjectID('111111111111111111111111'),
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
    _id: new ObjectID('222222222222222222222222'),
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
    _id: new ObjectID('333333333333333333333333'),
    logoImage: '/img/mcdonalds.svg',
    name: 'McDonalds',
    menu: [],
  },
  {
    _id: new ObjectID('444444444444444444444444'),
    logoImage: '/img/mcdonalds.svg',
    name: 'TEST DATABASE STORE',
    menu: [],
  },
]

export default db
