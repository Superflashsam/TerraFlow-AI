"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CheckCircle, AlertCircle } from 'lucide-react';

const StatusIndicator = ({ status }: { status: 'configured' | 'pending' }) => (
    <div className={`flex items-center gap-2 ${status === 'configured' ? 'text-green-500' : 'text-yellow-500'}`}>
        {status === 'configured' ? <CheckCircle size={16}/> : <AlertCircle size={16}/>}
        <span className="font-medium capitalize">{status}</span>
    </div>
)

export const SettingsTab = () => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Compliance Settings</CardTitle>
                    <CardDescription>Manage GDPR and CAN-SPAM compliance for your emails.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <Label htmlFor="double-opt-in">Enable Double Opt-in for new subscribers</Label>
                        <Switch id="double-opt-in" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="physical-address">Physical Address (for CAN-SPAM)</Label>
                        <Input id="physical-address" placeholder="123 Real Estate Ave, Mumbai, MH 400001" />
                    </div>
                    <p className="text-xs text-muted-foreground">An unsubscribe link is automatically added to the footer of all marketing emails.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Email Authentication</CardTitle>
                    <CardDescription>Improve deliverability by verifying your sending domain.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-medium">SPF Record</p>
                            <p className="text-xs text-muted-foreground">Allows our servers to send emails on your behalf.</p>
                        </div>
                        <StatusIndicator status="configured" />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-medium">DKIM Signature</p>
                            <p className="text-xs text-muted-foreground">Verifies that the email was not altered in transit.</p>
                        </div>
                         <StatusIndicator status="configured" />
                    </div>
                     <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-medium">Domain Verification</p>
                            <p className="text-xs text-muted-foreground">Verifies you own your sending domain.</p>
                        </div>
                         <StatusIndicator status="pending" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Sending Limits</CardTitle>
                    <CardDescription>Your current plan's email sending limits.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Daily Limit</p>
                        <p className="text-2xl font-bold">5,000 emails</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Sending Rate</p>
                        <p className="text-2xl font-bold">100 / hour</p>
                    </div>
                </CardContent>
                <CardContent>
                    <Button variant="secondary">Upgrade Plan for Higher Limits</Button>
                </CardContent>
            </Card>
        </div>
    )
}
