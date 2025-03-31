import { BaseLayout } from '@/components/base'
import Personal from './_index'
import { ComponentChildren } from 'preact'

export default function RootLayout({
  children,
}: Readonly<{ children: ComponentChildren }>) {
  return (
    <BaseLayout>
      <Personal />
    </BaseLayout>
  )
}
