
"use client";

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmailMetrics } from './email-metrics';
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
                    <div className="text-center py-16">
                        <Mail size={48} className="mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold">Campaigns Dashboard</h3>
                        <p className="text-muted-foreground">This feature is coming soon.</p>
                    </div>
                </TabsContent>
                <TabsContent value="sequences" className="mt-4">
                    <div className="text-center py-16">
                        <Repeat size={48} className="mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold">Drip Sequences</h3>
                        <p className="text-muted-foreground">This feature is coming soon.</p>
                    </div>
                </TabsContent>
                <TabsContent value="templates" className="mt-4">
                    <div className="text-center py-16">
                        <LayoutTemplate size={48} className="mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold">Email Templates</h3>
                        <p className="text-muted-foreground">This feature is coming soon.</p>
                    </div>
                </TabsContent>
                <TabsContent value="analytics" className="mt-4">
                     <div className="text-center py-16">
                        <BarChart size={48} className="mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold">Email Analytics</h3>
                        <p className="text-muted-foreground">This feature is coming soon.</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
