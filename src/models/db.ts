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

export type StoreMenuItemType = z.infer<typeof storeMenuItemSchema>
export type StoreType = z.infer<typeof storeSchema>
