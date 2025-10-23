"use client";
import React, { useState } from 'react';
import { Target, List, Grid, Calendar, Search, Settings, Plus, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const PipelineHeader = ({ viewMode, onViewModeChange, onFiltersChange, totalLeads }: { viewMode: string, onViewModeChange: (mode: string) => void, onFiltersChange: (filters: any) => void, totalLeads: number }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    assignee: 'all',
    source: 'all',
    priority: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.({ search: searchTerm, ...newFilters });
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFiltersChange?.({ search: value, ...filters });
  };

  const clearFilters = () => {
    const cleared = { assignee: 'all', source: 'all', priority: 'all' };
    setFilters(cleared);
    setSearchTerm('');
    onFiltersChange?.({ search: '', ...cleared });
    setShowFilters(false);
  }

  const activeFiltersCount = Object.values(filters).filter(v => v !== 'all').length + (searchTerm ? 1 : 0);

  const viewOptions = [
    { value: 'board', label: 'Board View', icon: Grid },
    { value: 'list', label: 'List View', icon: List },
    { value: 'calendar', label: 'Calendar View', icon: Calendar }
  ];

  const assigneeOptions = [
    { value: 'all', label: 'All Assignees' },
    { value: 'Priya Sharma', label: 'Priya Sharma' },
    { value: 'Rajesh Kumar', label: 'Rajesh Kumar' },
    { value: 'Amit Patel', label: 'Amit Patel' },
    { value: 'Sunita Reddy', label: 'Sunita Reddy' }
  ];

  const sourceOptions = [
    { value: 'all', label: 'All Sources' },
    { value: 'Website', label: 'Website' },
    { value: 'Referral', label: 'Referral' },
    { value: 'LinkedIn', label: 'LinkedIn' },
    { value: 'Google Ads', label: 'Google Ads' },
    { value: 'Facebook', label: 'Facebook' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  return (
    <div className="bg-card border-b border-border p-6 flex-shrink-0">
      <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-lg">
                <Target size={20} />
            </div>
            <div>
                <h1 className="text-xl font-semibold text-foreground">Lead Pipeline Manager</h1>
                <p className="text-sm text-muted-foreground">
                {totalLeads} active leads in pipeline
                </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-muted rounded-lg p-1">
                {viewOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                        <Button
                            key={option.value}
                            variant={viewMode === option.value ? "default" : "ghost"}
                            size="sm"
                            onClick={() => onViewModeChange(option.value)}
                            className="flex items-center space-x-2"
                            title={option.label}
                        >
                            <Icon size={16} />
                            <span className="hidden sm:inline">{option.label}</span>
                        </Button>
                    )
                })}
            </div>
            <div className="relative w-full lg:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search leads, companies..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-10 pr-4"
                />
            </div>

            <DropdownMenu onOpenChange={setShowFilters} open={showFilters}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">{activeFiltersCount}</span>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Assignee</label>
                      <Select value={filters.assignee} onValueChange={(v) => handleFilterChange('assignee', v)}>
                          <SelectTrigger><SelectValue/></SelectTrigger>
                          <SelectContent>
                              {assigneeOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                          </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Source</label>
                      <Select value={filters.source} onValueChange={(v) => handleFilterChange('source', v)}>
                          <SelectTrigger><SelectValue/></SelectTrigger>
                          <SelectContent>
                              {sourceOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                          </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Priority</label>
                      <Select value={filters.priority} onValueChange={(v) => handleFilterChange('priority', v)}>
                          <SelectTrigger><SelectValue/></SelectTrigger>
                          <SelectContent>
                              {priorityOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                          </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end pt-2">
                       <Button variant="ghost" size="sm" onClick={clearFilters}>Clear All</Button>
                    </div>
                  </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline"><Settings className="mr-2"/>Manage Stages</Button>
          </div>
      </div>
    </div>
  );
};
