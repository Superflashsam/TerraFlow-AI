"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreVertical, Edit, Copy, BarChart, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreateCampaignModal } from './create-campaign-modal';

const mockCampaigns = [
  {
    id: 1,
    name: 'Whitefield 3BHK Launch Offer',
    status: 'Active',
    audience: '247 hot leads (score > 80)',
    schedule: 'Sent 2 days ago',
    performance: { sent: '247/247 (100%)', delivered: '245 (99.2%)', read: '189 (76.5%)', replied: '87 (35.2%)', conversions: '12 (4.9%)' }
  },
  {
    id: 2,
    name: 'Diwali Special - 20% Off',
    status: 'Completed',
    audience: '450 leads',
    schedule: 'Sent Oct 28, 2025',
    performance: { sent: '441/450 (98%)', delivered: '435 (98.6%)', read: '313 (72%)', replied: '149 (34%)', conversions: '21 (4.8%)' }
  },
  {
    id: 3,
    name: 'New Launch: Brigade Cornerstone',
    status: 'Scheduled',
    audience: '320 leads',
    schedule: 'Sends Nov 15, 10 AM',
    performance: { sent: '0/320 (0%)', delivered: 'N/A', read: 'N/A', replied: 'N/A', conversions: 'N/A' }
  },
   {
    id: 4,
    name: 'Follow-up: Site Visit Reminder',
    status: 'Active',
    audience: '89 leads',
    schedule: 'Ongoing',
    performance: { sent: '89/89 (100%)', delivered: '89 (100%)', read: '72 (81%)', replied: '37 (42%)', conversions: '8 (9%)' }
  },
  {
    id: 5,
    name: 'Pre-launch Interest',
    status: 'Draft',
    audience: '150 potential investors',
    schedule: 'Not Scheduled',
    performance: { sent: 'N/A', delivered: 'N/A', read: 'N/A', replied: 'N/A', conversions: 'N/A' }
  }
];


const StatusBadge = ({ status }: { status: string }) => {
  const colors: { [key: string]: string } = {
    Active: 'bg-green-100 text-green-800',
    Scheduled: 'bg-yellow-100 text-yellow-800',
    Completed: 'bg-gray-100 text-gray-800',
    Draft: 'bg-blue-100 text-blue-800',
  };
  const dotColors: { [key: string]: string } = {
    Active: 'bg-green-500',
    Scheduled: 'bg-yellow-500',
    Completed: 'bg-gray-500',
    Draft: 'bg-blue-500',
  }
  return (
    <Badge className={`${colors[status]} capitalize`}>
      <span className={`w-2 h-2 mr-2 rounded-full ${dotColors[status]}`}></span>
      {status}
    </Badge>
  );
};


export const CampaignsTab = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Campaign
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCampaigns.map(campaign => (
                    <Card key={campaign.id} className="flex flex-col">
                        <CardContent className="p-6 flex-1 flex flex-col">
                           <div className="flex justify-between items-start mb-4">
                                <h3 className="font-semibold text-lg">{campaign.name}</h3>
                                <StatusBadge status={campaign.status} />
                           </div>
                           <div className="text-sm text-muted-foreground space-y-1 mb-4">
                               <p><strong>Audience:</strong> {campaign.audience}</p>
                               <p><strong>Schedule:</strong> {campaign.schedule}</p>
                           </div>
                           <div className="grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground mt-auto pt-4 border-t">
                               <div><p>Sent</p><p className="font-medium text-foreground">{campaign.performance.sent}</p></div>
                               <div><p>Delivered</p><p className="font-medium text-foreground">{campaign.performance.delivered}</p></div>
                               <div><p>Read</p><p className="font-medium text-foreground">{campaign.performance.read}</p></div>
                               <div><p>Replied</p><p className="font-medium text-foreground">{campaign.performance.replied}</p></div>
                               <div><p>Conversions</p><p className="font-medium text-foreground">{campaign.performance.conversions}</p></div>
                           </div>
                           <div className="flex justify-end items-center gap-2 mt-4">
                                <Button variant="ghost" size="sm"><Edit className="mr-2 h-4 w-4" />Edit</Button>
                                <Button variant="ghost" size="sm"><Copy className="mr-2 h-4 w-4" />Duplicate</Button>
                                <Button variant="ghost" size="sm"><BarChart className="mr-2 h-4 w-4" />Report</Button>
                                <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</Button>
                           </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <CreateCampaignModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
        </div>
    )
}
