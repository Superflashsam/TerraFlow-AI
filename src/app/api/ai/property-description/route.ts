import { NextRequest } from 'next/server';
import { generatePropertyDescription } from '@/ai/flows/generate-property-description';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Basic validation: ensure required fields exist
    const required = ['propertyType','location','bedrooms','bathrooms','squareFootage','amenities','uniqueFeatures','targetAudience','style','socialMediaPlatform'];
    const missing = required.filter((k) => !(k in body));
    if (missing.length) {
      return new Response(JSON.stringify({ error: `Missing fields: ${missing.join(', ')}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!process.env.GOOGLE_AI_API_KEY) {
      const description = `AI is not configured. Preview description for ${body.propertyType} in ${body.location} with ${body.bedrooms} beds, ${body.bathrooms} baths, ${body.squareFootage} sqft. Amenities: ${body.amenities}. Unique: ${body.uniqueFeatures}. Audience: ${body.targetAudience}. Style: ${body.style}. Platform: ${body.socialMediaPlatform}.`;
      return new Response(JSON.stringify({ description }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await generatePropertyDescription(body);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Property Description API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
