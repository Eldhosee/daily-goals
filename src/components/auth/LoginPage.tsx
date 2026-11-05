import type { Theme } from '../../types'
import { ThemeToggle } from '../common/ThemeToggle'
import { firebaseConfigured } from '../../firebase'

interface LoginPageProps {
  theme: Theme
  error: string
  onToggleTheme: () => void
  onLogin: () => void
}

export function LoginPage({ theme, error, onToggleTheme, onLogin }: LoginPageProps) {
  return (
    <div className={`app ${theme}`}>
      <main className="login-card">
        <div className="login-brand">
          <span className="brand-mark"><img src="/mountain-mark.svg" alt="" /></span>
          <span>My Goals</span>
        </div>
        <img className="login-mountains" src="/mountains.svg" alt="" />
        <div className="login-copy">
          <div className="date-label">A LITTLE PROGRESS EVERY DAY</div>
          <h1>Your goals, wherever you go.</h1>
          <p>Sign in to keep your daily goals and history safely synced across your devices.</p>
        </div>
        <button className="google-button" onClick={() => void onLogin()} disabled={!firebaseConfigured}>
          <GoogleMark />
          Continue with Google
        </button>
        {!firebaseConfigured && (
          <p className="setup-hint">Firebase setup is required before you can sign in. Add your web app configuration to <code>.env.local</code>.</p>
        )}
        {error && <div className="error-message">{error}</div>}
        <p className="login-privacy">Your goals are private to your signed-in account.</p>
      </main>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} login />
    </div>
  )
}

function GoogleMark() {
  return (
    <svg width="19" height="19" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.48-4.73 7.18l7.65 5.94c4.47-4.13 7.12-10.2 7.12-17.59Z"/>
      <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.54 2.56 10.78l7.97-6.19Z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.86l-7.65-5.94c-2.13 1.43-4.86 2.3-8.25 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"/>
    </svg>
  )
}
