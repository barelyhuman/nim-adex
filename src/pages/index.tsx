import { BaseLayout } from '@/components/base'
import Personal from './_index'

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <BaseLayout>
      <Personal />
    </BaseLayout>
  )
}
