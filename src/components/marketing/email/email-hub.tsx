"use client";

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmailMetrics } from './email-metrics';
import { CampaignsTab } from './campaigns-tab';
import { TemplatesTab } from './templates-tab';
import { DripSequencesTab } from './drip-sequences-tab';
import { AnalyticsTab } from './analytics-tab';
import { Mail, Send, Repeat, LayoutTemplate, BarChart } from 'lucide-react';

export const EmailMarketingHub = () => {
    const [activeTab, setActiveTab] = useState("campaigns");

    return (
        <div className="space-y-6">
            <PageHeader
                title="Email Marketing Studio"
                description="Create and automate email campaigns with personalized messaging and workflow automation"
            />
            <EmailMetrics />
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="campaigns"><Mail className="mr-2 h-4 w-4" />Campaigns</TabsTrigger>
                    <TabsTrigger value="sequences"><Repeat className="mr-2 h-4 w-4" />Drip Sequences</TabsTrigger>
                    <TabsTrigger value="templates"><LayoutTemplate className="mr-2 h-4 w-4" />Templates</TabsTrigger>
                    <TabsTrigger value="analytics"><BarChart className="mr-2 h-4 w-4" />Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="campaigns" className="mt-4">
                    <CampaignsTab />
                </TabsContent>
                <TabsContent value="sequences" className="mt-4">
                    <DripSequencesTab />
                </TabsContent>
                <TabsContent value="templates" className="mt-4">
                    <TemplatesTab />
                </TabsContent>
                <TabsContent value="analytics" className="mt-4">
                     <AnalyticsTab />
                </TabsContent>
            </Tabs>
        </div>
    )
}
