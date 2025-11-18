import { db } from '@/lib/firebase/admin'

export async function GET() {
  try {
    const ref = db.collection('health').doc('firestore')
    await ref.set({ ts: Date.now() }, { merge: true })
    const snap = await ref.get()
    const ok = snap.exists
    return new Response(JSON.stringify({ ok }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    return new Response(JSON.stringify({ ok: false }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
