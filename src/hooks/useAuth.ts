import { useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth'
import { auth, firebaseConfigured, googleProvider } from '../firebase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => onAuthStateChanged(auth, currentUser => {
    setUser(currentUser)
    setLoading(false)
    setError('')
  }), [])

  const login = async () => {
    if (!firebaseConfigured) {
      setError('Firebase is not configured yet. Add your Firebase web app values to .env.local, then restart the dev server.')
      return
    }
    setError('')
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      const code = (err as { code?: string }).code
      if (code === 'auth/popup-closed-by-user') return
      if (code === 'auth/unauthorized-domain') {
        setError('This domain is not authorized. Add localhost or your deployed domain in Firebase Authentication settings.')
      } else if (code === 'auth/operation-not-allowed') {
        setError('Google sign-in is not enabled in Firebase Authentication.')
      } else {
        setError('Google sign-in failed. Please try again.')
      }
      console.error('Google sign-in failed:', err)
    }
  }

  const logout = async () => {
    setError('')
    await signOut(auth)
  }

  return { user, loading, error, login, logout }
}
