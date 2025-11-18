import { initializeApp, getApp, getApps } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
}

export function getClientAuth(): Auth | null {
  if (typeof window === 'undefined') return null
  const app = getApps().length ? getApp() : initializeApp(config)
  return getAuth(app)
}

export function getClientDb(): Firestore | null {
  if (typeof window === 'undefined') return null
  const app = getApps().length ? getApp() : initializeApp(config)
  return getFirestore(app)
}
