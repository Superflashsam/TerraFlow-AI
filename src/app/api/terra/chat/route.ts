import { NextRequest } from 'next/server';
import { terraConversation } from '@/ai/flows/terra-conversation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, lead } = body || {};
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid request: missing messages' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    if (!process.env.GOOGLE_AI_API_KEY) {
      const fallback = {
        reply: 'AI is not configured. Please set GOOGLE_AI_API_KEY to enable Terra chat.',
        insights: { intent: 'Unknown', sentiment: 'Neutral', objections: 'None', recommendedAction: 'Collect more details', predictedConversion: '—' },
        leadScore: (lead?.score ?? 70),
        events: [],
      };
      return new Response(JSON.stringify(fallback), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
    const result = await terraConversation({ messages, lead });
    return new Response(JSON.stringify(result), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Terra Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

