"use client";

import React, { useState } from 'react';
import { Bot, MessageCircle, CheckCircle, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConversationsTab } from './conversations-tab';

const kpiData = [
    { title: "Total Conversations", value: "3,847", change: "+42%", icon: MessageCircle },
    { title: "Lead Qualification Rate", value: "87.4%", change: "vs 54% manual", icon: CheckCircle },
    { title: "Site Visits Scheduled", value: "247", change: "autonomous bookings", icon: Calendar },
    { title: "Conversion Rate", value: "12.7%", change: "vs 8.2% without AI", icon: TrendingUp },
];

export const AiAssistantHub = () => {
    const [isTerraEnabled, setIsTerraEnabled] = useState(true);

    return (
        <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary/10 to-card border-primary/20">
                <CardHeader>
                    <CardTitle className="text-2xl">Terra AI Status Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Bot className="w-24 h-24 text-primary" />
                            <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-green-500 border-2 border-card animate-pulse"></div>
                        </div>
                        <div className="space-y-1">
                            <p className="font-semibold text-lg">Online 24/7</p>
                            <p className="text-sm text-muted-foreground">Handling 12 conversations</p>
                            <p className="text-sm text-muted-foreground">Uptime: 99.8%</p>
                        </div>
                    </div>
                    <div className="text-center space-y-2">
                        <p className="text-4xl font-bold text-primary">247</p>
                        <p className="text-muted-foreground">Conversations Today</p>
                        <div className="flex justify-center gap-4 text-sm">
                            <span><strong>89</strong> Qualified</span>
                            <span><strong>24</strong> Scheduled</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:items-end gap-3">
                        <div className="flex gap-2">
                            <Button>Chat with Terra</Button>
                            <Button variant="outline">View Conversations</Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="terra-enabled" checked={isTerraEnabled} onCheckedChange={setIsTerraEnabled} />
                            <Label htmlFor="terra-enabled">{isTerraEnabled ? 'Enabled' : 'Disabled'}</Label>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map(kpi => {
                    const Icon = kpi.icon;
                    return (
                        <Card key={kpi.title}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                                <Icon className="h-5 w-5 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">{kpi.value}</p>
                                <p className="text-xs text-muted-foreground">{kpi.change}</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
            
            <Tabs defaultValue="conversations">
                <TabsList>
                    <TabsTrigger value="conversations">Conversations</TabsTrigger>
                    <TabsTrigger value="insights">Insights</TabsTrigger>
                    <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
                    <TabsTrigger value="training">Training</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="conversations" className="mt-4">
                    <ConversationsTab />
                </TabsContent>
                <TabsContent value="insights" className="mt-4">
                    <p>Insights tab content coming soon.</p>
                </TabsContent>
                <TabsContent value="scheduling" className="mt-4">
                    <p>Scheduling tab content coming soon.</p>
                </TabsContent>
                <TabsContent value="training" className="mt-4">
                    <p>Training tab content coming soon.</p>
                </TabsContent>
                <TabsContent value="settings" className="mt-4">
                    <p>Settings tab content coming soon.</p>
                </TabsContent>
            </Tabs>

        </div>
    );
};
