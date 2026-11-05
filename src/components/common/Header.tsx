import { Clock3, Home, LogOut } from 'lucide-react'
import type { User } from 'firebase/auth'
import type { Page, Theme } from '../../types'
import { ThemeToggle } from './ThemeToggle'

interface HeaderProps {
  user: User
  page: Page
  theme: Theme
  onPageChange: (page: Page) => void
  onToggleTheme: () => void
  onLogout: () => void
}

export function Header({ user, page, theme, onPageChange, onToggleTheme, onLogout }: HeaderProps) {
  return (
    <header className="topbar">
      <button className="brand" onClick={() => onPageChange('today')} aria-label="Go to today">
        <span className="brand-mark"><img src="/mountain-mark.svg" alt="" /></span>
        <span>My Goals</span>
      </button>
      <nav className="nav-tabs" aria-label="Main navigation">
        <button className={page === 'today' ? 'nav-tab active' : 'nav-tab'} onClick={() => onPageChange('today')}><Home size={19} />Today</button>
        <button className={page === 'history' ? 'nav-tab active' : 'nav-tab'} onClick={() => onPageChange('history')}><Clock3 size={20} />History</button>
      </nav>
      <div className="header-actions">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <button className="account-button" onClick={() => void onLogout()} title={`Sign out ${user.displayName ?? user.email ?? ''}`} aria-label="Sign out">
          {user.photoURL ? <img src={user.photoURL} alt="" /> : <LogOut size={17} />}
        </button>
      </div>
    </header>
  )
}
