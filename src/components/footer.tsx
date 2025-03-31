import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-preact'
import { motion } from 'motion/react'
import { useEffect, useState } from 'preact/hooks'
import { TextLoop } from './ui/text-loop'
import { useTheme, THEMES } from '@preachjs/themes'

const THEMES_OPTIONS = [
  { label: 'Light', id: THEMES.LIGHT, icon: <SunIcon className="w-4 h-4" /> },
  { label: 'Dark', id: THEMES.DARK, icon: <MoonIcon className="w-4 h-4" /> },
  {
    label: 'System',
    id: THEMES.SYSTEM,
    icon: <MonitorIcon className="w-4 h-4" />,
  },
]

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return THEMES_OPTIONS.map((themeItem) => {
    return (
      <button
        key={themeItem.id}
        className="relative inline-flex h-7 w-7 items-center hover:cursor-pointer justify-center text-zinc-500 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950 dark:text-zinc-400 dark:data-[checked=true]:text-zinc-50"
        type="button"
        aria-label={`Switch to ${themeItem.label} theme`}
        data-id={themeItem.id}
        onClick={() => {
          setTheme(themeItem.id)
        }}
      >
        {themeItem.id === theme && (
          <motion.span
            layoutId="background"
            className="absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none -z-1 bg-zinc-100 dark:bg-zinc-800"
            transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
          />
        )}
        {themeItem.icon}
      </button>
    )
  })
}

export function Footer() {
  return (
    <footer className="px-0 py-4 mt-24 border-t border-zinc-100 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <a href="https://github.com/ibelick/nim" target="_blank">
          {/* <TextLoop className="text-xs text-zinc-500">
            <span>© 2024 Nim.</span>
            <span>Built with Motion-Primitives.</span>
          </TextLoop> */}
        </a>
        <div className="text-xs text-zinc-400">
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  )
}
