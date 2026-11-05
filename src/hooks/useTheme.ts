import { useEffect, useState } from 'react'
import type { Theme } from '../types'

const THEME_KEY = 'my-goals-theme'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(THEME_KEY) as Theme) || 'light'
  )

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(current => current === 'light' ? 'dark' : 'light')
  }

  return { theme, toggleTheme }
}
