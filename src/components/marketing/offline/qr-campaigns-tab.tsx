"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, MoreVertical, Edit, Copy, BarChart, Trash2, List, LayoutGrid, Search, QrCode } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const mockCampaigns = [
  {
    id: 1,
    name: "Times of India Full Page Ad - Nov 2025",
    type: "Print Media",
    status: "Active",
    dateRange: "Nov 1 - Nov 30, 2025",
    location: "Times of India, Bangalore Edition",
    scans: 847,
    leads: 432,
    leadConversion: 51,
    walkins: 24,
    deals: 3,
    dealValue: "₹45L",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example1"
  },
  {
    id: 2,
    name: "Diwali Property Expo - BIEC",
    type: "Event",
    status: "Active",
    dateRange: "Nov 5 - Nov 7, 2025",
    location: "BIEC, Bangalore",
    scans: 1247,
    leads: 680,
    leadConversion: 54.5,
    walkins: 34,
    deals: 8,
    dealValue: "₹2.1Cr",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example2"
  },
  {
    id: 3,
    name: "Deccan Herald Half Page",
    type: "Print Media",
    status: "Completed",
    dateRange: "Oct 15 - Oct 22, 2025",
    location: "Deccan Herald, Karnataka",
    scans: 456,
    leads: 234,
    leadConversion: 51.3,
    walkins: 12,
    deals: 1,
    dealValue: "₹90L",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example3"
  },
  {
    id: 4,
    name: "Brigade Road Hoarding",
    type: "Billboard",
    status: "Active",
    dateRange: "Nov 1 - Dec 31, 2025",
    location: "Brigade Road, Bangalore",
    scans: 198,
    leads: 89,
    leadConversion: 44.9,
    walkins: 5,
    deals: 0,
    dealValue: "₹0",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example4"
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  const colors: { [key: string]: string } = {
    Active: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    Completed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    Scheduled: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  };
  const dotColors: { [key: string]: string } = {
    Active: 'bg-green-500',
    Completed: 'bg-gray-500',
    Scheduled: 'bg-yellow-500',
  }
  return (
    <Badge variant="outline" className={`${colors[status]} capitalize border-0`}>
      <span className={`w-2 h-2 mr-2 rounded-full ${dotColors[status]}`}></span>
      {status}
    </Badge>
  );
};

const TypeBadge = ({ type }: { type: string }) => {
    const colors: { [key: string]: string } = {
      'Print Media': 'bg-blue-100 text-blue-800',
      'Event': 'bg-purple-100 text-purple-800',
      'Billboard': 'bg-orange-100 text-orange-800',
      'Hoarding': 'bg-teal-100 text-teal-800',
    };
    return <Badge variant="secondary" className={colors[type]}>{type}</Badge>
}

const CampaignCard = ({ campaign }: { campaign: any }) => (
    <Card>
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-lg">{campaign.name}</h3>
                    <TypeBadge type={campaign.type} />
                </div>
                <StatusBadge status={campaign.status} />
            </div>
        </CardHeader>
        <CardContent>
            <div className="flex gap-4 mb-4">
                <img src={campaign.qrCodeUrl} alt="QR Code" className="w-24 h-24 border rounded-md" />
                <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>Date:</strong> {campaign.dateRange}</p>
                    <p><strong>Location:</strong> {campaign.location}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-xs text-muted-foreground p-2 bg-muted/50 rounded-md">
                <div>
                    <p>QR Scans</p>
                    <p className="font-bold text-foreground text-sm">{campaign.scans}</p>
                </div>
                <div>
                    <p>Leads</p>
                    <p className="font-bold text-foreground text-sm">{campaign.leads} ({campaign.leadConversion}%)</p>
                </div>
                <div>
                    <p>Walk-ins</p>
                    <p className="font-bold text-foreground text-sm">{campaign.walkins}</p>
                </div>
                <div>
                    <p>Deals Closed</p>
                    <p className="font-bold text-foreground text-sm">{campaign.deals} ({campaign.dealValue})</p>
                </div>
            </div>
        </CardContent>
        <CardContent className="border-t pt-4">
             <div className="flex justify-end items-center gap-2">
                <Button variant="ghost" size="sm">View Report</Button>
                <Button variant="ghost" size="sm">Download QR</Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Archive</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </CardContent>
    </Card>
)

export const QrCampaignsTab = () => {

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search campaigns..." className="pl-10" />
                </div>
                <div className="flex items-center gap-2">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create QR Campaign
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockCampaigns.map(campaign => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
            </div>
        </div>
    )
}
