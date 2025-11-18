import { NextRequest } from 'next/server';
import { terraStore } from '@/server/terra-store';

export async function GET() {
  return new Response(JSON.stringify(terraStore.knowledge), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  Object.assign(terraStore.knowledge, body);
  terraStore.knowledge.logs.push(`Updated knowledge at ${new Date().toISOString()}`);
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

