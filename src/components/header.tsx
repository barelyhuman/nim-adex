import { Link } from '@/components/ui/link'
import { StaggeredTextReveal } from './ui/text-effect'

export function Header() {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <Link href="/" className="font-medium text-black dark:text-white">
          Julien Nim
        </Link>
        <StaggeredTextReveal className="text-zinc-600 dark:text-zinc-500">
          Design Engineer
        </StaggeredTextReveal>
      </div>
    </header>
  )
}
