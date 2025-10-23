'use server';

/**
 * @fileOverview This flow automatically scores leads based on budget, timeline, engagement, and location.
 *
 * - scoreLeadsBasedOnEngagement - A function that handles the lead scoring process.
 * - ScoreLeadsBasedOnEngagementInput - The input type for the scoreLeadsBasedOnEngagement function.
 * - ScoreLeadsBasedOnEngagementOutput - The return type for the scoreLeadsBasedOnEngagement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScoreLeadsBasedOnEngagementInputSchema = z.object({
  budget: z.string().describe('The lead\'s budget for the property.'),
  timeline: z.string().describe('The lead\'s timeline for purchasing the property.'),
  engagement: z.string().describe('The lead\'s engagement level with the agency.'),
  location: z.string().describe('The lead\'s preferred location for the property.'),
});
export type ScoreLeadsBasedOnEngagementInput = z.infer<typeof ScoreLeadsBasedOnEngagementInputSchema>;

const ScoreLeadsBasedOnEngagementOutputSchema = z.object({
  score: z.number().describe('The AI-assigned score for the lead (0-100).'),
  reasoning: z.string().describe('The AI\'s reasoning for the assigned score.'),
});
export type ScoreLeadsBasedOnEngagementOutput = z.infer<typeof ScoreLeadsBasedOnEngagementOutputSchema>;

export async function scoreLeadsBasedOnEngagement(input: ScoreLeadsBasedOnEngagementInput): Promise<ScoreLeadsBasedOnEngagementOutput> {
  return scoreLeadsBasedOnEngagementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scoreLeadsBasedOnEngagementPrompt',
  input: {schema: ScoreLeadsBasedOnEngagementInputSchema},
  output: {schema: ScoreLeadsBasedOnEngagementOutputSchema},
  prompt: `You are an AI assistant that scores leads based on their potential value.\n\n  Given the following information about a lead, provide a score between 0 and 100, along with a brief explanation of your reasoning.\n\n  Budget: {{{budget}}}\n  Timeline: {{{timeline}}}\n  Engagement: {{{engagement}}}\n  Location: {{{location}}}\n\n  Consider budget, timeline, engagement level, and location preference when determining the score. Higher budget, shorter timeline, higher engagement, and desirable location should result in a higher score.\n  The score should be a number.\n  The reasoning should be a string.\n  `,
});

const scoreLeadsBasedOnEngagementFlow = ai.defineFlow(
  {
    name: 'scoreLeadsBasedOnEngagementFlow',
    inputSchema: ScoreLeadsBasedOnEngagementInputSchema,
    outputSchema: ScoreLeadsBasedOnEngagementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
