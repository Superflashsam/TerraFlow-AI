"use client";

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, Scan, UserPlus, Calendar, BarChart, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QrCampaignsTab } from './qr-campaigns-tab';
import { WalkInTab } from './walk-in-tab';
import { AnalyticsTab } from './analytics-tab';
import { SettingsTab } from './settings-tab';

const kpiData = [
  { title: "Active QR Campaigns", value: "12", icon: QrCode, change: "3 events, 9 print", changeType: 'neutral' },
  { title: "Total Scans", value: "2,847", icon: Scan, change: "+34% vs last month", changeType: 'positive' },
  { title: "Leads Generated", value: "1,247", icon: UserPlus, change: "from offline: 43%", changeType: 'positive' },
  { title: "Walk-ins Scheduled", value: "89", icon: Calendar, change: "this week", changeType: 'neutral' },
];

export const OfflineHub = () => {
    const [activeTab, setActiveTab] = useState("campaigns");

    return (
        <div className="space-y-6">
            <PageHeader
                title="Offline Campaign Tracker"
                description="Real-time tracking of print media, events, and walk-ins via QR codes"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map((kpi, index) => {
                    const Icon = kpi.icon;
                    return (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                                <Icon className="h-5 w-5 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{kpi.value}</div>
                                <p className={`text-xs ${kpi.changeType === 'positive' ? 'text-green-500' : 'text-muted-foreground'}`}>
                                    {kpi.change}
                                </p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="campaigns" className="flex items-center gap-2"><QrCode size={14}/>QR Campaigns</TabsTrigger>
                    <TabsTrigger value="walk-in" className="flex items-center gap-2"><UserPlus size={14}/>Walk-in Forms</TabsTrigger>
                    <TabsTrigger value="analytics" className="flex items-center gap-2"><BarChart size={14}/>Analytics</TabsTrigger>
                    <TabsTrigger value="settings" className="flex items-center gap-2"><Shield size={14}/>Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="campaigns" className="mt-4">
                    <QrCampaignsTab />
                </TabsContent>
                <TabsContent value="walk-in" className="mt-4">
                    <WalkInTab />
                </TabsContent>
                <TabsContent value="analytics" className="mt-4">
                    <AnalyticsTab />
                </TabsContent>
                 <TabsContent value="settings" className="mt-4">
                    <SettingsTab />
                </TabsContent>
            </Tabs>
        </div>
    )
}
