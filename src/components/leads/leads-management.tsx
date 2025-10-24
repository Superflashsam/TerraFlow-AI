
"use client";

import React, { useState, useEffect } from 'react';
import {
  RefreshCw,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LeadFilters } from '@/components/leads/lead-filters';
import { LeadTable } from '@/components/leads/leads-table';
import { BulkActionsDropdown } from '@/components/leads/bulk-actions-dropdown';

// TypeScript Interfaces
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  propertyInterest: string;
  location: string;
  aiScore: number;
  status: string;
  lastContact: string;
  budget: string;
  notes: string;
}

interface FilterState {
  source: string;
  scoreRange: string;
  propertyType: string;
  location: string;
  status: string;
  dateRange: string;
  searchQuery: string;
}

// Mock data moved to separate constant
const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Michael Rodriguez',
    email: 'michael.rodriguez@email.com',
    phone: '+1 (555) 123-4567',
    source: 'Website',
    propertyInterest: 'apartment',
    location: 'downtown',
    aiScore: 92,
    status: 'qualified',
    lastContact: '2025-01-26T10:30:00Z',
    budget: '$500K - $750K',
    notes: 'Interested in 2-bedroom apartment with city view',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1 (555) 234-5678',
    source: 'Referral',
    propertyInterest: 'villa',
    location: 'jumeirah',
    aiScore: 87,
    status: 'proposal_sent',
    lastContact: '2025-01-25T14:15:00Z',
    budget: '$1.2M - $1.8M',
    notes: 'Looking for luxury villa with pool and garden',
  },
  {
    id: '3',
    name: 'David Thompson',
    email: 'david.thompson@email.com',
    phone: '+1 (555) 345-6789',
    source: 'Social Media',
    propertyInterest: 'townhouse',
    location: 'dubai_hills',
    aiScore: 74,
    status: 'contacted',
    lastContact: '2025-01-24T09:45:00Z',
    budget: '$800K - $1.2M',
    notes: 'First-time buyer, needs financing assistance',
  },
  {
    id: '4',
    name: 'Emily Johnson',
    email: 'emily.johnson@email.com',
    phone: '+1 (555) 456-7890',
    source: 'Property Portal',
    propertyInterest: 'penthouse',
    location: 'marina',
    aiScore: 95,
    status: 'negotiation',
    lastContact: '2025-01-26T16:20:00Z',
    budget: '$2M+',
    notes: 'High-net-worth client, ready to close quickly',
  },
  {
    id: '5',
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    phone: '+1 (555) 567-8901',
    source: 'Cold Call',
    propertyInterest: 'studio',
    location: 'business_bay',
    aiScore: 45,
    status: 'new',
    lastContact: '2025-01-23T11:30:00Z',
    budget: '$300K - $450K',
    notes: 'Investment property for rental income',
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@email.com',
    phone: '+1 (555) 678-9012',
    source: 'Email Campaign',
    propertyInterest: 'commercial',
    location: 'downtown',
    aiScore: 68,
    status: 'qualified',
    lastContact: '2025-01-25T13:10:00Z',
    budget: '$1.5M - $3M',
    notes: 'Looking for office space for expanding business',
  },
  {
    id: '7',
    name: 'Robert Kim',
    email: 'robert.kim@email.com',
    phone: '+1 (555) 789-0123',
    source: 'Walk-in',
    propertyInterest: 'apartment',
    location: 'palm_jumeirah',
    aiScore: 81,
    status: 'closed_won',
    lastContact: '2025-01-22T15:45:00Z',
    budget: '$900K - $1.3M',
    notes: 'Successfully closed - beachfront apartment',
  },
  {
    id: '8',
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '+1 (555) 890-1234',
    source: 'Referral',
    propertyInterest: 'villa',
    location: 'arabian_ranches',
    aiScore: 29,
    status: 'closed_lost',
    lastContact: '2025-01-20T10:15:00Z',
    budget: '$1M - $1.5M',
    notes: 'Lost to competitor - pricing concerns',
  },
];

export const LeadsManagement = () => {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    source: '',
    scoreRange: '',
    propertyType: '',
    location: '',
    status: '',
    dateRange: '',
    searchQuery: '',
  });

  // Simulate data fetching
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setLeads(MOCK_LEADS);
      } catch (err) {
        setError('Failed to load leads. Please try again.');
        console.error('Error fetching leads:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      source: '',
      scoreRange: '',
      propertyType: '',
      location: '',
      status: '',
      dateRange: '',
      searchQuery: '',
    });
  };

  const handleSelectionChange = (newSelection: string[]) => {
    setSelectedLeads(newSelection);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // Simulate refresh
      await new Promise(resolve => setTimeout(resolve, 500));
      setLeads([...MOCK_LEADS]);
    } catch (err) {
      setError('Failed to refresh leads.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedLeads.length === 0) return;
    // Placeholder for bulk action logic
    console.log(`Performing bulk action: ${action} on leads:`, selectedLeads);
  };

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={handleRefresh}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Left Sidebar - Filters */}
      <aside className="w-80 flex-shrink-0 border-r border-border overflow-y-auto">
        <LeadFilters
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
        />
      </aside>

      {/* Right Content Area - Table */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              All Leads ({isLoading ? '...' : leads.length})
            </h2>
            
            <div className="flex items-center gap-3">
              <BulkActionsDropdown
                selectedCount={selectedLeads.length}
                onAction={handleBulkAction}
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Columns
              </Button>
            </div>
          </div>
        </div>
        
        {/* Table */}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading leads...</p>
            </div>
          </div>
        ) : (
          <LeadTable
            leads={leads}
            selectedLeads={selectedLeads}
            onSelectionChange={handleSelectionChange}
            filters={filters}
          />
        )}
      </div>
    </div>
  );
};
