"use client";

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const DocumentFilters = ({ onFilterChange, onSortChange }: { onFilterChange: (filters: any) => void; onSortChange: (sort: any) => void; }) => {
    return (
        <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search documents..." className="pl-10" />
            </div>
             <Select defaultValue="all">
                <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All File Types</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="docx">Word</SelectItem>
                    <SelectItem value="xlsx">Excel</SelectItem>
                    <SelectItem value="jpg">Image</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                </SelectContent>
            </Select>
            <Select defaultValue="anytime">
                <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="anytime">Any time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this-week">This week</SelectItem>
                    <SelectItem value="this-month">This month</SelectItem>
                </SelectContent>
            </Select>
             <Select defaultValue="any">
                <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="any">Any Size</SelectItem>
                    <SelectItem value="sm">{'<1MB'}</SelectItem>
                    <SelectItem value="md">1-10MB</SelectItem>
                    <SelectItem value="lg">10-50MB</SelectItem>
                    <SelectItem value="xl">{'>50MB'}</SelectItem>
                </SelectContent>
            </Select>
             <Select defaultValue="modified">
                <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="modified">Sort by Last Modified</SelectItem>
                    <SelectItem value="name">Sort by Name</SelectItem>
                    <SelectItem value="size">Sort by Size</SelectItem>
                    <SelectItem value="type">Sort by Type</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
