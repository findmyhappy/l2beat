import type { Project } from '@l2beat/config'
import { assert, UnixTime } from '@l2beat/shared-pure'
import keyBy from 'lodash/keyBy'
import mapValues from 'lodash/mapValues'
import { env } from '~/env'
import { getDb } from '~/server/database'
import type { FinalityData, FinalityDataPoint } from './schema'

export async function getFinality(projects: Project<'finalityConfig'>[]) {
  if (env.MOCK) {
    return getMockFinalityData(projects)
  }

  return await getFinalityData(projects)
}

async function getFinalityData(projects: Project<'finalityConfig'>[]) {
  const db = getDb()
  const projectIds = projects.map((p) => p.id)
  const records = await db.finality.getLatestGroupedByProjectId(projectIds)

  const result: FinalityData = mapValues(
    keyBy(records, 'projectId'),
    (record) => {
      const base = {
        syncedUntil: record.timestamp, // cache serialization, will be coerced to UnixTime
        timeToInclusion: {
          minimumInSeconds: record.minimumTimeToInclusion,
          maximumInSeconds: record.maximumTimeToInclusion,
          averageInSeconds: record.averageTimeToInclusion,
        },
      }

      const project = projects.find(
        (project) => project.id === record.projectId,
      )

      assert(project, 'Project not found in config')

      if (project.finalityConfig.stateUpdate === 'zeroed') {
        return { ...base, stateUpdateDelays: { averageInSeconds: 0 } }
      }

      if (project.finalityConfig.stateUpdate === 'disabled') {
        return { ...base, stateUpdateDelays: null }
      }

      const stateUpdateDelays =
        record.averageStateUpdate !== null
          ? { averageInSeconds: record.averageStateUpdate }
          : null

      return { ...base, stateUpdateDelays }
    },
  )

  return result
}

function getMockFinalityData(
  projects: Project<'finalityConfig'>[],
): FinalityData {
  const result = projects.reduce<FinalityData>((acc, cur) => {
    acc[cur.id.toString()] = {
      timeToInclusion: generateMockData(),
      stateUpdateDelays: generateMockData(),
      syncedUntil: UnixTime.now(),
    }
    return acc
  }, {})

  return {
    ...result,
    ...(result.optimism && {
      optimism: {
        ...result.optimism,
        syncedUntil: UnixTime.now() - 2 * UnixTime.DAY,
      },
    }),
  }
}

function generateMockData(): FinalityDataPoint {
  return {
    minimumInSeconds:
      generateRandomTime() < 3000 ? undefined : generateRandomTime(),
    averageInSeconds: generateRandomTime(),
    maximumInSeconds: generateRandomTime(),
  }
}

function generateRandomTime() {
  const i = Math.round(Math.random() * 100)
  if (i < 50) {
    return Math.round(Math.random() * 3600)
  }
  if (i < 90) {
    return 3600 + Math.round(Math.random() * 82800)
  }
  return 86400 + Math.round(Math.random() * 86400 * 5)
}
