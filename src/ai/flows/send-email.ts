'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const sendEmail = ai.defineTool(
  {
    name: 'sendEmail',
    description: 'Sends an email to a lead.',
    inputSchema: z.object({
      to: z.string().describe("The recipient's email address."),
      subject: z.string().describe('The subject of the email.'),
      body: z.string().describe('The HTML body of the email.'),
    }),
    outputSchema: z.string().describe('A confirmation message that the email was sent.'),
  },
  async ({ to, subject, body }) => {
    // In a real application, this would integrate with an email service provider
    // like SendGrid, Nodemailer, etc.
    console.log(`Sending email to ${to} with subject "${subject}"`);
    return `Email successfully sent to ${to}.`;
  }
);
