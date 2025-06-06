import { z } from 'zod'
import { rangeToDays } from '~/utils/range/rangeToDays'

export const TvsChartRange = z.enum(['7d', '30d', '90d', '180d', '1y', 'max'])
export type TvsChartRange = z.infer<typeof TvsChartRange>

export type TvsChartResolution = ReturnType<typeof rangeToResolution>

export function rangeToResolution(range: TvsChartRange) {
  const days = rangeToDays(range)
  if (days && days <= 7) return 'hourly'
  if (days && days < 180) return 'sixHourly'
  return 'daily'
}
