"use client";

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WhatsappMetrics } from './whatsapp-metrics';
import { CampaignsTab } from './campaigns-tab';
import { TemplatesTab } from './templates-tab';
import { BulkMessagingTab } from './bulk-messaging-tab';
import { AnalyticsTab } from './analytics-tab';
import { SettingsTab } from './settings-tab';
import { MessageSquare, LayoutTemplate, Send, BarChart, Shield } from 'lucide-react';

export const WhatsappHub = () => {
    const [activeTab, setActiveTab] = useState("campaigns");

    return (
        <div className="space-y-6">
            <PageHeader
                title="WhatsApp Marketing Hub"
                description="Build brand awareness and drive sales with personalized WhatsApp campaigns"
            />
            <WhatsappMetrics />
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    <TabsTrigger value="campaigns"><MessageSquare className="mr-2 h-4 w-4" />Campaigns</TabsTrigger>
                    <TabsTrigger value="templates"><LayoutTemplate className="mr-2 h-4 w-4" />Templates</TabsTrigger>
                    <TabsTrigger value="bulk-messaging"><Send className="mr-2 h-4 w-4" />Bulk Messaging</TabsTrigger>
                    <TabsTrigger value="analytics"><BarChart className="mr-2 h-4 w-4" />Analytics</TabsTrigger>
                    <TabsTrigger value="settings"><Shield className="mr-2 h-4 w-4"/>Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="campaigns" className="mt-4">
                    <CampaignsTab />
                </TabsContent>
                <TabsContent value="templates" className="mt-4">
                    <TemplatesTab />
                </TabsContent>
                <TabsContent value="bulk-messaging" className="mt-4">
                    <BulkMessagingTab />
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
