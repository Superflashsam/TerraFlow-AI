"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Send } from 'lucide-react';
import { Label } from '@/components/ui/label';


const mockBroadcasts = [
  {
    id: 1,
    name: 'Diwali Special Offer',
    date: 'Nov 10, 2025 10:30 AM',
    recipients: 450,
    status: 'Delivered',
  },
  {
    id: 2,
    name: 'Site Visit Reminder',
    date: 'Nov 8, 2025 2:15 PM',
    recipients: 120,
    status: 'Delivered',
  },
];

export const BulkMessagingTab = () => {
    const [fileName, setFileName] = useState('');
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('');
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Quick Broadcast</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Audience Segment</Label>
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Select segment" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="hot-leads">Hot Leads</SelectItem>
                                    <SelectItem value="investors-pune">Investors (Pune)</SelectItem>
                                    <SelectItem value="all-contacts">All Contacts</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Template</Label>
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Select template" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="template1">Property Launch (Approved)</SelectItem>
                                    <SelectItem value="template2">Festive Offer (Approved)</SelectItem>
                                    <SelectItem value="template3">Site Visit Reminder (Approved)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Upload Contact List with Variables (CSV)</Label>
                        <div className="flex items-center gap-2">
                            <Input id="csv-upload-text" readOnly placeholder={fileName || "No file chosen"} className="cursor-pointer flex-1" />
                            <Label htmlFor="csv-upload" className="cursor-pointer">
                                <Button variant="outline" asChild>
                                    <span className="flex items-center">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload
                                    </span>
                                </Button>
                            </Label>
                            <input type="file" id="csv-upload" className="hidden" onChange={handleFileChange} accept=".csv" />
                        </div>
                        <p className="text-xs text-muted-foreground">CSV should include columns: phone, name, property, etc.</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Estimated Recipients:</span>
                            <span className="font-medium">247</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Cost per Message:</span>
                            <span className="font-medium">₹10</span>
                        </div>
                         <div className="flex justify-between font-bold text-base">
                            <span>Total Estimated Cost:</span>
                            <span>₹2,470</span>
                        </div>
                    </div>
                     <div className="flex items-center justify-between pt-4">
                        <Button className="w-full md:w-auto">
                            <Send className="mr-2 h-4 w-4" />
                            Send Now
                        </Button>
                        <Button variant="link">Schedule for Later</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Broadcast History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {mockBroadcasts.map(broadcast => (
                            <div key={broadcast.id} className="flex justify-between items-center p-3 hover:bg-muted/50 rounded-lg">
                                <div>
                                    <p className="font-medium">{broadcast.name}</p>
                                    <p className="text-sm text-muted-foreground">{broadcast.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm">{broadcast.recipients} recipients</p>
                                    <span className="text-xs text-green-500">{broadcast.status}</span>
                                </div>
                                <Button variant="ghost" size="sm">View Report</Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}