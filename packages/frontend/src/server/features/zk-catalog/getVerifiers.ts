import { UnixTime, branded } from '@l2beat/shared-pure'
import uniq from 'lodash/uniq'
import { z } from 'zod'
import { env } from '~/env'
import { getDb } from '~/server/database'
import { ps } from '~/server/projects'

export async function getVerifiers() {
  if (env.MOCK) {
    return getMockVerifiers()
  }

  const db = getDb()
  const projects = await ps.getProjects({
    select: ['proofVerification'],
    whereNot: ['archivedAt'],
  })

  const verifiers = projects.flatMap((p) => p.proofVerification.verifiers)

  const statuses = await db.verifierStatus.getVerifierStatuses(
    uniq(verifiers.map((v) => v.contractAddress.toString())),
  )

  return verifiers.map((verifier) => {
    const status = statuses.find(
      (s) =>
        s.address === verifier.contractAddress.toString() &&
        s.chainId === verifier.chainId,
    )
    return {
      address: verifier.contractAddress.toString(),
      timestamp: status ? status.lastUsed : null,
    }
  })
}

async function getMockVerifiers() {
  const projects = await ps.getProjects({
    select: ['proofVerification'],
    whereNot: ['archivedAt'],
  })
  return projects
    .flatMap((p) => p.proofVerification.verifiers)
    .map((v) => ({
      address: v.contractAddress.toString(),
      timestamp: UnixTime.now(),
    }))
}

const VerifierStatus = z.object({
  address: z.string(),
  timestamp: branded(z.number().nullable(), (n) => (n ? UnixTime(n) : null)),
})
export const VerifiersStatuses = z.array(VerifierStatus)
export type VerifiersStatuses = z.infer<typeof VerifiersStatuses>
