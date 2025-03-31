import { h } from 'preact'
import {
  LocationProvider,
  Router,
  Route,
  lazy,
  hydrate as preactHydrate,
  ErrorBoundary,
  join,
  prerender as ssr,
} from 'adex/router'

import { ThemeProvider } from '@preachjs/themes'

import 'virtual:adex:global.css'

const baseURL = import.meta.env.BASE_URL ?? '/'

const normalizeURLPath = (url) => (url ? join(baseURL, url) : undefined)

const removeBaseURL = (url) => {
  if (typeof url !== 'string') {
    return undefined
  }

  if (url.startsWith(baseURL)) {
    const result = url.slice(baseURL.length)
    return result === '' ? '/' : result
  }

  const baseURLWithoutSlash = baseURL.endsWith('/')
    ? baseURL.slice(0, -1)
    : baseURL

  if (url.startsWith(baseURLWithoutSlash)) {
    const result = url.slice(baseURLWithoutSlash.length)
    return result === '' ? '/' : result
  }

  return undefined
}

// @ts-expect-error injected by vite
import { routes as _routes } from '~routes'

// TODO: fix in adex
const routes = _routes.map((d) => {
  d.routePath = d.routePath.replace(/\/\*(\w+)/, '/:$1*')
  return d
})

function ComponentWrapper({ url = '' }) {
  return h(
    ThemeProvider,
    {},
    h(
      LocationProvider,
      //@ts-expect-error no types for non-jsx function
      { url: normalizeURLPath(url) },
      h(
        ErrorBoundary,
        {},
        h(
          Router,
          {},
          routes.map((d) => {
            return h(Route, {
              path: normalizeURLPath(d.routePath),
              component: lazy(d.module),
            })
          }),
        ),
      ),
    ),
  )
}

export const App = ({ url = '' }) => {
  return h(ComponentWrapper, { url })
}

async function hydrate() {
  preactHydrate(h(ComponentWrapper, {}), document.getElementById('app'))
}

if (typeof window !== 'undefined') {
  hydrate()
}

export const prerender = async ({ url }) => {
  const { html, links: discoveredLinks } = await ssr(
    h(ComponentWrapper, { url: url }),
  )

  return {
    html,
    links: new Set(
      [...discoveredLinks].map((d) => removeBaseURL(d)).filter(Boolean),
    ),
  }
}
