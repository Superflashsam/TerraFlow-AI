"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, MoreVertical, Edit, Copy, BarChart, Trash2, List, LayoutGrid, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreateCampaignModal } from './create-campaign-modal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const mockCampaigns = [
  {
    id: 1,
    name: 'Q4 Property Launch - Whitefield',
    type: 'One-time',
    status: 'Completed',
    audience: '892 leads - Hot & Warm',
    schedule: 'Sent Nov 10, 2025',
    performance: { sent: 892, delivered: 889, opened: 376, clicked: 113, unsubscribed: 4, bounced: 3 }
  },
  {
    id: 2,
    name: 'Diwali Mega Sale - 3BHK Offers',
    type: 'One-time',
    status: 'Completed',
    audience: '1,247 recipients',
    schedule: 'Sent Nov 1, 2025',
    performance: { sent: 1247, delivered: 1240, opened: 561, clicked: 187, unsubscribed: 12, bounced: 7 }
  },
  {
    id: 3,
    name: 'Welcome Series - New Leads',
    type: 'Drip Sequence',
    status: 'Active',
    audience: '450 recipients',
    schedule: 'Ongoing',
    performance: { sent: 450, delivered: 448, opened: 234, clicked: 81, unsubscribed: 2, bounced: 2 }
  },
  {
    id: 4,
    name: 'Re-engagement: Inactive Leads',
    type: 'Automated',
    status: 'Active',
    audience: '680 recipients',
    schedule: 'Ongoing',
    performance: { sent: 680, delivered: 670, opened: 190, clicked: 54, unsubscribed: 10, bounced: 10 }
  },
   {
    id: 5,
    name: 'Pre-launch: Sobha Dream Acres',
    type: 'One-time',
    status: 'Scheduled',
    audience: '1,500 investors',
    schedule: 'Nov 25, 2025, 11:00 AM',
    performance: { sent: 0, delivered: 0, opened: 0, clicked: 0, unsubscribed: 0, bounced: 0 }
  },
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
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mockCampaigns.map(campaign => {
                      const openRate = campaign.performance.sent > 0 ? (campaign.performance.opened / campaign.performance.sent * 100).toFixed(1) : 0;
                      const clickRate = campaign.performance.opened > 0 ? (campaign.performance.clicked / campaign.performance.opened * 100).toFixed(1) : 0;
                      return (
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
                                        <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                                        <DropdownMenuItem><Copy className="mr-2 h-4 w-4" />Duplicate</DropdownMenuItem>
                                        <DropdownMenuItem><BarChart className="mr-2 h-4 w-4" />View Report</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1 mb-4">
                                <p><strong>Audience:</strong> {campaign.audience}</p>
                                <p><strong>Schedule:</strong> {campaign.schedule}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground mt-auto pt-4 border-t">
                                <div>
                                  <p>Sent</p>
                                  <p className="font-medium text-foreground text-sm">{campaign.performance.sent.toLocaleString()}</p>
                                </div>
                                <div><p>Open Rate</p>
                                  <p className="font-medium text-foreground text-sm">{openRate}%</p>
                                </div>
                                <div><p>Click Rate</p>
                                  <p className="font-medium text-foreground text-sm">{clickRate}%</p>
                                </div>
                            </div>
                          </CardContent>
                      </Card>
                  )})}
              </div>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Audience</TableHead>
                      <TableHead>Schedule</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCampaigns.map((campaign) => {
                       const openRate = campaign.performance.sent > 0 ? (campaign.performance.opened / campaign.performance.sent * 100).toFixed(1) : 0;
                       const clickRate = campaign.performance.opened > 0 ? (campaign.performance.clicked / campaign.performance.opened * 100).toFixed(1) : 0;
                       return (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell><StatusBadge status={campaign.status} /></TableCell>
                        <TableCell>{campaign.audience}</TableCell>
                        <TableCell>{campaign.schedule}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-xs">
                            <span>Open: {openRate}%</span>
                            <span>Click: {clickRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="text-muted-foreground" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                              <DropdownMenuItem><Copy className="mr-2 h-4 w-4" />Duplicate</DropdownMenuItem>
                              <DropdownMenuItem><BarChart className="mr-2 h-4 w-4" />View Report</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )})}
                  </TableBody>
                </Table>
              </Card>
            )}
            <CreateCampaignModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
        </div>
    )
}
