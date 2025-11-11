"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Repeat, Zap, Mail, Clock, GitBranch, PlusCircle, Trash2, Edit } from 'lucide-react';

const initialSequence = [
    { id: 1, type: 'email', title: 'Welcome & Introduction', content: 'Email 1 content...' },
    { id: 2, type: 'delay', duration: 2, unit: 'days' },
    { id: 3, type: 'email', title: 'Property Recommendations', content: 'Email 2 content...' },
    { id: 4, type: 'delay', duration: 3, unit: 'days' },
    { id: 5, type: 'email', title: 'Success Stories & Testimonials', content: 'Email 3 content...' },
    { id: 6, type: 'delay', duration: 4, unit: 'days' },
    { id: 7, type: 'email', title: 'Exclusive Offer', content: 'Email 4 content...' },
    { id: 8, type: 'delay', duration: 5, unit: 'days' },
    { id: 9, type: 'email', title: 'Last Chance Reminder', content: 'Email 5 content...' },
];

const StepIcon = ({ type }: { type: string }) => {
    let Icon;
    switch(type) {
        case 'email': Icon = Mail; break;
        case 'delay': Icon = Clock; break;
        case 'condition': Icon = GitBranch; break;
        default: Icon = Mail;
    }
    return <Icon className="h-5 w-5 text-primary" />;
}

export const CreateDripSequenceModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [sequenceName, setSequenceName] = useState('New Lead Nurture Sequence');
    const [trigger, setTrigger] = useState('lead_created');
    const [sequence, setSequence] = useState(initialSequence);

    const addStep = (type: string) => {
        const newStep = type === 'email' 
            ? { id: Date.now(), type, title: 'New Email', content: '' }
            : { id: Date.now(), type, duration: 1, unit: 'days' };
        setSequence([...sequence, newStep]);
    };

    const removeStep = (id: number) => {
        setSequence(sequence.filter(step => step.id !== id));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2"><Repeat /> Create Drip Sequence</DialogTitle>
                    <DialogDescription>Build an automated email series to nurture your leads.</DialogDescription>
                </DialogHeader>

                <div className="p-6 flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Panel: Settings */}
                    <div className="md:col-span-1 space-y-6">
                        <Card>
                            <CardHeader><CardTitle className="text-base">Sequence Setup</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="sequence-name">Sequence Name</Label>
                                    <Input id="sequence-name" value={sequenceName} onChange={(e) => setSequenceName(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="trigger">Trigger</Label>
                                    <Select value={trigger} onValueChange={setTrigger}>
                                        <SelectTrigger id="trigger"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="lead_created">Lead is Created</SelectItem>
                                            <SelectItem value="lead_stage_reaches">Lead Reaches Stage...</SelectItem>
                                            <SelectItem value="lead_score_exceeds">Lead Score Exceeds...</SelectItem>
                                            <SelectItem value="property_viewed">Property is Viewed</SelectItem>
                                            <SelectItem value="form_submitted">Form is Submitted</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                             <CardHeader><CardTitle className="text-base">Add Step</CardTitle></CardHeader>
                             <CardContent className="space-y-2">
                                <Button variant="outline" className="w-full justify-start" onClick={() => addStep('email')}><Mail className="mr-2 h-4 w-4"/>Add Email</Button>
                                <Button variant="outline" className="w-full justify-start" onClick={() => addStep('delay')}><Clock className="mr-2 h-4 w-4"/>Add Delay</Button>
                                <Button variant="outline" className="w-full justify-start" onClick={() => addStep('condition')}><GitBranch className="mr-2 h-4 w-4"/>Add Condition</Button>
                             </CardContent>
                        </Card>
                    </div>

                    {/* Right Panel: Timeline */}
                    <div className="md:col-span-2">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Zap className="h-6 w-6 text-yellow-500" />
                                <div>
                                    <p className="font-semibold">Trigger</p>
                                    <p className="text-sm text-muted-foreground">{trigger.replace(/_/g, ' ')}</p>
                                </div>
                            </div>

                            {sequence.map((step, index) => (
                                <div key={step.id}>
                                    <div className="h-8 w-px bg-border ml-3" />
                                    <div className="flex items-center gap-4">
                                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                                            <StepIcon type={step.type} />
                                        </div>
                                        <Card className="flex-1">
                                            <CardContent className="p-3 flex items-center justify-between">
                                                {step.type === 'email' && <p className="font-medium text-sm">{step.title}</p>}
                                                {step.type === 'delay' && <p className="text-sm">Wait for {step.duration} {step.unit}</p>}
                                                {step.type === 'condition' && <p className="text-sm">If/Then Condition</p>}
                                                <div className="flex items-center">
                                                  <Button variant="ghost" size="icon" className="h-8 w-8"><Edit size={14}/></Button>
                                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeStep(step.id)}><Trash2 size={14}/></Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={onClose}><PlusCircle className="mr-2 h-4 w-4"/>Save & Activate Sequence</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
