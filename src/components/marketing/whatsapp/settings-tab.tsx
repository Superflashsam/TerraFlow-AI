"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

const StatusIndicator = ({ status }: { status: 'configured' | 'pending' | 'disconnected' }) => {
    const config = {
        configured: { icon: CheckCircle, color: 'text-green-500', text: 'Configured' },
        pending: { icon: AlertCircle, color: 'text-yellow-500', text: 'Pending Setup' },
        disconnected: { icon: AlertCircle, color: 'text-destructive', text: 'Disconnected' }
    };
    const { icon: Icon, color, text } = config[status];

    return (
        <div className={`flex items-center gap-2 ${color}`}>
            <Icon size={16}/>
            <span className="font-medium capitalize">{text}</span>
        </div>
    )
}

export const SettingsTab = () => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Compliance Settings</CardTitle>
                    <CardDescription>Manage DND filters and opt-out preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <Label htmlFor="dnd-filter" className="font-medium">DND Filter</Label>
                            <p className="text-xs text-muted-foreground">Automatically exclude numbers registered on the Do Not Disturb list.</p>
                        </div>
                        <Switch id="dnd-filter" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-medium">Opt-out Management</p>
                            <p className="text-xs text-muted-foreground">1,186 contacts have opted out.</p>
                        </div>
                        <Button variant="outline" size="sm">Manage Opt-out List</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>WhatsApp Business Account (WABA)</CardTitle>
                    <CardDescription>Manage your connection and account status.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-medium">WABA Connection Status</p>
                            <p className="text-xs text-muted-foreground">ID: 1029384756</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <StatusIndicator status="configured" />
                            <Button variant="secondary" size="sm"><RefreshCw className="mr-2 h-4 w-4"/>Refresh Status</Button>
                        </div>
                    </div>
                     <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-medium">Account Health</p>
                             <p className="text-xs text-muted-foreground">Your account is in good standing.</p>
                        </div>
                         <StatusIndicator status="configured" />
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Sending Limits</CardTitle>
                    <CardDescription>Your current plan's message sending limits.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Daily Limit</p>
                        <p className="text-2xl font-bold">10,000 messages</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Rate Limit</p>
                        <p className="text-2xl font-bold">200 / minute</p>
                    </div>
                </CardContent>
                <CardContent>
                    <Button variant="secondary">Upgrade Plan for Higher Limits</Button>
                </CardContent>
            </Card>
        </div>
    )
}
