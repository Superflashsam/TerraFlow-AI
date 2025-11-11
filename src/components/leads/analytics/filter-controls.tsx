
"use client";
import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Download, RefreshCw, Save, Settings, Share, X, Clock, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export const FilterControls = ({ onFiltersChange }: { onFiltersChange: (filters: any) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: '30days',
    compare: false,
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
    { value: 'thisMonth', label: 'This Month'},
    { value: 'custom', label: 'Custom Range' }
  ];

  const leadSourceOptions = [
    { value: 'google-ads', label: 'Google Ads' },
    { value: 'facebook-ads', label: 'Facebook Ads' },
    { value: 'website', label: 'Website Organic' },
    { value: 'referrals', label: 'Referrals' },
  ];

  const agentOptions = [
    { value: 'rajesh-kumar', label: 'Rajesh Kumar' },
    { value: 'priya-sharma', label: 'Priya Sharma' },
    { value: 'amit-patel', label: 'Amit Patel' },
  ];

  const leadScoreOptions = [
    { value: 'all', label: 'All Scores' },
    { value: 'hot', label: 'Hot Leads (80-100)' },
    { value: 'warm', label: 'Warm Leads (60-79)' },
    { value: 'cold', label: 'Cold Leads (0-59)' },
  ];

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      dateRange: '30days',
      compare: false,
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
    if (filters.compare) count++;
    return count;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <Select value={filters.dateRange} onValueChange={(v) => handleFilterChange('dateRange', v)}>
                <SelectTrigger className="w-[180px]"><SelectValue/></SelectTrigger>
                <SelectContent>
                    {dateRangeOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
                <Switch id="compare-mode" checked={filters.compare} onCheckedChange={(v) => handleFilterChange('compare', v)} />
                <Label htmlFor="compare-mode">Compare to previous period</Label>
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="relative"
            >
                <Filter className="mr-2 h-4 w-4"/>
                More Filters
                {getActiveFilterCount() > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                        {getActiveFilterCount()}
                    </span>
                )}
            </Button>
        </div>
        <div className="flex items-center space-x-2">
            <Button variant="outline"><Download className="mr-2 h-4 w-4"/>Export Report</Button>
        </div>
      </div>
      {isExpanded && (
        <div className="border-t border-border pt-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
                <Label>Lead Sources</Label>
                <Select>
                    <SelectTrigger><SelectValue placeholder="Select sources..."/></SelectTrigger>
                    <SelectContent>
                        {leadSourceOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label>Agents</Label>
                <Select>
                    <SelectTrigger><SelectValue placeholder="Select agents..."/></SelectTrigger>
                    <SelectContent>
                        {agentOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label>Lead Score</Label>
                <Select value={filters.leadScore} onValueChange={(v) => handleFilterChange('leadScore', v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {leadScoreOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
          </div>
           <div className="flex justify-end mt-4">
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>Clear All Filters</Button>
            </div>
        </div>
      )}
    </div>
  );
};
