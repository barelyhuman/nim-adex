import { JSX } from 'preact'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export function BaseLayout({
  children,
}: Readonly<{ children: JSX.ElementChildrenAttribute }>) {
  return (
    <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
      <div className="relative flex-1 w-full max-w-screen-sm px-4 pt-20 mx-auto">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  )
}
