export const LIST_OF_STORES = [
  {
    id: 1,
    logoImage: '/img/starbucks.svg',
    name: 'Starbucks',
  },
  {
    id: 2,
    logoImage: '/img/burger-king.svg',
    name: 'Burger King',
  },
  {
    id: 3,
    logoImage: '/img/mcdonalds.svg',
    name: 'McDonalds',
  },
]

export function getStaticProps() {
  return {
    props: {
      stores: LIST_OF_STORES,
    },
  }
}

export default function StoresPage() {
  return <h1>Stores page</h1>
}
