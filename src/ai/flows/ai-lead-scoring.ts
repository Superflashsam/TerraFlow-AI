'use server';

/**
 * @fileOverview This flow automatically scores leads based on budget, timeline, engagement, and location.
 *
 * - aiLeadScoring - A function that handles the lead scoring process.
 * - AiLeadScoringInput - The input type for the aiLeadScoring function.
 * - AiLeadScoringOutput - The return type for the aiLeadScoring function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiLeadScoringInputSchema = z.object({
  budget: z.string().describe('The lead\'s budget for the property.'),
  timeline: z.string().describe('The lead\'s timeline for purchasing the property.'),
  engagement: z.string().describe('The lead\'s engagement level with the agency.'),
  location: z.string().describe('The lead\'s preferred location for the property.'),
});
export type AiLeadScoringInput = z.infer<typeof AiLeadScoringInputSchema>;

const AiLeadScoringOutputSchema = z.object({
  score: z.number().describe('The AI-assigned score for the lead (0-100).'),
  reasoning: z.string().describe('The AI\'s reasoning for the assigned score.'),
});
export type AiLeadScoringOutput = z.infer<typeof AiLeadScoringOutputSchema>;

export async function aiLeadScoring(input: AiLeadScoringInput): Promise<AiLeadScoringOutput> {
  return aiLeadScoringFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiLeadScoringPrompt',
  input: {schema: AiLeadScoringInputSchema},
  output: {schema: AiLeadScoringOutputSchema},
  prompt: `You are an AI assistant that scores leads based on their potential value.

  Given the following information about a lead, provide a score between 0 and 100, along with a brief explanation of your reasoning.

  Budget: {{{budget}}}
  Timeline: {{{timeline}}}
  Engagement: {{{engagement}}}
  Location: {{{location}}}

  Consider budget, timeline, engagement level, and location preference when determining the score. Higher budget, shorter timeline, higher engagement, and desirable location should result in a higher score.
  The score should be a number.
  The reasoning should be a string.
  `,
});

const aiLeadScoringFlow = ai.defineFlow(
  {
    name: 'aiLeadScoringFlow',
    inputSchema: AiLeadScoringInputSchema,
    outputSchema: AiLeadScoringOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
