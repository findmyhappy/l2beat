import { UnderReviewIcon } from '~/icons/UnderReview'

export function UnderReviewBar({ text }: { text: string }) {
  return (
    <div className="flex w-full justify-center rounded-lg bg-yellow-700/20 px-2 py-2.5 md:px-0">
      <span className="flex flex-row">
        <span className="flex items-center">
          <UnderReviewIcon />
        </span>
        <span className="ml-2 text-balance font-medium text-base">{text}</span>
      </span>
    </div>
  )
}
