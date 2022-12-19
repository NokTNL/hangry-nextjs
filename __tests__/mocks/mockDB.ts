import { ObjectID } from 'bson'

export default [
  {
    _id: ObjectID('111111111111111111111111'),
    logoImage: '/img/starbucks.svg',
    name: 'Starbucks',
    menu: [
      {
        id: 'item1',
        itemName: 'Cappuccino',
        price: 3.5,
        photo: '/img/food-img-url-1.jpeg',
      },
      {
        id: 'item2',
        itemName: 'Expresso',
        price: 2,
        photo: '/img/food-img-url-2.webp',
      },
    ],
  },
  {
    _id: ObjectID('222222222222222222222222'),
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
    _id: ObjectID('333333333333333333333333'),
    logoImage: '/img/mcdonalds.svg',
    name: 'McDonalds',
    menu: [],
  },
]
