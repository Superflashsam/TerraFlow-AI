"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Zap, MoveRight } from 'lucide-react';

const mockRules = [
    { trigger: 'Lead score exceeds 80', action: 'Add to "Hot Leads" drip sequence' },
    { trigger: 'Property "Luxury Villa" viewed', action: 'Send "Villa Follow-up" email' },
    { trigger: 'Email link "schedule_visit" clicked', action: 'Notify assigned agent' },
]

export const AutomationTab = () => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Automation Rules</CardTitle>
                            <CardDescription>Set up trigger-based automations to streamline your email marketing.</CardDescription>
                        </div>
                        <Button><PlusCircle className="mr-2 h-4 w-4" /> Create New Rule</Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {mockRules.map((rule, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-4">
                                <Zap className="text-yellow-500" />
                                <div>
                                    <p className="font-medium text-sm">When: <span className="font-normal text-muted-foreground">{rule.trigger}</span></p>
                                    <p className="font-medium text-sm">Then: <span className="font-normal text-muted-foreground">{rule.action}</span></p>
                                </div>
                            </div>
                            <Button variant="ghost">Edit Rule</Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Create a New Automation Rule</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-sm font-medium">When...</label>
                        <Select>
                            <SelectTrigger><SelectValue placeholder="Select a trigger" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="lead_created">Lead is Created</SelectItem>
                                <SelectItem value="stage_changed">Stage is Changed</SelectItem>
                                <SelectItem value="property_viewed">Property is Viewed</SelectItem>
                                <SelectItem value="email_opened">Email is Opened</SelectItem>
                                <SelectItem value="link_clicked">Link is Clicked</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <MoveRight className="text-muted-foreground mt-6"/>
                     <div className="flex-1 space-y-2">
                        <label className="text-sm font-medium">Then...</label>
                        <Select>
                            <SelectTrigger><SelectValue placeholder="Select an action" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="send_email">Send an Email</SelectItem>
                                <SelectItem value="add_to_drip">Add to Drip Sequence</SelectItem>
                                <SelectItem value="update_field">Update Lead Field</SelectItem>
                                <SelectItem value="notify_team">Notify Team Member</SelectItem>
                                <SelectItem value="add_tag">Add a Tag</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="mt-6">Create Rule</Button>
                </CardContent>
            </Card>
        </div>
    )
}
