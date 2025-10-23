'use server';

/**
 * @fileOverview AI-powered social media post generator.
 *
 * - generateSocialMediaPost - A function that generates a social media post.
 * - GenerateSocialMediaPostInput - The input type for the generateSocialMediaPost function.
 * - GenerateSocialMediaPostOutput - The return type for the generateSocialMediaPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSocialMediaPostInputSchema = z.object({
  propertyDescription: z.string().describe('The description of the property.'),
  platform: z.enum(['Facebook', 'Instagram', 'X', 'LinkedIn']).describe('The social media platform to generate the post for.'),
  locality: z.string().describe('The locality or region the property is located in.'),
});

export type GenerateSocialMediaPostInput = z.infer<typeof GenerateSocialMediaPostInputSchema>;

const GenerateSocialMediaPostOutputSchema = z.object({
  post: z.string().describe('The generated social media post.'),
});

export type GenerateSocialMediaPostOutput = z.infer<typeof GenerateSocialMediaPostOutputSchema>;

export async function generateSocialMediaPost(input: GenerateSocialMediaPostInput): Promise<GenerateSocialMediaPostOutput> {
  return generateSocialMediaPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSocialMediaPostPrompt',
  input: {schema: GenerateSocialMediaPostInputSchema},
  output: {schema: GenerateSocialMediaPostOutputSchema},
  prompt: `You are a social media expert specializing in real estate marketing.

  Generate a social media post for the following property description, tailored for the specified platform and locality.

  Property Description: {{{propertyDescription}}}
  Platform: {{{platform}}}
  Locality: {{{locality}}}

  Post:
  `,
});

const generateSocialMediaPostFlow = ai.defineFlow(
  {
    name: 'generateSocialMediaPostFlow',
    inputSchema: GenerateSocialMediaPostInputSchema,
    outputSchema: GenerateSocialMediaPostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
