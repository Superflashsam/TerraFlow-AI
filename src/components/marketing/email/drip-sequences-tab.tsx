"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, MoreVertical, Edit, Copy, BarChart, Trash2, Search, Play, Pause } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const mockSequences = [
  {
    id: 1,
    name: 'New Lead Nurture (7 days)',
    status: 'Active',
    stats: {
      emails: 5,
      days: 7,
      enrolled: 450,
      openRate: 52,
      clickRate: 18,
      completionRate: 75
    }
  },
  {
    id: 2,
    name: 'Site Visit Follow-up (10 days)',
    status: 'Active',
    stats: {
      emails: 3,
      days: 10,
      enrolled: 189,
      openRate: 61,
      clickRate: 24,
      completionRate: 82
    }
  },
  {
    id: 3,
    name: 'Cold Lead Re-engagement (14 days)',
    status: 'Paused',
    stats: {
      emails: 4,
      days: 14,
      enrolled: 680,
      openRate: 34,
      clickRate: 11,
      completionRate: 45
    }
  },
  {
    id: 4,
    name: 'Post-Purchase Upsell',
    status: 'Draft',
    stats: {
      emails: 2,
      days: 5,
      enrolled: 0,
      openRate: 0,
      clickRate: 0,
      completionRate: 0
    }
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  const colors: { [key: string]: string } = {
    Active: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    Paused: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    Draft: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  };
  const dotColors: { [key: string]: string } = {
    Active: 'bg-green-500',
    Paused: 'bg-yellow-500',
    Draft: 'bg-blue-500',
  }
  return (
    <Badge variant="outline" className={`${colors[status]} capitalize border-0`}>
      <span className={`w-2 h-2 mr-2 rounded-full ${dotColors[status]}`}></span>
      {status}
    </Badge>
  );
};

const DripSequenceCard = ({ sequence }: { sequence: any }) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{sequence.name}</CardTitle>
          <div className="flex items-center gap-2">
            <StatusBadge status={sequence.status} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                <DropdownMenuItem><Copy className="mr-2 h-4 w-4" />Duplicate</DropdownMenuItem>
                <DropdownMenuItem><BarChart className="mr-2 h-4 w-4" />View Analytics</DropdownMenuItem>
                {sequence.status === 'Active' && <DropdownMenuItem><Pause className="mr-2 h-4 w-4" />Pause</DropdownMenuItem>}
                {sequence.status === 'Paused' && <DropdownMenuItem><Play className="mr-2 h-4 w-4" />Resume</DropdownMenuItem>}
                <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="text-sm text-muted-foreground mb-4">
          {sequence.stats.emails} emails over {sequence.stats.days} days
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
          <div>
            <p>Enrolled</p>
            <p className="font-medium text-foreground text-sm">{sequence.stats.enrolled.toLocaleString()}</p>
          </div>
          <div><p>Avg. Open</p>
            <p className="font-medium text-foreground text-sm">{sequence.stats.openRate}%</p>
          </div>
          <div><p>Avg. Click</p>
            <p className="font-medium text-foreground text-sm">{sequence.stats.clickRate}%</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4">
        <div className="w-full">
          <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
            <span>Completion Rate</span>
            <span className="font-medium text-foreground">{sequence.stats.completionRate}%</span>
          </div>
          <div className="w-full bg-background rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: `${sequence.stats.completionRate}%` }} />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export const DripSequencesTab = () => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search sequences..." className="pl-10" />
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Drip Sequence
                </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockSequences.map(sequence => (
                    <DripSequenceCard key={sequence.id} sequence={sequence} />
                ))}
            </div>
        </div>
    )
}
