import { NextRequest } from 'next/server'
import { z } from 'zod'
import { db, adminAuth } from '@/lib/firebase/admin'
import type { Query } from 'firebase-admin/firestore'

const ConversationSchema = z.object({ ownerUid: z.string(), context: z.string().default('') })

async function requireAdmin(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
  if (!token) return null
  const decoded = await adminAuth.verifyIdToken(token)
  const isAdmin = decoded?.role === 'admin' || decoded?.claims?.role === 'admin'
  return isAdmin ? decoded : null
}

export async function GET(req: NextRequest) {
  try {
    const admin = await requireAdmin(req)
    if (!admin) {
      return new Response(JSON.stringify({ error: { code: 'FORBIDDEN', message: 'Admin required' } }), { status: 403, headers: { 'Content-Type': 'application/json' } })
    }
    const url = new URL(req.url)
    const ownerUid = url.searchParams.get('ownerUid')
    let q: Query = db.collection('conversations')
    if (ownerUid) q = q.where('ownerUid', '==', ownerUid)
    const snap = await q.orderBy('createdAt', 'desc').limit(100).get()
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    return new Response(JSON.stringify({ items: data }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    return new Response(JSON.stringify({ error: { code: 'SERVER_ERROR', message: 'Internal Server Error' } }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await requireAdmin(req)
    if (!admin) {
      return new Response(JSON.stringify({ error: { code: 'FORBIDDEN', message: 'Admin required' } }), { status: 403, headers: { 'Content-Type': 'application/json' } })
    }
    const body = await req.json()
    const parsed = ConversationSchema.parse(body)
    const now = Date.now()
    const doc = { ...parsed, createdAt: now }
    const ref = await db.collection('conversations').add(doc)
    return new Response(JSON.stringify({ id: ref.id, ...doc }), { status: 201, headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    return new Response(JSON.stringify({ error: { code: 'BAD_REQUEST', message: 'Invalid payload' } }), { status: 400, headers: { 'Content-Type': 'application/json' } })
  }
}
