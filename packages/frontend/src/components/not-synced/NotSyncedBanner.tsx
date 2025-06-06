interface Props {
  content: string
}

export function NotSyncedBanner({ content }: Props) {
  return (
    <div className="flex w-full items-center rounded-lg bg-gray-200 px-4 py-2 font-medium text-xs dark:bg-zinc-800">
      {content}
    </div>
  )
}
