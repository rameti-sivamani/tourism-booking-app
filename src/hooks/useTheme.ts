import { useEffect, useState } from 'react'
import { readJson, writeJson } from '../lib/storage'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'tourism.theme'

function systemTheme(): Theme {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/** Light/dark theme that follows the OS until the user picks one. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => readJson<Theme | null>(STORAGE_KEY, null) ?? systemTheme(),
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    writeJson(STORAGE_KEY, next)
    setTheme(next)
  }

  return { theme, toggleTheme }
}
