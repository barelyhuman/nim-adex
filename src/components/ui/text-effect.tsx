import { cn } from '@/lib/utils'
import { animate, stagger } from 'motion'

function splitText(str: string) {
  return str.split('')
}

export function StaggeredTextReveal({
  children,
  className,
}: {
  children: string
  className: string
}) {
  const baseDelay = 0.5
  const chars = splitText(children)
  return (
    <div
      className={cn(className)}
      style={{ opacity: 0 }}
      ref={(node) => {
        if (!node) return
        animate(node, { opacity: 1 }, { delay: baseDelay })
      }}
    >
      {chars.map((d, index) => (
        <span
          style={{ opacity: 0 }}
          ref={(node) => {
            if (!node) return
            animate(
              node,
              { opacity: 1 },
              { delay: stagger(0.1, { startDelay: baseDelay + 0.02 * index }) },
            )
          }}
        >
          {d}
        </span>
      ))}
    </div>
  )
}
