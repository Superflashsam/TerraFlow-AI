import { NextRequest } from 'next/server'
import { z } from 'zod'
import { db, adminAuth } from '@/lib/firebase/admin'

const UpdateSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  budget: z.number().optional(),
  location: z.string().optional(),
  status: z.string().optional(),
  score: z.number().optional(),
  source: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

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
    const id = new URL(req.url).pathname.split('/').pop() as string
    const doc = await db.collection('leads').doc(id).get()
    if (!doc.exists) {
      return new Response(JSON.stringify({ error: { code: 'NOT_FOUND', message: 'Not found' } }), { status: 404, headers: { 'Content-Type': 'application/json' } })
    }
    return new Response(JSON.stringify({ id: doc.id, ...doc.data() }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    return new Response(JSON.stringify({ error: { code: 'SERVER_ERROR', message: 'Internal Server Error' } }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const admin = await requireAdmin(req)
    if (!admin) {
      return new Response(JSON.stringify({ error: { code: 'FORBIDDEN', message: 'Admin required' } }), { status: 403, headers: { 'Content-Type': 'application/json' } })
    }
    const body = await req.json()
    const parsed = UpdateSchema.parse(body)
    const update = { ...parsed, updatedAt: Date.now() }
    const id = new URL(req.url).pathname.split('/').pop() as string
    await db.collection('leads').doc(id).set(update, { merge: true })
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    return new Response(JSON.stringify({ error: { code: 'BAD_REQUEST', message: 'Invalid payload' } }), { status: 400, headers: { 'Content-Type': 'application/json' } })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const admin = await requireAdmin(req)
    if (!admin) {
      return new Response(JSON.stringify({ error: { code: 'FORBIDDEN', message: 'Admin required' } }), { status: 403, headers: { 'Content-Type': 'application/json' } })
    }
    const id = new URL(req.url).pathname.split('/').pop() as string
    await db.collection('leads').doc(id).delete()
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    return new Response(JSON.stringify({ error: { code: 'SERVER_ERROR', message: 'Internal Server Error' } }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
