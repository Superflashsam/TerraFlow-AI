import { NextRequest } from 'next/server';
import { aiLeadQualification } from '@/ai/flows/ai-lead-qualification';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userDetails } = body || {};
    if (typeof userDetails !== 'string' || !userDetails.trim()) {
      return new Response(JSON.stringify({ error: 'Invalid request: missing userDetails' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!process.env.GOOGLE_AI_API_KEY) {
      const fallback = {
        budget: 'Not specified',
        location: 'Not specified',
        timeline: 'Not specified',
        qualified: false,
        summary: 'AI is not configured. Please set GOOGLE_AI_API_KEY to enable lead qualification.',
      };
      return new Response(JSON.stringify(fallback), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await aiLeadQualification({ userDetails });
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Lead Qualification API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
