'use server';

/**
 * @fileOverview An AI lead qualification agent.
 * 
 * - aiLeadQualification - A function that handles the lead qualification process.
 * - AiLeadQualificationInput - The input type for the aiLeadQualification function.
 * - AiLeadQualificationOutput - The return type for the aiLeadQualification function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiLeadQualificationInputSchema = z.object({
  userDetails: z
    .string()
    .describe("The user's details and initial message to the AI assistant."),
});
export type AiLeadQualificationInput = z.infer<typeof AiLeadQualificationInputSchema>;

const AiLeadQualificationOutputSchema = z.object({
  budget: z.string().describe('The budget of the lead.'),
  location: z.string().describe('The preferred location of the lead.'),
  timeline: z.string().describe('The timeline of the lead.'),
  siteVisitBooking: z.string().describe('Confirmation and details of the site visit booking, if applicable.'),
  qualified: z.boolean().describe('Whether the lead is qualified or not.'),
  summary: z.string().describe('A summary of the conversation with the lead.'),
});
export type AiLeadQualificationOutput = z.infer<typeof AiLeadQualificationOutputSchema>;


const bookSiteVisit = ai.defineTool(
  {
    name: 'bookSiteVisit',
    description: 'Books a site visit with the lead, integrating with Google Calendar.',
    inputSchema: z.object({
      date: z.string().describe('The date of the site visit.'),
      time: z.string().describe('The time of the site visit.'),
      leadName: z.string().describe('The name of the lead.'),
      leadContact: z.string().describe('The contact information of the lead.'),
    }),
    outputSchema: z.string().describe('Confirmation details of the site visit booking.'),
  },
  async (input) => {
    // Placeholder implementation for booking a site visit.
    // In a real application, this would integrate with the Google Calendar API.
    return `Site visit booked for ${input.leadName} on ${input.date} at ${input.time}.`;
  }
);

export async function aiLeadQualification(input: AiLeadQualificationInput): Promise<AiLeadQualificationOutput> {
  return aiLeadQualificationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiLeadQualificationPrompt',
  input: {schema: AiLeadQualificationInputSchema},
  output: {schema: AiLeadQualificationOutputSchema},
  tools: [bookSiteVisit],
  prompt: `You are an AI chat assistant specializing in qualifying real estate leads. Your goal is to determine the lead's budget, preferred location, and timeline for purchasing a property.  You will also attempt to book a site visit for qualified leads.

  Based on the following conversation with the user, extract the budget, location, and timeline.  If the lead is serious (clear budget, location and timeline identified), use the bookSiteVisit tool to book a site visit.  Once you have collected all the information, determine if the lead is qualified, provide a summary of the conversation, and output all the information in JSON format.

  Conversation: {{{userDetails}}}`,
});

const aiLeadQualificationFlow = ai.defineFlow(
  {
    name: 'aiLeadQualificationFlow',
    inputSchema: AiLeadQualificationInputSchema,
    outputSchema: AiLeadQualificationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
