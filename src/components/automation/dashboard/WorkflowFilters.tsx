"use client";
import React from 'react';
import AppIcon from '@/components/contacts/app-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const WorkflowFilters = ({ 
  searchQuery, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange, 
  sortBy, 
  onSortChange,
  viewMode,
  onViewModeChange 
}: {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    statusFilter: string;
    onStatusFilterChange: (value: string) => void;
    sortBy: string;
    onSortChange: (value: string) => void;
    viewMode: string;
    onViewModeChange: (value: string) => void;
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status', icon: 'Circle' },
    { value: 'active', label: 'Active', icon: 'Play' },
    { value: 'paused', label: 'Paused', icon: 'Pause' },
    { value: 'draft', label: 'Draft', icon: 'FileText' }
  ];

  const sortOptions = [
    { value: 'lastModified', label: 'Last Modified', icon: 'Clock' },
    { value: 'name', label: 'Name', icon: 'Hash' },
    { value: 'executions', label: 'Most Runs', icon: 'TrendingUp' },
    { value: 'created', label: 'Date Created', icon: 'Calendar' }
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
      {/* Left Section - Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 flex-1">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search workflows..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
          <AppIcon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          {statusOptions.map((option) => (
            <Button
              key={option.value}
              variant={statusFilter === option.value ? 'default' : 'outline'}
              size="sm"
              iconName={option.icon}
              iconPosition="left"
              iconSize={16}
              onClick={() => onStatusFilterChange(option.value)}
              className="whitespace-nowrap"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Right Section - Sort and View Controls */}
      <div className="flex items-center space-x-3">
        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none bg-background border border-border rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <AppIcon 
            name="ChevronDown" 
            size={16} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center border border-border rounded-md p-1">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="sm"
            iconName="Grid"
            iconSize={16}
            onClick={() => onViewModeChange('grid')}
            className="w-8 h-8 p-0"
          />
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="sm"
            iconName="List"
            iconSize={16}
            onClick={() => onViewModeChange('list')}
            className="w-8 h-8 p-0"
          />
        </div>

        {/* Refresh Button */}
        <Button
          variant="outline"
          size="sm"
          iconName="RefreshCw"
          iconSize={16}
          className="text-muted-foreground hover:text-foreground"
        />
      </div>
    </div>
  );
};

export { WorkflowFilters };
