
"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Smartphone, FileText, Check } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getImagePlaceholder } from '@/lib/placeholder-images';
import { CreateWalkInTemplateModal } from './create-walkin-template-modal';

const walkInLeaderboard = [
  { rank: 1, agent: 'Priya Sharma', walkins: 28, conversion: 15.2, avatarId: 'avatar-priya' },
  { rank: 2, agent: 'Rajesh Kumar', walkins: 24, conversion: 12.8, avatarId: 'avatar-rajesh' },
  { rank: 3, agent: 'Amit Patel', walkins: 19, conversion: 11.5, avatarId: 'avatar-amit' },
  { rank: 4, agent: 'Sunita Reddy', walkins: 15, conversion: 10.1, avatarId: 'avatar-sunita' },
];

const formTemplates = [
    { id: 'quick', name: 'Quick Lead Capture', fields: 'Name, Phone', icon: FileText, description: 'Property Site: Prestige Lakeside' },
    { id: 'detailed', name: 'Detailed Walk-in', fields: '10 fields', icon: FileText, description: 'For capturing comprehensive lead data' },
    { id: 'event', name: 'Event Registration', fields: 'Name, Phone, Email, Company', icon: FileText, description: 'Property Expo 2025' }
]

const rankMedals: { [key: number]: string } = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
}

export const WalkInTab = () => {
    const [selectedTemplate, setSelectedTemplate] = useState('quick');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleCreateTemplate = (templateData: any) => {
        console.log("New template created:", templateData);
        // Here you would typically update a state with the new template
    };
    
    const currentTemplate = formTemplates.find(t => t.id === selectedTemplate);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Form Templates</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         {formTemplates.map(template => (
                            <button key={template.id} onClick={() => setSelectedTemplate(template.id)} className={`w-full flex items-start p-3 rounded-lg border-2 text-left transition-colors ${selectedTemplate === template.id ? 'border-primary bg-primary/5' : 'border-border bg-card hover:bg-muted'}`}>
                                <template.icon className="w-5 h-5 mr-3 mt-1 text-primary" />
                                <div>
                                    <p className="font-medium">{template.name}</p>
                                    <p className="text-xs text-muted-foreground">{template.fields}</p>
                                </div>
                            </button>
                         ))}
                         <Button variant="outline" className="w-full" onClick={() => setIsCreateModalOpen(true)}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Create Custom Template
                        </Button>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Walk-in Form Preview (Mobile)</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center bg-muted p-4 rounded-lg">
                        <div className="w-full max-w-sm bg-background p-6 rounded-2xl shadow-lg border">
                             <div className="text-center mb-4">
                                <h3 className="font-semibold text-lg">{currentTemplate?.name || 'Walk-in Lead Capture'}</h3>
                                <p className="text-sm text-muted-foreground">{currentTemplate?.description || 'Property Site: Prestige Lakeside'}</p>
                            </div>
                            <div className="space-y-4">
                                 <div className="space-y-1">
                                    <Label htmlFor="walkin-name">Name</Label>
                                    <Input id="walkin-name" placeholder="Full Name" />
                                 </div>
                                <div className="space-y-1">
                                    <Label htmlFor="walkin-phone">Phone</Label>
                                    <Input id="walkin-phone" placeholder="Phone Number" />
                                 </div>
                                {selectedTemplate !== 'quick' && (
                                    <>
                                        <div className="space-y-1">
                                            <Label htmlFor="walkin-email">Email (Optional)</Label>
                                            <Input id="walkin-email" type="email" placeholder="Email Address" />
                                        </div>
                                    </>
                                )}
                                {(selectedTemplate === 'detailed' || selectedTemplate === 'event') && (
                                     <div className="space-y-1">
                                        <Label htmlFor="walkin-company">Company</Label>
                                        <Input id="walkin-company" placeholder="Company Name" />
                                     </div>
                                )}
                                 {selectedTemplate === 'detailed' && (
                                     <>
                                         <div className="space-y-1">
                                            <Label>Source</Label>
                                            <Select>
                                                <SelectTrigger><SelectValue placeholder="Select source" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="walk-in">Walk-in</SelectItem>
                                                    <SelectItem value="event">Event</SelectItem>
                                                    <SelectItem value="referral">Referral</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                         <div className="space-y-2">
                                            <Label>Property Interest</Label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex items-center space-x-2"><Checkbox id="int-villa" /><Label htmlFor="int-villa" className="font-normal">Villa</Label></div>
                                                <div className="flex items-center space-x-2"><Checkbox id="int-3bhk" /><Label htmlFor="int-3bhk" className="font-normal">3BHK</Label></div>
                                                <div className="flex items-center space-x-2"><Checkbox id="int-plot" /><Label htmlFor="int-plot" className="font-normal">Plot</Label></div>
                                                <div className="flex items-center space-x-2"><Checkbox id="int-comm" /><Label htmlFor="int-comm" className="font-normal">Commercial</Label></div>
                                            </div>
                                        </div>
                                     </>
                                 )}
                                <Button className="w-full">
                                    <Check className="mr-2 h-4 w-4" /> Submit Lead
                                </Button>
                                <p className="text-xs text-center text-muted-foreground pt-2">Offline mode enabled. Form will sync when connection is restored.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Walk-in Leaderboard</CardTitle>
                    <CardDescription>Top performing agents by walk-in captures this month.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16">Rank</TableHead>
                                <TableHead>Agent</TableHead>
                                <TableHead className="text-right">Walk-ins</TableHead>
                                <TableHead className="text-right">Conversion Rate</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {walkInLeaderboard.map((agent) => (
                                <TableRow key={agent.rank}>
                                    <TableCell className="font-bold text-lg">{rankMedals[agent.rank] || `#${agent.rank}`}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={getImagePlaceholder(agent.avatarId)?.imageUrl} />
                                                <AvatarFallback>{agent.agent.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{agent.agent}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-medium">{agent.walkins}</TableCell>
                                    <TableCell className="text-right text-green-500 font-medium">{agent.conversion}%</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <CreateWalkInTemplateModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)}
                onSave={handleCreateTemplate}
            />
        </div>
    );
};
