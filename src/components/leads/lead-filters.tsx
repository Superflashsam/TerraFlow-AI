
"use client";

import React, { useState } from 'react';
import { Filter, ChevronUp, ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const LeadFilters = ({
  onFiltersChange,
  onClearFilters,
}: {
  onFiltersChange: (filters: any) => void;
  onClearFilters: () => void;
}) => {
  const [filters, setFilters] = useState({
    source: '',
    scoreRange: '',
    propertyType: '',
    location: '',
    status: '',
    dateRange: '',
    searchQuery: '',
  });


  const leadSources = [
    { value: 'website', label: 'Website' },
    { value: 'referral', label: 'Referral' },
    { value: 'social_media', label: 'Social Media' },
    { value: 'cold_call', label: 'Cold Call' },
    { value: 'email_campaign', label: 'Email Campaign' },
    { value: 'property_portal', label: 'Property Portal' },
    { value: 'walk_in', label: 'Walk-in' },
  ];

  const scoreRanges = [
    { value: '90-100', label: 'Hot (90-100)' },
    { value: '70-89', label: 'Warm (70-89)' },
    { value: '50-69', label: 'Moderate (50-69)' },
    { value: '30-49', label: 'Cool (30-49)' },
    { value: '0-29', label: 'Cold (0-29)' },
  ];

  const propertyTypes = [
    { value: 'Apartment', label: 'Apartment' },
    { value: 'Villa', label: 'Villa' },
    { value: 'Townhouse', label: 'Townhouse' },
    { value: 'Penthouse', label: 'Penthouse' },
    { value: 'Studio', label: 'Studio' },
    { value: 'Commercial', label: 'Commercial' },
    { value: 'Land', label: 'Land' },
  ];

  const locations = [
    { value: 'downtown', label: 'Downtown' },
    { value: 'marina', label: 'Marina' },
    { value: 'business_bay', label: 'Business Bay' },
    { value: 'jumeirah', label: 'Jumeirah' },
    { value: 'dubai_hills', label: 'Dubai Hills' },
    { value: 'palm_jumeirah', label: 'Palm Jumeirah' },
    { value: 'arabian_ranches', label: 'Arabian Ranches' },
  ];

  const statuses = [
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'proposal_sent', label: 'Proposal Sent' },
    { value: 'negotiation', label: 'Negotiation' },
    { value: 'closed_won', label: 'Closed Won' },
    { value: 'closed_lost', label: 'Closed Lost' },
  ];

  const dateRanges = [
    { value: 'any_time', label: 'Any Time' },
    { value: 'today', label: 'Today' },
    { value: 'last_7_days', label: 'Last 7 days' },
    { value: 'last_30_days', label: 'Last 30 days' },
    { value: 'last_90_days', label: 'Last 90 days' },
  ];

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };
  
  const handleClearAll = () => {
    const clearedFilters = {
      source: '',
      scoreRange: '',
      propertyType: '',
      location: '',
      status: '',
      dateRange: '',
      searchQuery: '',
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const FilterSection = ({ title, defaultOpen = false, children }: { title: string, defaultOpen?: boolean, children: React.ReactNode }) => (
    <AccordionItem value={title}>
        <AccordionTrigger className="text-sm font-semibold px-4 py-2 hover:no-underline">{title}</AccordionTrigger>
        <AccordionContent className="px-4">
            {children}
        </AccordionContent>
    </AccordionItem>
  );

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Filter size={16} className="text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Filters</h3>
        </div>
        <ChevronUp size={16} />
      </div>

      <div className="p-4 border-b border-border">
          <Input
              type="search"
              placeholder="Search leads by name, email, or phone..."
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className="w-full text-xs"
            />
      </div>

      <Accordion type="multiple" defaultValue={["Lead Source", "AI Lead Score", "Property Type", "Location", "Status", "Last Contact"]} className="w-full overflow-y-auto flex-1">
        <FilterSection title="Lead Source">
            <Select onValueChange={(value) => handleFilterChange('source', value)} value={filters.source}>
                <SelectTrigger className="text-xs"><SelectValue placeholder="All sources" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="">All sources</SelectItem>
                    {leadSources.map((s) => (<SelectItem key={s.value} value={s.value} className="text-xs">{s.label}</SelectItem>))}
                </SelectContent>
            </Select>
        </FilterSection>

        <FilterSection title="AI Lead Score">
            <Select onValueChange={(value) => handleFilterChange('scoreRange', value)} value={filters.scoreRange}>
                <SelectTrigger className="text-xs"><SelectValue placeholder="All scores" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="">All scores</SelectItem>
                    {scoreRanges.map((s) => (<SelectItem key={s.value} value={s.value} className="text-xs">{s.label}</SelectItem>))}
                </SelectContent>
            </Select>
        </FilterSection>

         <FilterSection title="Property Type">
            <Select onValueChange={(value) => handleFilterChange('propertyType', value)} value={filters.propertyType}>
                <SelectTrigger className="text-xs"><SelectValue placeholder="All types" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="">All types</SelectItem>
                    {propertyTypes.map((p) => (<SelectItem key={p.value} value={p.value} className="text-xs">{p.label}</SelectItem>))}
                </SelectContent>
            </Select>
        </FilterSection>

        <FilterSection title="Location">
            <Select onValueChange={(value) => handleFilterChange('location', value)} value={filters.location}>
                <SelectTrigger className="text-xs"><SelectValue placeholder="All locations" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="">All locations</SelectItem>
                    {locations.map((l) => (<SelectItem key={l.value} value={l.value} className="text-xs">{l.label}</SelectItem>))}
                </SelectContent>
            </Select>
        </FilterSection>
        
        <FilterSection title="Status">
            <Select onValueChange={(value) => handleFilterChange('status', value)} value={filters.status}>
                <SelectTrigger className="text-xs"><SelectValue placeholder="All statuses" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="">All statuses</SelectItem>
                    {statuses.map((s) => (<SelectItem key={s.value} value={s.value} className="text-xs">{s.label}</SelectItem>))}
                </SelectContent>
            </Select>
        </FilterSection>

        <FilterSection title="Last Contact">
            <Select onValueChange={(value) => handleFilterChange('dateRange', value)} value={filters.dateRange}>
                <SelectTrigger className="text-xs"><SelectValue placeholder="Any time" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="">Any time</SelectItem>
                    {dateRanges.map((d) => (<SelectItem key={d.value} value={d.value} className="text-xs">{d.label}</SelectItem>))}
                </SelectContent>
            </Select>
        </FilterSection>
      </Accordion>
    </div>
  );
};

export { LeadFilters };
