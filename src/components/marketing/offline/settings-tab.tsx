
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, AlertCircle, Edit, Trash2, Merge } from 'lucide-react';

const StatusIndicator = ({ status }: { status: 'configured' | 'pending' }) => (
    <div className={`flex items-center gap-2 ${status === 'configured' ? 'text-green-500' : 'text-yellow-500'}`}>
        {status === 'configured' ? <CheckCircle size={16}/> : <AlertCircle size={16}/>}
        <span className="font-medium capitalize">{status}</span>
    </div>
);

const mockSources = [
    { name: 'Print Media', subSources: 5, leads: 1245 },
    { name: 'Events', subSources: 12, leads: 2341 },
    { name: 'Walk-in', subSources: 2, leads: 567 },
    { name: 'Referral', subSources: 0, leads: 345 },
];

export const SettingsTab = () => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>QR Code Settings</CardTitle>
                    <CardDescription>Configure default settings for all new QR campaigns.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Default QR Style</Label>
                            <Select defaultValue="branded">
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="standard">Standard</SelectItem>
                                    <SelectItem value="branded">Branded (with logo)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Brand Logo</Label>
                            <Input type="file" />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label>Default Form Fields</Label>
                        <p className="text-sm text-muted-foreground">Select fields to be included in new lead capture forms by default.</p>
                        <Button variant="outline">Configure Default Fields</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <Label htmlFor="submission-notifs" className="font-medium">Form Submission Notifications</Label>
                            <p className="text-xs text-muted-foreground">Notify team members when a new lead is captured.</p>
                        </div>
                        <Switch id="submission-notifs" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Source Management</CardTitle>
                    <CardDescription>Manage and organize your offline lead sources.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-end gap-2 mb-4">
                        <Button variant="outline"><Merge className="mr-2 h-4 w-4" /> Merge Sources</Button>
                        <Button><PlusCircle className="mr-2 h-4 w-4" /> Create New Source</Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Source Name</TableHead>
                                <TableHead>Sub-sources</TableHead>
                                <TableHead>Leads Captured</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockSources.map(source => (
                                <TableRow key={source.name}>
                                    <TableCell className="font-medium">{source.name}</TableCell>
                                    <TableCell>{source.subSources}</TableCell>
                                    <TableCell>{source.leads}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm"><Edit className="h-4 w-4 mr-2"/>Edit</Button>
                                        <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="h-4 w-4 mr-2"/>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Integration Settings</CardTitle>
                    <CardDescription>Connect with SMS providers and other services.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-medium">SMS Provider for OTP</p>
                            <p className="text-xs text-muted-foreground">Using Twilio</p>
                        </div>
                        <StatusIndicator status="configured" />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-medium">WhatsApp Auto-reply</p>
                            <p className="text-xs text-muted-foreground">Sends "Thank you" message on form submission.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-medium">CRM Sync</p>
                            <p className="text-xs text-muted-foreground">Auto-syncs leads to your main contact list.</p>
                        </div>
                        <StatusIndicator status="configured" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Offline Mode Settings</CardTitle>
                    <CardDescription>Settings for when agents have no internet connection.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-center justify-between p-4 border rounded-lg">
                        <Label htmlFor="offline-mode" className="font-medium">Enable Offline Form Capture</Label>
                        <Switch id="offline-mode" defaultChecked />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Sync Frequency</Label>
                            <Select defaultValue="15">
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">Every 5 minutes</SelectItem>
                                    <SelectItem value="15">Every 15 minutes</SelectItem>
                                    <SelectItem value="60">Every hour</SelectItem>
                                    <SelectItem value="manual">Manual sync only</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Conflict Resolution</Label>
                             <Select defaultValue="newest">
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Keep newest data</SelectItem>
                                    <SelectItem value="manual">Manual review</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
