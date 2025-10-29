import { config } from 'dotenv';
config();

import '@/ai/flows/ai-lead-qualification.ts';
import '@/ai/flows/ai-lead-scoring.ts';
import '@/ai/flows/ai-social-media-post-generation.ts';
import '@/ai/flows/generate-property-description.ts';
import '@/ai/flows/score-leads-based-on-engagement.ts';
import '@/ai/flows/search-leads.ts';
import '@/ai/flows/send-email.ts';
