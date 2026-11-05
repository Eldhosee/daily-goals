import { Moon, Sun } from 'lucide-react'
import type { Theme } from '../../types'

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
  login?: boolean
}

export function ThemeToggle({ theme, onToggle, login = false }: ThemeToggleProps) {
  if (login) {
    return (
      <button className="login-theme" onClick={onToggle} aria-label="Toggle theme">
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </button>
    )
  }
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label="Toggle theme">
      <Sun size={18} className="sun-icon" /><span className="toggle-knob" /><Moon size={17} className="moon-icon" />
    </button>
  )
}
