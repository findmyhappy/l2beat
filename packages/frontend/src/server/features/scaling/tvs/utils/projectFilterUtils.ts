import type { Project } from '@l2beat/config'
import { assertUnreachable } from '@l2beat/shared-pure'
import { z } from 'zod'
import { isProjectOther } from '../../utils/isProjectOther'

export const TvsProjectFilter = z.discriminatedUnion('type', [
  z.object({
    type: z.enum([
      'layer2',
      'rollups',
      'validiumsAndOptimiums',
      'others',
      'bridge',
    ]),
  }),
  z.object({
    type: z.literal('projects'),
    projectIds: z.array(z.string()),
  }),
])
export type TvsProjectFilter = z.infer<typeof TvsProjectFilter>

export const TvsProjectFilterType = z.enum([
  'layer2',
  'rollups',
  'validiumsAndOptimiums',
  'others',
  'bridge',
  'projects',
])
export type TvsProjectFilterType = z.infer<typeof TvsProjectFilterType>

export function createTvsProjectsFilter(
  filter: TvsProjectFilter,
  previewRecategorisation?: boolean,
): (project: Project<'statuses', 'scalingInfo' | 'isBridge'>) => boolean {
  switch (filter.type) {
    case 'layer2':
      return (project) =>
        !!project.scalingInfo &&
        !(
          previewRecategorisation &&
          project.statuses.reviewStatus === 'initialReview'
        )
    case 'bridge':
      return (project) => !!project.isBridge
    case 'projects':
      return (project) => new Set(filter.projectIds).has(project.id)
    case 'rollups':
      return (project) =>
        !!project.scalingInfo &&
        !isProjectOther(project.scalingInfo, previewRecategorisation) &&
        !(
          previewRecategorisation &&
          project.statuses.reviewStatus === 'initialReview'
        ) && // If previewRecategorisation is true, we exclude projects that are under initial review
        (project.scalingInfo.type === 'Optimistic Rollup' ||
          project.scalingInfo.type === 'ZK Rollup')
    case 'validiumsAndOptimiums':
      return (project) =>
        !!project.scalingInfo &&
        !isProjectOther(project.scalingInfo, previewRecategorisation) &&
        !(
          previewRecategorisation &&
          project.statuses.reviewStatus === 'initialReview'
        ) &&
        (project.scalingInfo.type === 'Validium' ||
          project.scalingInfo.type === 'Optimium' ||
          project.scalingInfo.type === 'Plasma')
    case 'others':
      return (project) =>
        !!project.scalingInfo &&
        isProjectOther(project.scalingInfo, previewRecategorisation) &&
        !(
          previewRecategorisation &&
          project.statuses.reviewStatus === 'initialReview'
        )
    default:
      assertUnreachable(filter)
  }
}
