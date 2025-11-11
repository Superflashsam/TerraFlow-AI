"use client";

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WhatsappMetrics } from './whatsapp-metrics';
import { CampaignsTab } from './campaigns-tab';
import { TemplatesTab } from './templates-tab';
import { BulkMessagingTab } from './bulk-messaging-tab';
import { MessageSquare, LayoutTemplate, Send, BarChart } from 'lucide-react';

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
                <TabsList>
                    <TabsTrigger value="campaigns"><MessageSquare className="mr-2 h-4 w-4" />Campaigns</TabsTrigger>
                    <TabsTrigger value="templates"><LayoutTemplate className="mr-2 h-4 w-4" />Templates</TabsTrigger>
                    <TabsTrigger value="bulk-messaging"><Send className="mr-2 h-4 w-4" />Bulk Messaging</TabsTrigger>
                    <TabsTrigger value="analytics"><BarChart className="mr-2 h-4 w-4" />Analytics</TabsTrigger>
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
                     <div className="text-center py-16">
                        <BarChart size={48} className="mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold">WhatsApp Analytics</h3>
                        <p className="text-muted-foreground">This feature is coming soon.</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
