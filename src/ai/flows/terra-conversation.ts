'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TerraConversationInput = z.object({
  messages: z.array(z.object({ sender: z.enum(['ai','lead','agent']), text: z.string() })),
  lead: z.object({ name: z.string(), channel: z.string().optional(), score: z.number().optional() }).optional(),
});

const TerraConversationOutput = z.object({
  reply: z.string(),
  insights: z.object({
    intent: z.string(),
    sentiment: z.string(),
    objections: z.string(),
    recommendedAction: z.string(),
    predictedConversion: z.string(),
  }),
  leadScore: z.number().optional(),
  events: z.array(z.string()).optional(),
});

export type TerraConversationInputType = z.infer<typeof TerraConversationInput>;
export type TerraConversationOutputType = z.infer<typeof TerraConversationOutput>;

const prompt = ai.definePrompt({
  name: 'terraConversationPrompt',
  input: { schema: TerraConversationInput },
  output: { schema: TerraConversationOutput },
  prompt: `You are Terra, an AI assistant for real estate. Based on the conversation, generate a helpful reply and extract:
  - intent, sentiment, objections, recommendedAction, predictedConversion (as percentage string like '78%').
  - Optionally update leadScore and add events like 'Lead qualified' or 'Site visit scheduled'.

  Conversation:
  {{{messages}}}
  Lead:
  {{{lead}}}`,
});

export async function terraConversation(input: TerraConversationInputType): Promise<TerraConversationOutputType> {
  const { output } = await prompt(input);
  if (!output) throw new Error('No output');
  return output;
}

