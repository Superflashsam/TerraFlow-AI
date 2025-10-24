
"use client";

import React, { useState, useEffect } from 'react';
import {
  RefreshCw,
  Settings,
  Flame,
  CheckCircle,
  Trophy,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LeadTable } from '@/components/leads/leads-table';
import { Card, CardContent } from '@/components/ui/card';

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

const MOCK_LEADS: Lead[] = [
    { id: '4', name: 'Emily Johnson', email: 'emily.johnson@email.com', phone: '+1 (555) 456-7890', source: 'property_portal', propertyInterest: 'Penthouse', location: 'marina', aiScore: 95, status: 'negotiation', lastContact: '2025-01-26T16:20:00Z', budget: '$2M+', notes: 'High-net-worth client, ready to close quickly' },
    { id: '1', name: 'Michael Rodriguez', email: 'michael.rodriguez@email.com', phone: '+1 (555) 123-4567', source: 'website', propertyInterest: 'Apartment', location: 'downtown', aiScore: 92, status: 'qualified', lastContact: '2025-01-26T10:30:00Z', budget: '$500K - $750K', notes: 'Interested in 2-bedroom apartment with city view' },
    { id: '9', name: 'Thomas Brown', email: 'thomas.brown@email.com', phone: '+1 (555) 901-2345', source: 'website', propertyInterest: 'Townhouse', location: 'dubai_hills', aiScore: 76, status: 'contacted', lastContact: '2025-01-26T09:00:00Z', budget: '$1M - $1.4M', notes: 'Interested in gated communities' },
    { id: '10', name: 'Jennifer Lee', email: 'jennifer.lee@email.com', phone: '+1 (555) 012-3456', source: 'social_media', propertyInterest: 'Apartment', location: 'marina', aiScore: 88, status: 'proposal_sent', lastContact: '2025-01-25T11:00:00Z', budget: '$1.1M', notes: 'Wants a sea view' },
    { id: '2', name: 'Sarah Chen', email: 'sarah.chen@email.com', phone: '+1 (555) 234-5678', source: 'referral', propertyInterest: 'Villa', location: 'jumeirah', aiScore: 87, status: 'proposal_sent', lastContact: '2025-01-25T14:15:00Z', budget: '$1.2M - $1.8M', notes: 'Looking for luxury villa with pool and garden' },
    { id: '6', name: 'Lisa Anderson', email: 'lisa.anderson@email.com', phone: '+1 (555) 678-9012', source: 'email_campaign', propertyInterest: 'Commercial', location: 'downtown', aiScore: 68, status: 'qualified', lastContact: '2025-01-25T13:10:00Z', budget: '$1.5M - $3M', notes: 'Looking for office space for expanding business' },
    { id: '3', name: 'David Thompson', email: 'david.thompson@email.com', phone: '+1 (555) 345-6789', source: 'social_media', propertyInterest: 'Townhouse', location: 'dubai_hills', aiScore: 74, status: 'contacted', lastContact: '2025-01-24T09:45:00Z', budget: '$800K - $1.2M', notes: 'First-time buyer, needs financing assistance' },
    { id: '5', name: 'James Wilson', email: 'james.wilson@email.com', phone: '+1 (555) 567-8901', source: 'cold_call', propertyInterest: 'Studio', location: 'business_bay', aiScore: 45, status: 'new', lastContact: '2025-01-23T11:30:00Z', budget: '$300K - $450K', notes: 'Investment property for rental income' },
    { id: '7', name: 'Robert Kim', email: 'robert.kim@email.com', phone: '+1 (555) 789-0123', source: 'walk_in', propertyInterest: 'Apartment', location: 'palm_jumeirah', aiScore: 81, status: 'closed_won', lastContact: '2025-01-22T15:45:00Z', budget: '$900K - $1.3M', notes: 'Successfully closed - beachfront apartment' },
    { id: '8', name: 'Maria Garcia', email: 'maria.garcia@email.com', phone: '+1 (555) 890-1234', source: 'referral', propertyInterest: 'Villa', location: 'arabian_ranches', aiScore: 29, status: 'closed_lost', lastContact: '2025-01-20T10:15:00Z', budget: '$1M - $1.5M', notes: 'Lost to competitor - pricing concerns' },
];

const KPICard = ({ title, value, change, icon: Icon, changeType = 'positive' }: { title: string, value: string, change: string, icon: React.ElementType, changeType?: 'positive' | 'negative' }) => (
    <Card>
        <CardContent className="p-4">
            <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{title}</span>
                <Icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold mt-2">{value}</div>
            <div className={`text-xs mt-1 ${changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>{change}</div>
        </CardContent>
    </Card>
);

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

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setIsLoading(true);
        setError(null);
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

  const handleClearFilters = () => {
    setFilters({ source: '', scoreRange: '', propertyType: '', location: '', status: '', dateRange: '', searchQuery: '' });
  };

  const handleSelectionChange = (newSelection: string[]) => {
    setSelectedLeads(newSelection);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setLeads([...MOCK_LEADS]);
    } catch (err) {
      setError('Failed to refresh leads.');
    } finally {
      setIsLoading(false);
    }
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

  const kpiData = {
    totalLeads: leads.length,
    hotLeads: leads.filter(l => l.aiScore >= 90).length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    closedWon: leads.filter(l => l.status === 'closed_won').length,
  };

  return (
    <div className="flex flex-col flex-1 h-full gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard title="Total Leads" value={kpiData.totalLeads.toString()} change="+12% from last month" icon={Users} />
            <KPICard title="Hot Leads" value={kpiData.hotLeads.toString()} change="+8% from last week" icon={Flame} />
            <KPICard title="Qualified" value={kpiData.qualified.toString()} change="+15% conversion" icon={CheckCircle} />
            <KPICard title="Closed Won" value={kpiData.closedWon.toString()} change="$2.4M revenue" icon={Trophy} />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden bg-card border rounded-lg">
            <div className="flex-shrink-0 px-6 py-4 border-b border-border">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                        All Leads ({isLoading ? '...' : leads.length})
                    </h2>
                    <div className="flex items-center gap-3">
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
                    onClearFilters={handleClearFilters}
                />
            )}
        </div>
    </div>
  );
};
