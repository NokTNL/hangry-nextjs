import { z } from 'zod'

export const storeMenuSchema = z.array(
  z.object({
    id: z.string(),
    itemName: z.string(),
    price: z.number(),
    photo: z.string(),
  })
)

export const storesSchema = z.array(
  z.object({
    id: z.string(),
    logoImage: z.string(),
    name: z.string(),
    menu: storeMenuSchema,
  })
)

export type StoreMenu = z.infer<typeof storeMenuSchema>
export type StoresData = z.infer<typeof storesSchema>
