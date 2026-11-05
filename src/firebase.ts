import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const requiredEnv = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const firebaseConfigured = Object.values(requiredEnv).every(
  value => typeof value === 'string' && value.length > 0 && !value.startsWith('your-')
)

const app = initializeApp({
  apiKey: requiredEnv.apiKey || 'missing-api-key',
  authDomain: requiredEnv.authDomain || 'missing.firebaseapp.com',
  projectId: requiredEnv.projectId || 'missing-project',
  storageBucket: requiredEnv.storageBucket || 'missing.appspot.com',
  messagingSenderId: requiredEnv.messagingSenderId || 'missing-sender',
  appId: requiredEnv.appId || 'missing-app-id',
})

export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })
