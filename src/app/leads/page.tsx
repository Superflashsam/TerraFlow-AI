"use client";

import React, { useState } from 'react';
import {
  PlusCircle,
  Upload,
  Table as TableIcon,
  LayoutGrid,
  RefreshCw,
  Settings,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { LeadFilters } from '@/components/leads/lead-filters';
import { LeadTable } from '@/components/leads/leads-table';
import { BulkActionsDropdown } from '@/components/leads/bulk-actions-dropdown';

const LeadsManagementPage = () => {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    source: '',
    scoreRange: '',
    propertyType: '',
    location: '',
    status: '',
    dateRange: '',
    searchQuery: '',
  });
  const [viewMode, setViewMode] = useState('table'); // table or cards

  const mockLeads = [
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

  const handleFiltersChange = (newFilters: any) => {
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

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} for leads:`, selectedLeads);
    // Handle different bulk actions
    switch (action) {
      case 'email_campaign':
        console.log('Opening email campaign modal...');
        break;
      case 'update_status':
        console.log('Opening status update modal...');
        break;
      case 'assign_team':
        console.log('Opening team assignment modal...');
        break;
      case 'export':
        console.log('Exporting selected leads...');
        break;
      case 'delete':
        console.log('Confirming deletion of selected leads...');
        break;
      default:
        console.log(`Handling ${action} for selected leads`);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Leads Management"
        description="Track, manage, and convert your real estate leads with AI-powered insights"
      >
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <TableIcon className="mr-2" />
              Table
            </Button>
            <Button
              variant={viewMode === 'cards' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('cards')}
            >
              <LayoutGrid className="mr-2" />
              Cards
            </Button>
          </div>

          <Button variant="outline">
            <Upload />
            Export
          </Button>

          <Button>
            <PlusCircle />
            Add New Lead
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <LeadFilters
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <h2 className="text-lg font-semibold text-foreground">
                  All Leads ({mockLeads.length})
                </h2>
                {selectedLeads.length > 0 && (
                  <BulkActionsDropdown
                    selectedCount={selectedLeads.length}
                    onAction={handleBulkAction}
                  />
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="mr-2" />
                  Columns
                </Button>
              </div>
            </div>

            <LeadTable
              leads={mockLeads}
              selectedLeads={selectedLeads}
              onSelectionChange={handleSelectionChange}
              filters={filters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsManagementPage;