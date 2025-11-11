
"use client";

import React from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/analytics/date-range-picker';

export const FilterBar = ({ filters, onFilterChange }: { filters: any, onFilterChange: (filters: any) => void; }) => {
    
    const handleValueChange = (key: string, value: any) => {
        onFilterChange((prev: any) => ({ ...prev, [key]: value }));
    };

    const handleSortChange = (value: string) => {
      const [key, direction] = value.split('-');
      onFilterChange((prev: any) => ({ ...prev, sort: {key, direction} }));
    }

    return (
        <div className="flex items-center gap-4 px-6 py-3 border-b border-border bg-card">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search documents..." 
                    className="pl-10 bg-background" 
                    value={filters.searchQuery}
                    onChange={(e) => handleValueChange('searchQuery', e.target.value)}
                />
            </div>
             <Select value={filters.fileType} onValueChange={(v) => handleValueChange('fileType', v)}>
                <SelectTrigger className="w-[180px] bg-background"><SelectValue placeholder="All Types"/></SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All File Types</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="docx">Word</SelectItem>
                    <SelectItem value="xlsx">Excel</SelectItem>
                    <SelectItem value="jpg">Image</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                </SelectContent>
            </Select>
            <DateRangePicker className="w-[300px]" />
             <Select value={filters.size} onValueChange={(v) => handleValueChange('size', v)}>
                <SelectTrigger className="w-[180px] bg-background"><SelectValue placeholder="Any Size"/></SelectTrigger>
                <SelectContent>
                    <SelectItem value="any">Any Size</SelectItem>
                    <SelectItem value="small">{'<1MB'}</SelectItem>
                    <SelectItem value="medium">1-10MB</SelectItem>
                    <SelectItem value="large">{'>10MB'}</SelectItem>
                </SelectContent>
            </Select>
             <Select value={`${filters.sort.key}-${filters.sort.direction}`} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px] bg-background"><SelectValue placeholder="Sort By"/></SelectTrigger>
                <SelectContent>
                    <SelectItem value="modified-desc">Sort by Last Modified</SelectItem>
                    <SelectItem value="name-asc">Sort by Name</SelectItem>
                    <SelectItem value="size-desc">Sort by Size</SelectItem>
                    <SelectItem value="type-asc">Sort by Type</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
