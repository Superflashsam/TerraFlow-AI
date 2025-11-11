"use client";

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmailMetrics } from './email-metrics';
import { CampaignsTab } from './campaigns-tab';
import { TemplatesTab } from './templates-tab';
import { DripSequencesTab } from './drip-sequences-tab';
import { AnalyticsTab } from './analytics-tab';
import { ListManagementTab } from './list-management-tab';
import { AutomationTab } from './automation-tab';
import { SettingsTab } from './settings-tab';
import { Mail, Send, Repeat, LayoutTemplate, BarChart, Users, Bot, Shield } from 'lucide-react';

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
                <TabsList className="grid w-full grid-cols-4 md:grid-cols-7">
                    <TabsTrigger value="campaigns"><Mail className="mr-2 h-4 w-4" />Campaigns</TabsTrigger>
                    <TabsTrigger value="sequences"><Repeat className="mr-2 h-4 w-4" />Drip Sequences</TabsTrigger>
                    <TabsTrigger value="templates"><LayoutTemplate className="mr-2 h-4 w-4" />Templates</TabsTrigger>
                    <TabsTrigger value="analytics"><BarChart className="mr-2 h-4 w-4" />Analytics</TabsTrigger>
                    <TabsTrigger value="lists"><Users className="mr-2 h-4 w-4" />List Management</TabsTrigger>
                    <TabsTrigger value="automation"><Bot className="mr-2 h-4 w-4" />Automation</TabsTrigger>
                    <TabsTrigger value="settings"><Shield className="mr-2 h-4 w-4" />Settings</TabsTrigger>
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
                <TabsContent value="lists" className="mt-4">
                    <ListManagementTab />
                </TabsContent>
                 <TabsContent value="automation" className="mt-4">
                    <AutomationTab />
                </TabsContent>
                 <TabsContent value="settings" className="mt-4">
                    <SettingsTab />
                </TabsContent>
            </Tabs>
        </div>
    )
}
