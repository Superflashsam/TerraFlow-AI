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

  const [isExpanded, setIsExpanded] = useState(true);

  const leadSources = [
    { value: 'Website', label: 'Website' },
    { value: 'Referral', label: 'Referral' },
    { value: 'Social Media', label: 'Social Media' },
    { value: 'Cold Call', label: 'Cold Call' },
    { value: 'Email Campaign', label: 'Email Campaign' },
    { value: 'Property Portal', label: 'Property Portal' },
    { value: 'Walk-in', label: 'Walk-in' },
  ];

  const scoreRanges = [
    { value: '90-100', label: 'Hot (90-100)' },
    { value: '70-89', label: 'Warm (70-89)' },
    { value: '50-69', label: 'Moderate (50-69)' },
    { value: '30-49', label: 'Cool (30-49)' },
    { value: '0-29', label: 'Cold (0-29)' },
  ];

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'studio', label: 'Studio' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'land', label: 'Land' },
  ];

  const locations = [
    { value: 'downtown', label: 'Downtown' },
    { value: 'marina', label: 'Marina District' },
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
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last_7_days', label: 'Last 7 days' },
    { value: 'last_30_days', label: 'Last 30 days' },
    { value: 'last_90_days', label: 'Last 90 days' },
    { value: 'this_month', label: 'This month' },
    { value: 'last_month', label: 'Last month' },
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

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter((value) => value !== '').length;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-muted-foreground" />
          <h3 className="font-medium text-foreground">Filters</h3>
          {getActiveFiltersCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFiltersCount()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {getActiveFiltersCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-4">
          <div>
            <Input
              type="search"
              placeholder="Search leads..."
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className="w-full"
            />
          </div>

          <Select
            onValueChange={(value) => handleFilterChange('source', value)}
            value={filters.source}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Sources" />
            </SelectTrigger>
            <SelectContent>
              {leadSources.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            onValueChange={(value) => handleFilterChange('scoreRange', value)}
            value={filters.scoreRange}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Scores" />
            </SelectTrigger>
            <SelectContent>
              {scoreRanges.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleFilterChange('propertyType', value)}
            value={filters.propertyType}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Property Types" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleFilterChange('location', value)}
            value={filters.location}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((l) => (
                <SelectItem key={l.value} value={l.value}>
                  {l.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            onValueChange={(value) => handleFilterChange('status', value)}
            value={filters.status}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleFilterChange('dateRange', value)}
            value={filters.dateRange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any Time" />
            </SelectTrigger>
            <SelectContent>
              {dateRanges.map((d) => (
                <SelectItem key={d.value} value={d.value}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

        </div>
      )}
    </div>
  );
};

export { LeadFilters };