"use client";

import React, { useState } from 'react';
import { Bot, MessageCircle, CheckCircle, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConversationsTab } from './conversations-tab';
import { InsightsTab } from './insights-tab';
import { SchedulingTab } from './scheduling-tab';
import { TrainingTab } from './training-tab';
import { SettingsTab } from './settings-tab';
import { useTerraRealtime } from '@/hooks/use-terra-realtime';

const kpiData = [
    { title: "Total Conversations", value: "3,847", change: "+42%", icon: MessageCircle },
    { title: "Lead Qualification Rate", value: "87.4%", change: "vs 54% manual", icon: CheckCircle },
    { title: "Site Visits Scheduled", value: "247", change: "autonomous bookings", icon: Calendar },
    { title: "Conversion Rate", value: "12.7%", change: "vs 8.2% without AI", icon: TrendingUp },
];

export const AiAssistantHub = () => {
    const [isTerraEnabled, setIsTerraEnabled] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const { metrics, connected } = useTerraRealtime();

    const handleChatWithTerra = () => {
        window.dispatchEvent(new CustomEvent('open-terra-chat'));
    };

    const handleToggleTerra = (next: boolean) => {
        if (!next) {
            setShowConfirm(true);
        } else {
            setIsTerraEnabled(true);
        }
    };

    return (
        <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary/10 to-card border-primary/20">
                <CardHeader>
                    <CardTitle className="text-2xl">Terra AI Status Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Bot className="w-24 h-24 text-primary animate-pulse" />
                            <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-green-500 border-2 border-card animate-ping"></div>
                        </div>
                        <div className="space-y-1">
                            <p className="font-semibold text-lg">Online 24/7</p>
                            <p className="text-sm text-muted-foreground">Handling 12 conversations</p>
                            <p className="text-sm text-muted-foreground">Uptime: 99.8%</p>
                            <p className="text-xs text-muted-foreground">Realtime {connected ? 'connected' : 'disconnected'}</p>
                        </div>
                    </div>
                    <div className="text-center space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-3xl font-bold text-primary">{metrics.conversationsToday}</p>
                                <p className="text-xs text-muted-foreground">Conversations Today</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold">{metrics.qualified}</p>
                                <p className="text-xs text-muted-foreground">Leads Qualified</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold">{metrics.scheduled}</p>
                                <p className="text-xs text-muted-foreground">Meetings Scheduled</p>
                            </div>
                            <div>
                                <p className="text-xl font-semibold">{metrics.responseTime.replace('seconds','s')}</p>
                                <p className="text-xs text-muted-foreground">Response Time</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:items-end gap-3">
                        <div className="flex gap-2">
                            <Button onClick={handleChatWithTerra}>Chat with Terra</Button>
                            <Button variant="outline">View Conversations</Button>
                            <Button variant="secondary">Configure Terra</Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="terra-enabled" checked={isTerraEnabled} onCheckedChange={handleToggleTerra} />
                            <Label htmlFor="terra-enabled">{isTerraEnabled ? 'Enabled' : 'Disabled'}</Label>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Disable Terra AI?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Terra will stop engaging leads, scheduling visits, and updating conversations in real-time.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowConfirm(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => { setIsTerraEnabled(false); setShowConfirm(false); }}>Disable</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

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
                    <InsightsTab />
                </TabsContent>
                <TabsContent value="scheduling" className="mt-4">
                    <SchedulingTab />
                </TabsContent>
                <TabsContent value="training" className="mt-4">
                    <TrainingTab />
                </TabsContent>
                <TabsContent value="settings" className="mt-4">
                    <SettingsTab />
                </TabsContent>
            </Tabs>

        </div>
    );
};
