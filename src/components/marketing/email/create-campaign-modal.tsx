
"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, ChevronLeft, ChevronRight, Mail, Users, HardDrive, Share2, Move, Image as ImageIcon, Type, Divide, AppWindow, Smartphone, Sun, Moon, Eye, Send, Code, Rows } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';


const steps = [
    { id: 1, title: 'Campaign Setup' },
    { id: 2, title: 'Audience Selection' },
    { id: 3, title: 'Email Design' },
    { id: 4, title: 'Review & Schedule' }
];

export const CreateCampaignModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [currentStep, setCurrentStep] = useState(1);
    
    const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
    const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));
    
    const StepContent = () => {
        switch(currentStep) {
            case 1: return <Step1 />;
            case 2: return <Step2 />;
            case 3: return <Step3 />;
            case 4: return <div className="text-center py-8 text-muted-foreground">Review and scheduling options coming soon.</div>;
            default: return null;
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2"><Mail /> Create Email Campaign</DialogTitle>
                    <DialogDescription>Step {currentStep} of {steps.length}: {steps[currentStep-1].title}</DialogDescription>
                </DialogHeader>
                
                <div className="px-6 py-4 border-y">
                  <div className="flex items-center">
                    {steps.map((step, index) => (
                      <React.Fragment key={step.id}>
                        <div className="flex items-center">
                           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep > step.id ? 'bg-green-500 text-white' : currentStep === step.id ? 'bg-primary text-white' : 'bg-muted'}`}>
                            {currentStep > step.id ? <Check size={16} /> : step.id}
                           </div>
                           <span className={`ml-2 text-sm font-medium ${currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'}`}>{step.title}</span>
                        </div>
                        {index < steps.length - 1 && <div className="flex-1 h-px bg-border mx-4" />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="p-6 flex-1 overflow-y-auto">
                    <StepContent />
                </div>

                <DialogFooter className="justify-between">
                    <Button variant="outline" onClick={handlePrev} disabled={currentStep === 1}>
                        <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                    </Button>
                    {currentStep === steps.length ? (
                        <Button onClick={onClose}>Confirm & Launch</Button>
                    ) : (
                        <Button onClick={handleNext}>
                            Next <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

const Step1 = () => (
    <div className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="campaign-name">Campaign Name</Label>
            <Input id="campaign-name" placeholder="e.g., Q4 Festive Offer" />
        </div>
        <div className="space-y-2">
            <Label>Campaign Type</Label>
            <RadioGroup defaultValue="one-time" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="one-time" id="one-time" />
                    <Label htmlFor="one-time">One-time Blast</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="drip" id="drip" />
                    <Label htmlFor="drip">Drip Sequence</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="automated" id="automated" />
                    <Label htmlFor="automated">Automated Trigger</Label>
                </div>
            </RadioGroup>
        </div>
        <div className="space-y-2">
            <Label htmlFor="campaign-goal">Campaign Goal</Label>
             <Select>
              <SelectTrigger><SelectValue placeholder="Select a goal" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="lead_nurture">Lead Nurture</SelectItem>
                <SelectItem value="promotion">Promotion</SelectItem>
                <SelectItem value="re_engagement">Re-engagement</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="event">Event Invitation</SelectItem>
              </SelectContent>
            </Select>
        </div>
    </div>
);

const Step2 = () => {
    const [score, setScore] = useState(80);
    const sampleLeads = [
        { name: 'Rajesh Kumar', email: 'rajesh.k@example.com', score: 95 },
        { name: 'Priya Sharma', email: 'priya.s@example.com', score: 92 },
        { name: 'Amit Patel', email: 'amit.p@example.com', score: 88 },
        { name: 'Sunita Reddy', email: 'sunita.r@example.com', score: 85 },
        { name: 'Vikram Singh', email: 'vikram.s@example.com', score: 82 },
    ];
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader><CardTitle className="text-base">Lead Attributes</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Lead Score</Label>
                            <div className="flex items-center gap-4">
                                <Slider value={[score]} onValueChange={(val) => setScore(val[0])} max={100} step={1} />
                                <span className="text-sm font-medium w-24 text-right">{score} and above</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Lead Stage</Label>
                            <div className="grid grid-cols-3 gap-2">
                                {['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation'].map(stage => (
                                    <div key={stage} className="flex items-center space-x-2">
                                        <Checkbox id={`stage-${stage}`} />
                                        <Label htmlFor={`stage-${stage}`} className="text-sm font-normal">{stage}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle className="text-base">Behavior & Source</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Engagement Level</Label>
                            <RadioGroup defaultValue="active" className="flex space-x-4">
                                <div className="flex items-center space-x-2"><RadioGroupItem value="active" id="active" /><Label htmlFor="active" className="font-normal">Active</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="inactive-30" id="inactive-30" /><Label htmlFor="inactive-30" className="font-normal">Inactive (30d)</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="inactive-90" id="inactive-90" /><Label htmlFor="inactive-90" className="font-normal">Inactive (90d+)</Label></div>
                            </RadioGroup>
                        </div>
                        <div className="space-y-2">
                            <Label>Lead Source</Label>
                            <Input placeholder="e.g. 99acres, Website" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle className="text-base">Exclusions</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex items-center space-x-2"><Checkbox id="exclude-previous" /><Label htmlFor="exclude-previous" className="font-normal">Exclude recipients of last 3 campaigns</Label></div>
                        <div className="flex items-center space-x-2"><Checkbox id="exclude-unsubscribed" defaultChecked disabled /><Label htmlFor="exclude-unsubscribed" className="font-normal">Exclude unsubscribed contacts</Label></div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <Card className="bg-muted/50">
                    <CardHeader className="flex-row items-center justify-between">
                        <CardTitle className="text-base">Audience Preview</CardTitle>
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            <p className="text-xl font-bold text-primary">892</p>
                            <p className="text-sm text-muted-foreground">leads match</p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-right">Score</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sampleLeads.map(lead => (
                                    <TableRow key={lead.email}>
                                        <TableCell>{lead.name}</TableCell>
                                        <TableCell>{lead.email}</TableCell>
                                        <TableCell className="text-right">{lead.score}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <div className="flex items-center space-x-2 pt-4">
                    <Checkbox id="save-segment" />
                    <Label htmlFor="save-segment" className="font-normal">Save this audience as a new segment</Label>
                </div>
            </div>
        </div>
    );
};


const Step3 = () => {
    const [view, setView] = useState('desktop');

    const builderComponents = [
        { name: 'Text', icon: Type },
        { name: 'Image', icon: ImageIcon },
        { name: 'Button', icon: AppWindow },
        { name: 'Divider', icon: Divide },
        { name: 'Socials', icon: Share2 },
        { name: 'Property Card', icon: HardDrive },
        { name: 'Spacer', icon: Rows },
    ];

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="template-selector">Start with a template</Label>
                <Select>
                    <SelectTrigger id="template-selector">
                        <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="blank">Blank Canvas</SelectItem>
                        <SelectItem value="showcase">Property Showcase</SelectItem>
                        <SelectItem value="newsletter">Newsletter</SelectItem>
                        <SelectItem value="promotional">Promotional Offer</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex gap-6 h-[60vh]">
                {/* Components Sidebar */}
                <div className="w-48 bg-muted/50 p-4 rounded-lg flex-shrink-0">
                    <h4 className="font-semibold mb-4 text-sm">Components</h4>
                    <div className="space-y-2">
                        {builderComponents.map(comp => (
                            <div key={comp.name} className="flex items-center p-2 rounded-md bg-background border hover:bg-accent cursor-grab">
                                <comp.icon className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span className="text-sm">{comp.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Email Canvas */}
                <div className="flex-1 space-y-4">
                    <Card>
                        <CardContent className="p-4 space-y-2">
                            <Label>Subject Line</Label>
                            <Input placeholder="Your amazing email subject" />
                            <Label>Preview Text</Label>
                            <Input placeholder="A catchy preview to grab attention" />
                        </CardContent>
                    </Card>
                    <Card className="flex-1">
                        <CardContent className="p-4 bg-gray-100 dark:bg-gray-900 h-full">
                            <div className="bg-white dark:bg-black p-6 mx-auto max-w-lg shadow-lg">
                                <p className="text-center mb-4">Email Canvas Area</p>
                                <div className="border border-dashed border-border rounded-lg p-8 text-center text-muted-foreground">
                                    Drag components here
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview & Settings Sidebar */}
                <div className="w-72 bg-muted/50 p-4 rounded-lg flex-shrink-0">
                    <h4 className="font-semibold mb-4 text-sm">Preview</h4>
                    <div className="flex items-center justify-center gap-2 mb-4 bg-background p-1 rounded-md">
                        <Button size="sm" variant={view === 'desktop' ? 'secondary' : 'ghost'} onClick={() => setView('desktop')}><AppWindow className="h-4 w-4" /></Button>
                        <Button size="sm" variant={view === 'mobile' ? 'secondary' : 'ghost'} onClick={() => setView('mobile')}><Smartphone className="h-4 w-4" /></Button>
                        <Button size="sm" variant={view === 'dark' ? 'secondary' : 'ghost'} onClick={() => setView('dark')}><Moon className="h-4 w-4" /></Button>
                    </div>
                    <div className="border rounded-lg p-2 bg-background aspect-[9/16] max-w-[250px] mx-auto overflow-y-auto">
                    <p className="text-xs text-center text-muted-foreground">Live email preview</p>
                    </div>
                    <div className="mt-4">
                        <Button variant="outline" className="w-full"><Send className="mr-2 h-4 w-4" /> Send Test Email</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
