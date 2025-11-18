import { NextRequest } from 'next/server';
import { terraStore } from '@/server/terra-store';

export async function GET() {
  return new Response(JSON.stringify(terraStore.settings), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  Object.assign(terraStore.settings, body);
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

