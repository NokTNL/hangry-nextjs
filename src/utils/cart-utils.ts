import { CartItemType } from 'src/store/constants'

type GroupedItemsByStore = {
  store: CartItemType['store']
  items: {
    item: CartItemType['item']
    quantity: CartItemType['quantity']
  }[]
}[]

export function groupItemsByStore(
  cartItems: CartItemType[]
): GroupedItemsByStore {
  const groupedStores: GroupedItemsByStore = []

  for (const cartItem of cartItems) {
    let storeFound = false
    for (const store of groupedStores) {
      if (storeFound) break
      if (store.store.id === cartItem.store.id) {
        store.items.push({ item: cartItem.item, quantity: cartItem.quantity })
        storeFound = true
      }
    }
    if (!storeFound) {
      groupedStores.push({
        store: cartItem.store,
        items: [{ item: cartItem.item, quantity: cartItem.quantity }],
      })
    }
  }

  return groupedStores
}
