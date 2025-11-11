"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, Download, ListFilter, Trash2 } from 'lucide-react';

const mockUnsubscribes = [
    { email: 'test1@example.com', date: '2025-10-28', reason: 'No longer interested' },
    { email: 'test2@example.com', date: '2025-10-27', reason: 'Emails too frequent' },
];

const mockBounces = [
    { email: 'bounce1@example.com', date: '2025-10-29', type: 'Hard', reason: 'Mailbox does not exist' },
    { email: 'bounce2@example.com', date: '2025-10-28', type: 'Soft', reason: 'Mailbox full' },
]

export const ListManagementTab = () => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Subscriber List Upload</CardTitle>
                    <CardDescription>Import contacts via CSV file. Ensure your file includes 'email' and 'name' columns.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                    <Input type="file" accept=".csv" className="max-w-xs" />
                    <Button><Upload className="mr-2 h-4 w-4" /> Import Subscribers</Button>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Unsubscribe Management</CardTitle>
                        <CardDescription>List of users who have unsubscribed from your communications.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" size="sm" className="mb-4"><Download className="mr-2 h-4 w-4" /> Export List</Button>
                        <Table>
                            <TableHeader><TableRow><TableHead>Email</TableHead><TableHead>Date</TableHead><TableHead>Reason</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {mockUnsubscribes.map(item => (
                                    <TableRow key={item.email}><TableCell>{item.email}</TableCell><TableCell>{item.date}</TableCell><TableCell>{item.reason}</TableCell></TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Bounce Management</CardTitle>
                        <CardDescription>Emails that failed to deliver. Hard bounces are automatically removed.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Button variant="outline" size="sm" className="mb-4"><ListFilter className="mr-2 h-4 w-4" /> Clean List</Button>
                         <Table>
                            <TableHeader><TableRow><TableHead>Email</TableHead><TableHead>Date</TableHead><TableHead>Type</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {mockBounces.map(item => (
                                    <TableRow key={item.email}><TableCell>{item.email}</TableCell><TableCell>{item.date}</TableCell><TableCell>{item.type}</TableCell></TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Suppression List</CardTitle>
                    <CardDescription>Manually add emails to exclude from all future campaigns.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                    <Input placeholder="Enter email to suppress" className="max-w-xs" />
                    <Button><Trash2 className="mr-2 h-4 w-4" /> Suppress Email</Button>
                </CardContent>
            </Card>
        </div>
    )
}
