import { z } from 'zod'

export const storeMenuItemSchema = z.object({
  id: z.string(),
  itemName: z.string(),
  price: z.number(),
  photo: z.string(),
})

export const storeSchema = z.object({
  id: z.string(),
  logoImage: z.string(),
  name: z.string(),
  menu: z.array(storeMenuItemSchema),
})

export const transactionDetailItemSchema = z.object({
  item: storeMenuItemSchema
    .omit({ itemName: true })
    .and(z.object({ name: z.string() })),
  quantity: z.number(),
})

export const transactionDetailStoreSchema = z.object({
  store: z.object({
    id: z.string(),
    name: z.string(),
  }),
  items: z.array(transactionDetailItemSchema),
})

export const transactionSchema = z.object({
  id: z.string(),
  details: z.array(transactionDetailStoreSchema),
  subtotal: z.number(),
})

export type Transaction = z.infer<typeof transactionSchema>
export type TransactionDetailItem = z.infer<typeof transactionDetailItemSchema>
export type TransactionDetailStore = z.infer<
  typeof transactionDetailStoreSchema
>
export type StoreMenuItemType = z.infer<typeof storeMenuItemSchema>
export type StoreType = z.infer<typeof storeSchema>
