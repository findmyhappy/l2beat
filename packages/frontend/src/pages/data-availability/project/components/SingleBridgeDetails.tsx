import { RiskBanner } from '~/components/projects/RiskBanner'
import { InlinedNoBridgeGrissiniDetailsPlaceholder } from '~/components/rosette/grissini/NoBridgeGrissiniDetailsPlaceholder'
import type { DaProjectPageEntry } from '~/server/features/data-availability/project/getDaProjectEntry'

interface Props {
  project: DaProjectPageEntry
}

export function SingleBridgeDetails({ project }: Props) {
  return (
    <div className="grid gap-y-2 max-md:mt-4 md:grid-cols-5 md:gap-x-3">
      <div className="text-secondary text-xs md:col-span-2">
        {project.name} risks
      </div>
      <div className="col-span-3 text-secondary text-xs max-md:hidden">
        DA Bridge risks
      </div>
      {project.header.daLayerGrissiniValues.map((value) => (
        <RiskBanner
          key={value.name}
          {...value}
          descriptionAsTooltip
          info="compact"
        />
      ))}
      <div className="mt-3 text-secondary text-xs md:hidden">
        DA Bridge risks
      </div>
      {project.selectedBridge.isNoBridge ? (
        <InlinedNoBridgeGrissiniDetailsPlaceholder className="md:col-span-3" />
      ) : (
        project.header.daBridgeGrissiniValues.map((value) => (
          <RiskBanner
            key={value.name}
            {...value}
            descriptionAsTooltip
            info="compact"
          />
        ))
      )}
    </div>
  )
}
