import { useState } from 'react'
import { Markdown } from '~/components/markdown/Markdown'

interface Props {
  children: string
}

export function UpgradeConsiderations({ children }: Props) {
  const [show, setShow] = useState(false)
  return (
    <div>
      <button
        className="mt-2 text-sm underline"
        onClick={() => setShow((show) => !show)}
      >
        Show upgrade details
      </button>
      {/* TODO: remove leading once line heights are fixed for all text on the page */}
      {show ? (
        <Markdown className="mt-2 text-gray-850 text-sm leading-snug dark:text-gray-400">
          {children}
        </Markdown>
      ) : null}
    </div>
  )
}
