import { UnderReviewIcon } from '~/icons/UnderReview'
import { cn } from '~/utils/cn'

interface Props {
  small?: boolean
  className?: string
}

export function UnderReviewCallout({ small, className }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-lg bg-yellow-700/20',
        small ? 'gap-2 p-4' : 'items-center gap-4 p-8',
        className,
      )}
    >
      <div>
        <UnderReviewIcon
          className={cn(
            '-top-0.5 relative inline-block',
            small ? 'size-4' : 'size-6',
          )}
        />
        <span
          className={cn('ml-2 inline-block font-medium', !small && 'text-2xl')}
        >
          Under Review
        </span>
      </div>
      {small ? (
        <p className="text-balance text-sm">
          Projects under review might present incomplete info & data.
        </p>
      ) : (
        <p className="text-balance text-center text-sm">
          The information in the section might be incomplete or outdated.
          <br />
          The L2BEAT Team is working to research & validate the content before
          publishing.
        </p>
      )}
    </div>
  )
}
