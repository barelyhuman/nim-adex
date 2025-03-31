import { TextMorph } from '@/components/ui/text-morph'
import { ComponentChildren } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { BaseLayout } from '../base'
import { ScrollProgress } from '@/components/ui/scroll-progress'

function CopyButton() {
  const [text, setText] = useState('Copy')
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  useEffect(() => {
    setTimeout(() => {
      setText('Copy')
    }, 2000)
  }, [text])

  return (
    <button
      onClick={() => {
        setText('Copied')
        navigator.clipboard.writeText(currentUrl)
      }}
      className="flex items-center gap-1 text-sm text-center transition-colors font-base text-zinc-500 dark:text-zinc-400"
      type="button"
    >
      <TextMorph>{text}</TextMorph>
      <span>URL</span>
    </button>
  )
}

export default function LayoutBlogPost({
  children,
}: {
  children: ComponentChildren
}) {
  return (
    <BaseLayout>
      <>
        <div className="pointer-events-none fixed left-0 top-0 z-10 h-12 w-full bg-gray-100 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-zinc-950" />
        <ScrollProgress
          className="fixed top-0 z-20 h-0.5 bg-gray-300 dark:bg-gray-600"
          springOptions={{
            bounce: 0,
          }}
        />

        <div className="absolute right-4 top-24">
          <CopyButton />
        </div>

        <main className="pb-20 mt-24 prose prose-gray prose-h4:prose-base dark:prose-invert prose-h1:text-xl prose-h1:font-medium prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-lg prose-h2:font-medium prose-h3:text-base prose-h3:font-medium prose-h4:font-medium prose-h5:text-base prose-h5:font-medium prose-h6:text-base prose-h6:font-medium prose-strong:font-medium">
          {children}
        </main>
      </>
    </BaseLayout>
  )
}
