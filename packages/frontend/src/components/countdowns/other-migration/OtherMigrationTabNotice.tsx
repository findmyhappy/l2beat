// TODO: Figure out how to what to do about it
import { PROJECT_COUNTDOWNS } from '@l2beat/config/build/global/countdowns'
import { UnixTime } from '@l2beat/shared-pure'
import { Countdown } from '~/components/Countdown'
import { CustomLink } from '~/components/link/CustomLink'
import { externalLinks } from '~/consts/externalLinks'
import { cn } from '~/utils/cn'
import { DynamicLogoList } from './DynamicLogoList'

interface Props {
  projectsToBeMigrated: {
    slug: string
    name: string
    icon: string
  }[]
  className?: string
}

export function OtherMigrationTabNotice({
  projectsToBeMigrated,
  className,
}: Props) {
  if (
    projectsToBeMigrated.length === 0 ||
    PROJECT_COUNTDOWNS.otherMigration < UnixTime.now()
  ) {
    return null
  }

  return (
    <div
      className={cn(
        'space-y-2.5 rounded-lg border-2 border-brand p-5',
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-bold text-2xl leading-none">Recategorisation</h2>
        <Countdown
          expiresAt={PROJECT_COUNTDOWNS.otherMigration}
          className="max-md:hidden"
          size="md"
        />
      </div>
      <p className="font-medium text-xs md:text-base">
        More projects will be classifed as &quot;Other&quot; due to specific
        risks that set them apart from the standard classifications.
        <span className="max-md:hidden">
          {' '}
          Visit a project&apos;s detail page to learn more about the specific
          reasons.
        </span>
      </p>
      <Countdown
        expiresAt={PROJECT_COUNTDOWNS.otherMigration}
        className="md:hidden"
        size="sm"
      />
      <DynamicLogoList projects={projectsToBeMigrated} />
      <p className="font-bold text-xs md:text-base">
        Learn more about the recategorisation{' '}
        <CustomLink href={externalLinks.articles.recategorisation}>
          here
        </CustomLink>
        .
      </p>
    </div>
  )
}
