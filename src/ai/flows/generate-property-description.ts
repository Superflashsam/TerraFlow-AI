'use server';

/**
 * @fileOverview An AI agent for generating property descriptions.
 *
 * - generatePropertyDescription - A function that generates a property description.
 * - GeneratePropertyDescriptionInput - The input type for the generatePropertyDescription function.
 * - GeneratePropertyDescriptionOutput - The return type for the generatePropertyDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePropertyDescriptionInputSchema = z.object({
  propertyType: z.string().describe('The type of property (e.g., house, apartment, condo).'),
  location: z.string().describe('The location of the property (e.g., city, neighborhood).'),
  bedrooms: z.number().describe('The number of bedrooms in the property.'),
  bathrooms: z.number().describe('The number of bathrooms in the property.'),
  squareFootage: z.number().describe('The square footage of the property.'),
  amenities: z.string().describe('A list of amenities the property has (e.g., pool, gym, park).'),
  uniqueFeatures: z.string().describe('A description of unique features the property has (e.g., view, design).'),
  targetAudience: z.string().describe('The target audience of the property (e.g., families, young professionals).'),
  style: z.string().describe('The tone and style of the description (e.g., professional, fun).'),
  socialMediaPlatform: z.string().describe('The social media platform you will be posting to (e.g. Facebook, Instagram)'),
});
export type GeneratePropertyDescriptionInput = z.infer<typeof GeneratePropertyDescriptionInputSchema>;

const GeneratePropertyDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated property description.'),
});
export type GeneratePropertyDescriptionOutput = z.infer<typeof GeneratePropertyDescriptionOutputSchema>;

export async function generatePropertyDescription(input: GeneratePropertyDescriptionInput): Promise<GeneratePropertyDescriptionOutput> {
  return generatePropertyDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePropertyDescriptionPrompt',
  input: {schema: GeneratePropertyDescriptionInputSchema},
  output: {schema: GeneratePropertyDescriptionOutputSchema},
  prompt: `You are an expert real estate copywriter.

  You will use the information to write a compelling property description that would appeal to the target audience on the specified social media platform.

  Property Type: {{{propertyType}}}
  Location: {{{location}}}
  Bedrooms: {{{bedrooms}}}
  Bathrooms: {{{bathrooms}}}
  Square Footage: {{{squareFootage}}}
  Amenities: {{{amenities}}}
  Unique Features: {{{uniqueFeatures}}}
  Target Audience: {{{targetAudience}}}
  Style: {{{style}}}
  Social Media Platform: {{{socialMediaPlatform}}}

  Write a description:
  `, 
});

const generatePropertyDescriptionFlow = ai.defineFlow(
  {
    name: 'generatePropertyDescriptionFlow',
    inputSchema: GeneratePropertyDescriptionInputSchema,
    outputSchema: GeneratePropertyDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
