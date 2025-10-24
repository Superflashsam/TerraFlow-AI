"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, List, Grid, ArrowUpDown, Filter } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';

export const FilterHeader = ({ onFiltersChange, onCreateProperty, propertiesCount, selectedCount, viewMode, onViewModeChange }: { onFiltersChange: any, onCreateProperty: any, propertiesCount: number, selectedCount: number, viewMode: string, onViewModeChange: (mode: string) => void }) => {
  const [filters, setFilters] = useState({
    status: 'all',
    propertyType: 'all',
    priceRange: 'all',
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange((prev: any) => ({ ...prev, ...newFilters }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange((prev: any) => ({ ...prev, searchQuery: e.target.value }));
  };

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Under Contract' },
    { value: 'sold', label: 'Sold' }
  ];

  const propertyTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'plot', label: 'Plot' }
  ];

  const priceRangeOptions = [
    { value: 'all', label: 'All Prices' },
    { value: '0-50', label: 'Under ₹50L' },
    { value: '50-100', label: '₹50L - ₹1Cr' },
    { value: '100-200', label: '₹1Cr - ₹2Cr' },
    { value: '200+', label: 'Above ₹2Cr' }
  ];

  return (
    <div className="bg-card border-b border-border">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Property Listings</h1>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
              <span>{propertiesCount} properties</span>
              {selectedCount > 0 && (
                <span className="text-primary font-medium">
                  {selectedCount} selected
                </span>
              )}
            </div>
          </div>
          
          <Button onClick={onCreateProperty}>
            <Plus size={16} className="mr-2" />
            Add Property
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search properties, locations, or agents..."
                className="pl-10"
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                    <Filter size={16} />
                    <span>Filters</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-4 space-y-4">
                <DropdownMenuLabel>Filter Properties</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div>
                  <Label htmlFor="status-filter">Status</Label>
                  <Select onValueChange={(value) => handleFilterChange('status', value)} defaultValue="all">
                    <SelectTrigger id="status-filter"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {statusOptions.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type-filter">Property Type</Label>
                  <Select onValueChange={(value) => handleFilterChange('propertyType', value)} defaultValue="all">
                    <SelectTrigger id="type-filter"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {propertyTypeOptions.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                 <div>
                  <Label htmlFor="price-filter">Price Range</Label>
                  <Select onValueChange={(value) => handleFilterChange('priceRange', value)} defaultValue="all">
                    <SelectTrigger id="price-filter"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {priceRangeOptions.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center bg-muted rounded-lg p-1">
            <button 
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'text-primary bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Grid size={16} />
            </button>
            <button 
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'text-primary bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <List size={16} />
            </button>
          </div>

          <Button variant="outline" className="flex items-center space-x-2">
            <ArrowUpDown size={16} />
            <span>Sort</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
