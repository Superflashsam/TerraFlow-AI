import { applicationDefault, initializeApp, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

const app = getApps().length ? getApps()[0] : initializeApp({ credential: applicationDefault() })

export const db = getFirestore(app)
export const adminAuth = getAuth(app)