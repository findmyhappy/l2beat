import { z } from 'zod'

import { defineCollection } from '../defineCollections'

export const glossaryCollection = defineCollection({
  type: 'data',
  schema: z.object({
    term: z.string(),
    match: z.array(z.string()).optional(),
    definition: z.string(),
    isSpicy: z.boolean(),
  }),
})
