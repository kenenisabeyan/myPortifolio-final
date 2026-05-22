import { useState } from 'react'

type ExpandableTextProps = {
  text: string
  maxLength?: number
  className?: string
  moreLabel?: string
  lessLabel?: string
}

const ExpandableText = ({
  text,
  maxLength = 160,
  className = '',
  moreLabel = 'Read more',
  lessLabel = 'Show less',
}: ExpandableTextProps) => {
  const [expanded, setExpanded] = useState(false)
  const shouldTruncate = text.length > maxLength
  const displayText = !shouldTruncate || expanded ? text : `${text.slice(0, maxLength).trimEnd()}…`

  return (
    <p className={className}>
      {displayText}
      {shouldTruncate ? (
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="ml-1 inline-block text-sm font-semibold text-cyan-400 hover:text-cyan-200 dark:hover:text-cyan-300 transition-colors whitespace-nowrap"
        >
          {expanded ? lessLabel : moreLabel}
        </button>
      ) : null}
    </p>
  )
}

export default ExpandableText
