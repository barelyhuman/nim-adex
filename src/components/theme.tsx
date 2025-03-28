import {
  getSystemTheme,
  getThemeFromStorage,
  onThemeChange,
  setTheme as setPersonaTheme,
} from '@dumbjs/persona'
import { createContext } from 'preact'
import { useContext, useEffect, useState } from 'preact/hooks'

type ThemeCtx = { theme: string; setTheme: (t: string) => void }

const Context = createContext<ThemeCtx>({ theme: '', setTheme() {} })

export const useTheme = () => {
  return useContext(Context)
}

const setGlobalTheme = (theme: string, store: boolean) =>
  setPersonaTheme(theme, {
    element: document.querySelector('html') as HTMLElement,
    storageKey: 'adex-theme',
    store: store,
  })

export const ThemeProvider = ({ children }: { children: any }) => {
  const [theme, setTheme] = useState('')

  useEffect(() => {
    const storedTheme = getThemeFromStorage('adex-theme')
    changeTheme(storedTheme ?? 'system')
  }, [])

  useEffect(() => {
    onThemeChange(() => {
      const storedTheme = getThemeFromStorage('adex-theme')
      changeTheme(storedTheme)
    })
  }, [theme])

  const changeTheme = (theme: string) => {
    if (theme === 'system') {
      const systemTheme = getSystemTheme()
      setGlobalTheme('system', true)
      setGlobalTheme(systemTheme, false)
      setTheme('system')
      return
    }
    setGlobalTheme(theme, true)
    setTheme(theme)
  }

  return (
    <Context.Provider value={{ theme, setTheme: changeTheme }}>
      {children}
    </Context.Provider>
  )
}
