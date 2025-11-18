import { NextRequest } from 'next/server'
import { adminAuth } from '@/lib/firebase/admin'
import { db } from '@/lib/firebase/admin'

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
    if (!token) {
      return new Response(JSON.stringify({ error: { code: 'UNAUTHORIZED', message: 'Missing token' } }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }
    const decoded = await adminAuth.verifyIdToken(token)
    const body = await req.json()
    const uid = String(body?.uid || '')
    if (!uid) {
      return new Response(JSON.stringify({ error: { code: 'BAD_REQUEST', message: 'uid is required' } }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }
    const adminsSnap = await db.collection('admins').limit(1).get()
    const isBootstrap = adminsSnap.empty && uid === decoded.uid
    const isAdmin = decoded?.role === 'admin' || decoded?.claims?.role === 'admin'
    if (!isBootstrap && !isAdmin) {
      return new Response(JSON.stringify({ error: { code: 'FORBIDDEN', message: 'Admin required' } }), { status: 403, headers: { 'Content-Type': 'application/json' } })
    }
    await adminAuth.setCustomUserClaims(uid, { role: 'admin' })
    await db.collection('admins').doc(uid).set({ uid, email: decoded.email || '', displayName: decoded.name || '', role: 'admin', createdAt: Date.now() }, { merge: true })
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    return new Response(JSON.stringify({ error: { code: 'SERVER_ERROR', message: 'Internal Server Error' } }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
