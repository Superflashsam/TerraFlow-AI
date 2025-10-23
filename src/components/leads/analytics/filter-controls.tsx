
"use client";
import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Download, RefreshCw, Save, Settings, Share, X, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export const FilterControls = ({ onFiltersChange }: { onFiltersChange: (filters: any) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: '30days',
    leadSources: [],
    agents: [],
    funnelStages: [],
    leadScore: 'all'
  });
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
        setLastUpdated(new Date().toLocaleTimeString());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const dateRangeOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const leadSourceOptions = [
    { value: 'google-ads', label: 'Google Ads' },
    { value: 'facebook-ads', label: 'Facebook Ads' },
    { value: 'website', label: 'Website Organic' },
    { value: 'referrals', label: 'Referrals' },
    { value: 'email', label: 'Email Campaign' },
    { value: 'linkedin', label: 'LinkedIn Ads' }
  ];

  const agentOptions = [
    { value: 'rajesh-kumar', label: 'Rajesh Kumar' },
    { value: 'priya-sharma', label: 'Priya Sharma' },
    { value: 'amit-patel', label: 'Amit Patel' },
    { value: 'sneha-gupta', label: 'Sneha Gupta' },
    { value: 'vikram-singh', label: 'Vikram Singh' }
  ];

  const funnelStageOptions = [
    { value: 'leads-generated', label: 'Leads Generated' },
    { value: 'qualified-leads', label: 'Qualified Leads' },
    { value: 'appointments-set', label: 'Appointments Set' },
    { value: 'property-visits', label: 'Property Visits' },
    { value: 'offers-made', label: 'Offers Made' },
    { value: 'deals-closed', label: 'Deals Closed' }
  ];

  const leadScoreOptions = [
    { value: 'all', label: 'All Scores' },
    { value: 'hot', label: 'Hot Leads (80-100)' },
    { value: 'warm', label: 'Warm Leads (60-79)' },
    { value: 'cold', label: 'Cold Leads (40-59)' },
    { value: 'poor', label: 'Poor Leads (0-39)' }
  ];

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      dateRange: '30days',
      leadSources: [],
      agents: [],
      funnelStages: [],
      leadScore: 'all'
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.leadSources.length > 0) count++;
    if (filters.agents.length > 0) count++;
    if (filters.funnelStages.length > 0) count++;
    if (filters.leadScore !== 'all') count++;
    return count;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-foreground">Filters & Controls</h3>
          {getActiveFilterCount() > 0 && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              {getActiveFilterCount()} active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
          >
            <X className="mr-2"/>
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Less' : 'More'} Filters
            {isExpanded ? <ChevronUp className="ml-2"/> : <ChevronDown className="ml-2"/>}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select value={filters.dateRange} onValueChange={(v) => handleFilterChange('dateRange', v)}>
            <SelectTrigger><SelectValue/></SelectTrigger>
            <SelectContent>
                {dateRangeOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
        </Select>
         <Select value={filters.leadScore} onValueChange={(v) => handleFilterChange('leadScore', v)}>
            <SelectTrigger><SelectValue placeholder="All Scores"/></SelectTrigger>
            <SelectContent>
                {leadScoreOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
        </Select>
         <Select>
            <SelectTrigger><SelectValue placeholder="Select sources..."/></SelectTrigger>
            <SelectContent>
                {leadSourceOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
        </Select>
         <Select>
            <SelectTrigger><SelectValue placeholder="Select agents..."/></SelectTrigger>
            <SelectContent>
                {agentOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
        </Select>
      </div>
      {isExpanded && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             <Select>
                <SelectTrigger><SelectValue placeholder="Select stages..."/></SelectTrigger>
                <SelectContent>
                    {funnelStageOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                </SelectContent>
            </Select>

            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm"><Download className="mr-2"/>Export Data</Button>
                <Button variant="outline" size="sm"><RefreshCw className="mr-2"/>Refresh</Button>
                <Button variant="outline" size="sm"><Settings className="mr-2"/>Configure</Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock size={16} />
            <span>Last updated: {lastUpdated}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live data</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm"><Save className="mr-2"/>Save View</Button>
          <Button variant="default" size="sm"><Share className="mr-2"/>Share Dashboard</Button>
        </div>
      </div>
    </div>
  );
};
