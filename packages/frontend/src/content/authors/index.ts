import { z } from 'zod'

import { defineCollection } from '../defineCollections'

export const authorsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    firstName: z.string(),
    lastName: z.string(),
    role: z.string(),
  }),
})
