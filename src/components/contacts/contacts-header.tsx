
"use client";

import React, { useState } from 'react';
import AppIcon from './app-icon';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export const ContactsHeader = ({ selectedCount, totalCount, onFiltersChange, onBulkActions }: { selectedCount: number, totalCount: number, onFiltersChange: (filters: any) => void, onBulkActions: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onFiltersChange?.({
      search: value,
      status: statusFilter,
      category: categoryFilter
    });
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    onFiltersChange?.({
      search: searchTerm,
      status: value,
      category: categoryFilter
    });
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    onFiltersChange?.({
      search: searchTerm,
      status: statusFilter,
      category: value
    });
  };

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'hot_lead', label: 'Hot Lead' },
    { value: 'warm_lead', label: 'Warm Lead' },
    { value: 'cold_lead', label: 'Cold Lead' },
    { value: 'client', label: 'Active Client' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'buyer', label: 'Buyer' },
    { value: 'seller', label: 'Seller' },
    { value: 'investor', label: 'Investor' },
    { value: 'tenant', label: 'Tenant' },
    { value: 'landlord', label: 'Landlord' }
  ];

  return (
    <div className="bg-card border-b border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Title and Count */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-lg">
            <AppIcon name="Users" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">CRM Contacts Hub</h1>
            <p className="text-sm text-muted-foreground">
              {selectedCount > 0 ? (
                `${selectedCount} of ${totalCount} contacts selected`
              ) : (
                `${totalCount} total contacts`
              )}
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AppIcon name="Search" size={16} className="text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Search contacts, companies..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-4"
            />
          </div>

          {/* Status Filter */}
          <Select
            value={statusFilter}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
                {statusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select
            value={categoryFilter}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="w-full sm:w-40">
             <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
                {categoryOptions.map(option => (
                     <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
            </SelectContent>
          </Select>

          {/* Bulk Actions Button */}
          {selectedCount > 0 && (
            <Button
              variant="secondary"
              onClick={onBulkActions}
              className="flex items-center space-x-2"
            >
              <AppIcon name="Settings" size={16} />
              <span>Bulk Actions</span>
            </Button>
          )}

          {/* Add Contact Button */}
          <Button
            className="flex items-center space-x-2"
          >
            <AppIcon name="Plus" size={16} />
            <span>Add Contact</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
