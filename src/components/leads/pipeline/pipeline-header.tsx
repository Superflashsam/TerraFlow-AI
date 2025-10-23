
"use client";
import React, { useState } from 'react';
import { Target, List, Grid, Calendar, Search, Settings, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export const PipelineHeader = ({ viewMode, onViewModeChange, onFiltersChange, totalLeads }: { viewMode: string, onViewModeChange: (mode: string) => void, onFiltersChange: (filters: any) => void, totalLeads: number }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFiltersChange?.({ search: value, assignee: assigneeFilter, source: sourceFilter, priority: priorityFilter });
  };

  const handleFilterChange = (filter: string, value: string) => {
    let newFilters = { search: searchTerm, assignee: assigneeFilter, source: sourceFilter, priority: priorityFilter };
    if (filter === 'assignee') {
        setAssigneeFilter(value);
        newFilters.assignee = value;
    }
    if (filter === 'source') {
        setSourceFilter(value);
        newFilters.source = value;
    }
    if (filter === 'priority') {
        setPriorityFilter(value);
        newFilters.priority = value;
    }
    onFiltersChange?.(newFilters);
  };

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
    <div className="bg-card border-b border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
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

        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
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

          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search leads, companies..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-4"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={assigneeFilter} onValueChange={(v) => handleFilterChange('assignee', v)}>
                <SelectTrigger className="w-full sm:w-40"><SelectValue/></SelectTrigger>
                <SelectContent>
                    {assigneeOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={(v) => handleFilterChange('source', v)}>
                <SelectTrigger className="w-full sm:w-32"><SelectValue/></SelectTrigger>
                <SelectContent>
                    {sourceOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={(v) => handleFilterChange('priority', v)}>
                <SelectTrigger className="w-full sm:w-32"><SelectValue/></SelectTrigger>
                <SelectContent>
                    {priorityOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                </SelectContent>
            </Select>
          </div>

          <Button variant="outline"><Settings className="mr-2"/>Manage Stages</Button>
          <Button><Plus className="mr-2"/>Add Lead</Button>
        </div>
      </div>
    </div>
  );
};
