'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Mock contact data - in a real app, this would come from a database
const mockContacts = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      company: 'Tech Solutions Pvt Ltd',
      status: 'hot_lead',
      category: 'buyer',
      tags: ['High Value', 'Mumbai'],
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      company: 'Marketing Agency',
      status: 'warm_lead',
      category: 'seller',
      tags: ['Quick Sale', 'Delhi'],
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      company: 'Construction Corp',
      status: 'cold_lead',
      category: 'investor',
      tags: ['Bulk Purchase', 'Pune'],
    },
    {
      id: 4,
      name: 'Sunita Reddy',
      email: 'sunita.reddy@email.com',
      company: 'IT Services Ltd',
      status: 'client',
      category: 'buyer',
      tags: ['Repeat Client', 'Bangalore'],
    },
     {
      id: 5,
      name: 'Anjali Mehta',
      email: 'anjali.mehta@email.com',
      company: 'Innovate LLC',
      status: 'hot_lead',
      category: 'investor',
      tags: ['High Value', 'Pune'],
    }
];

export const searchLeads = ai.defineTool(
  {
    name: 'searchLeads',
    description: 'Searches for leads/contacts in the CRM based on various filter criteria.',
    inputSchema: z.object({
      filters: z.object({
        status: z.string().optional().describe("Filter by lead status (e.g., 'hot_lead', 'warm_lead', 'client')"),
        category: z.string().optional().describe("Filter by contact category (e.g., 'buyer', 'seller', 'investor')"),
        tags: z.array(z.string()).optional().describe("Filter by tags associated with the contact"),
        location: z.string().optional().describe("Filter by the contact's location/city (e.g. 'Mumbai', 'Pune')"),
      }),
      limit: z.number().optional().describe('Limit the number of results.'),
    }),
    outputSchema: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        email: z.string(),
        company: z.string(),
        status: z.string(),
        category: z.string(),
        tags: z.array(z.string()),
      })
    ),
  },
  async ({ filters, limit }) => {
    let results = mockContacts;

    if (filters.status) {
      results = results.filter(c => c.status === filters.status);
    }
    if (filters.category) {
      results = results.filter(c => c.category === filters.category);
    }
     if (filters.location) {
      results = results.filter(c => c.tags.some(tag => tag.toLowerCase() === filters.location?.toLowerCase()));
    }
    if (filters.tags && filters.tags.length > 0) {
      results = results.filter(c => filters.tags?.every(tag => c.tags.includes(tag)));
    }

    if (limit) {
      return results.slice(0, limit);
    }

    return results;
  }
);
