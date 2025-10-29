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
import { searchLeads } from './search-leads';
import { sendEmail } from './send-email';

const AiLeadQualificationInputSchema = z.object({
  userDetails: z
    .string()
    .describe("The user's details and initial message to the AI assistant."),
});
export type AiLeadQualificationInput = z.infer<typeof AiLeadQualificationInputSchema>;

const AiLeadQualificationOutputSchema = z.object({
  budget: z.string().describe('The budget of the lead. Default to "Not specified" if not found.'),
  location: z.string().describe('The preferred location of the lead. Default to "Not specified" if not found.'),
  timeline: z.string().describe('The timeline of the lead. Default to "Not specified" if not found.'),
  siteVisitBooking: z.string().optional().describe('Confirmation and details of the site visit booking, if applicable.'),
  qualified: z.boolean().describe('Whether the lead is qualified or not.'),
  summary: z.string().describe('A summary of the conversation with the lead or the result of the tool call.'),
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
  tools: [bookSiteVisit, searchLeads, sendEmail],
  prompt: `You are Terra, an AI chat assistant specializing in qualifying real estate leads and managing CRM data. 
  
  Your primary goals are:
  1. Qualify real estate leads by determining their budget, preferred location, and timeline.
  2. Interact with the CRM by using the available tools to search for leads.
  3. Schedule site visits for qualified leads.
  4. Send emails to leads when requested.

  Analyze the user's request. 
  - If the user is providing information about a potential lead, extract their budget, location, and timeline. If they seem qualified, use the bookSiteVisit tool.
  - If the user is asking to find leads (e.g., "find all hot leads", "show me investors in Pune"), use the searchLeads tool to find the information and summarize the results.
  - If the user asks you to send an email, use the sendEmail tool. You must have the recipient's email address, a subject, and a body for the email.
  
  Finally, provide a concise summary of the outcome and output all the gathered information in the required JSON format.

  Conversation:
  {{{userDetails}}}`,
});

const aiLeadQualificationFlow = ai.defineFlow(
  {
    name: 'aiLeadQualificationFlow',
    inputSchema: AiLeadQualificationInputSchema,
    outputSchema: AiLeadQualificationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("The AI model failed to return a valid response.");
    }
    return output;
  }
);
