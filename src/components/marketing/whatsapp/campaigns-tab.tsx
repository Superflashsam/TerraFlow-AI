"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, MoreVertical, Edit, Copy, BarChart, Trash2, List, LayoutGrid, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreateCampaignModal } from './create-campaign-modal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const mockCampaigns = [
  {
    id: 1,
    name: 'Whitefield 3BHK Launch Offer',
    status: 'Active',
    audience: '247 hot leads (score > 80)',
    schedule: 'Sent 2 days ago',
    performance: { sent: '247/247', sent_perc: '100%', delivered: '245', delivered_perc: '99.2%', read: '189', read_perc: '76.5%', replied: '87', replied_perc: '35.2%', converted: '12', converted_perc: '4.9%' }
  },
  {
    id: 2,
    name: 'Diwali Special - 20% Off on Bookings',
    status: 'Active',
    audience: '450 leads',
    schedule: 'Sent 5 days ago',
    performance: { sent: '450/450', sent_perc: '100%', delivered: '441', delivered_perc: '98%', read: '324', read_perc: '72%', replied: '153', replied_perc: '34%', converted: '23', converted_perc: '5.1%' }
  },
  {
    id: 3,
    name: 'New Launch: Brigade Cornerstone',
    status: 'Scheduled',
    audience: '320 leads',
    schedule: 'Sends Nov 15, 10 AM',
    performance: { sent: '0/320', sent_perc: '0%', delivered: 'N/A', delivered_perc: '', read: 'N/A', read_perc: '', replied: 'N/A', replied_perc: '', converted: 'N/A', converted_perc: '' }
  },
   {
    id: 4,
    name: 'Follow-up: Site Visit Reminder',
    status: 'Active',
    audience: '89 leads',
    schedule: 'Ongoing',
    performance: { sent: '89/89', sent_perc: '100%', delivered: '89', delivered_perc: '100%', read: '72', read_perc: '81%', replied: '37', replied_perc: '42%', converted: '8', converted_perc: '9%' }
  },
  {
    id: 5,
    name: 'Pre-launch Interest',
    status: 'Draft',
    audience: '150 potential investors',
    schedule: 'Not Scheduled',
    performance: { sent: 'N/A', sent_perc: '', delivered: 'N/A', delivered_perc: '', read: 'N/A', read_perc: '', replied: 'N/A', replied_perc: '', converted: 'N/A', converted_perc: '' }
  }
];


const StatusBadge = ({ status }: { status: string }) => {
  const colors: { [key: string]: string } = {
    Active: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    Scheduled: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    Completed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    Draft: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  };
  const dotColors: { [key: string]: string } = {
    Active: 'bg-green-500',
    Scheduled: 'bg-yellow-500',
    Completed: 'bg-gray-500',
    Draft: 'bg-blue-500',
  }
  return (
    <Badge variant="outline" className={`${colors[status]} capitalize border-0`}>
      <span className={`w-2 h-2 mr-2 rounded-full ${dotColors[status]}`}></span>
      {status}
    </Badge>
  );
};


export const CampaignsTab = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid');

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search campaigns..." className="pl-10" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-muted p-1 rounded-lg">
                        <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="sm" onClick={() => setViewMode('grid')}><LayoutGrid className="h-4 w-4" /></Button>
                        <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="sm" onClick={() => setViewMode('list')}><List className="h-4 w-4" /></Button>
                    </div>
                    <Button onClick={() => setIsCreateModalOpen(true)}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Campaign
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockCampaigns.map(campaign => (
                    <Card key={campaign.id} className="flex flex-col">
                        <CardContent className="p-6 flex-1 flex flex-col">
                           <div className="flex justify-between items-start mb-4">
                                <h3 className="font-semibold text-lg">{campaign.name}</h3>
                                <div className="flex items-center gap-2">
                                  <StatusBadge status={campaign.status} />
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical className="text-muted-foreground" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Copy className="mr-2 h-4 w-4" />
                                        Duplicate
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <BarChart className="mr-2 h-4 w-4" />
                                        View Report
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="text-destructive">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                           </div>
                           <div className="text-sm text-muted-foreground space-y-1 mb-4">
                               <p><strong>Audience:</strong> {campaign.audience}</p>
                               <p><strong>Schedule:</strong> {campaign.schedule}</p>
                           </div>
                           <div className="grid grid-cols-5 gap-2 text-center text-xs text-muted-foreground mt-auto pt-4 border-t">
                               <div>
                                 <p>Sent</p>
                                 <p className="font-medium text-foreground text-sm">{campaign.performance.sent}</p>
                                 <p className="text-green-500">{campaign.performance.sent_perc}</p>
                               </div>
                               <div>
                                 <p>Delivered</p>
                                 <p className="font-medium text-foreground text-sm">{campaign.performance.delivered}</p>
                                 <p className="text-green-500">{campaign.performance.delivered_perc}</p>
                               </div>
                               <div><p>Read</p>
                                 <p className="font-medium text-foreground text-sm">{campaign.performance.read}</p>
                                 <p className="text-green-500">{campaign.performance.read_perc}</p>
                               </div>
                               <div><p>Replied</p>
                                 <p className="font-medium text-foreground text-sm">{campaign.performance.replied}</p>
                                 <p className="text-green-500">{campaign.performance.replied_perc}</p>
                               </div>
                               <div><p>Converted</p>
                                 <p className="font-medium text-foreground text-sm">{campaign.performance.converted}</p>
                                 <p className="text-green-500">{campaign.performance.converted_perc}</p>
                               </div>
                           </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <CreateCampaignModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
        </div>
    )
}
