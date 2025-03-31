import LayoutBlogPost from '@/components/layouts/blog'
import { useRoute } from 'adex/router'
import { AnyComponent } from 'preact'
import { Suspense, lazy } from 'preact/compat'

const _posts = import.meta.glob('/src/content/**/*.mdx')

const posts: Record<string, unknown> = {}
let defaultKey = ''
for (let _importPath in _posts) {
  const key = _importPath.replace('/src/content/', '').replace('.mdx', '')
  !defaultKey && (defaultKey = key)
  const component = lazy(_posts[_importPath])
  posts[key] = component
}

export default function BlogPost() {
  const loc = useRoute()
  const slug = loc.params.slug

  let Component = posts[slug] as AnyComponent

  if (!posts[slug]) {
    Component = posts[defaultKey] as AnyComponent
  }

  return (
    <LayoutBlogPost>
      <Suspense fallback={''}>
        <Component />
      </Suspense>
    </LayoutBlogPost>
  )
}
