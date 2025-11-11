
"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check, ChevronLeft, ChevronRight, Download, Eye, Palette, QrCode } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
    { id: 1, title: 'Campaign Details' },
    { id: 2, title: 'Lead Capture Form' },
    { id: 3, title: 'Source & Attribution' },
    { id: 4, title: 'QR Code Generation' },
    { id: 5, title: 'Review & Launch' },
];

export const CreateQrCampaignModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [currentStep, setCurrentStep] = useState(1);
    
    const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
    const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));
    
    const StepContent = () => {
        switch(currentStep) {
            case 1: return <Step1 />;
            case 2: return <Step2 />;
            case 3: return <Step3 />;
            case 4: return <Step4 />;
            case 5: return <Step5 />;
            default: return null;
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2"><QrCode /> Create QR Campaign</DialogTitle>
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
                        <Button onClick={onClose}>Create & Download</Button>
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
    <div className="space-y-4 max-w-xl mx-auto">
        <div className="space-y-2">
            <Label htmlFor="campaign-name">Campaign Name</Label>
            <Input id="campaign-name" placeholder="e.g., Property Expo - Whitefield" />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Campaign Type</Label>
                <Select>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="print">Print Media</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="billboard">Billboard</SelectItem>
                        <SelectItem value="brochure">Brochure</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="venue">Publication / Venue</Label>
                <Input id="venue" placeholder="e.g., Times of India" />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="date" />
            </div>
            <div className="space-y-2">
                <Label>End Date</Label>
                <Input type="date" />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., Bangalore, Whitefield" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="budget">Budget (Optional)</Label>
                <Input id="budget" type="number" placeholder="e.g., 250000" />
            </div>
        </div>
    </div>
);


const Step2 = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
            <h3 className="font-semibold">Form Fields</h3>
            <div className="space-y-2 p-4 border rounded-lg bg-muted/50">
                <p className="font-medium text-sm">Default Fields (Included)</p>
                <p className="text-sm text-muted-foreground">Name, Phone, Email</p>
            </div>
             <div className="space-y-4">
                <p className="font-medium text-sm">Optional Fields</p>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2"><Checkbox id="f-budget"/> <Label htmlFor="f-budget" className="font-normal">Budget Range</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="f-type"/> <Label htmlFor="f-type" className="font-normal">Property Type</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="f-location"/> <Label htmlFor="f-location" className="font-normal">Location Preference</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="f-timeline"/> <Label htmlFor="f-timeline" className="font-normal">Timeline</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="f-notes"/> <Label htmlFor="f-notes" className="font-normal">Additional Notes</Label></div>
                </div>
            </div>
        </div>
         <div className="space-y-6">
            <h3 className="font-semibold">Form Customization</h3>
            <div className="space-y-2">
                <Label htmlFor="form-title">Form Title</Label>
                <Input id="form-title" defaultValue="Interested in Our Properties?" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="thank-you">Thank You Message</Label>
                <Textarea id="thank-you" defaultValue="Thanks! Our team will contact you shortly." />
            </div>
            <div className="space-y-2">
                <Label htmlFor="redirect-url">Redirect URL (Optional)</Label>
                <Input id="redirect-url" placeholder="https://terraflow.ai/thank-you" />
            </div>
        </div>
    </div>
);

const Step3 = () => (
    <div className="space-y-4 max-w-xl mx-auto">
        <div className="space-y-2">
            <Label>Lead Source</Label>
            <Select defaultValue="event">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="print">Print Media</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="walkin">Walk-in</SelectItem>
                    <Button variant="link" className="w-full justify-start text-sm p-2">Create New Source</Button>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
            <Label htmlFor="sub-source">Sub-source</Label>
            <Input id="sub-source" placeholder="e.g., TOI Full Page Nov 2025" />
        </div>
        <div className="space-y-2">
            <Label>Tags</Label>
            <Input placeholder="e.g., Q4-2025, Whitefield, Premium" />
        </div>
        <div className="space-y-2">
            <Label>Auto-assign to</Label>
            <Select defaultValue="priya-sharma">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="priya-sharma">Priya Sharma</SelectItem>
                    <SelectItem value="rajesh-kumar">Rajesh Kumar</SelectItem>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
);

const Step4 = () => (
     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>Destination URL (Auto-generated)</Label>
                <Input readOnly value="https://terraflow.ai/qr/cl-nov-expo-25" />
            </div>
            <div className="space-y-2">
                <Label>Size</Label>
                <RadioGroup defaultValue="medium" className="flex space-x-4">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="small" id="s-small" /><Label htmlFor="s-small">Small</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="medium" id="s-medium" /><Label htmlFor="s-medium">Medium</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="large" id="s-large" /><Label htmlFor="s-large">Large</Label></div>
                </RadioGroup>
            </div>
             <div className="space-y-2">
                <Label>Style</Label>
                <RadioGroup defaultValue="branded" className="flex space-x-4">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="standard" id="st-standard" /><Label htmlFor="st-standard">Standard</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="branded" id="st-branded" /><Label htmlFor="st-branded">Branded</Label></div>
                </RadioGroup>
            </div>
             <div className="space-y-2">
                <Label>Color</Label>
                <div className="flex items-center gap-2">
                    <Input type="color" defaultValue="#00B37E" className="w-12 h-10 p-1" />
                    <Input readOnly value="#00B37E" />
                </div>
            </div>
            <div className="space-y-2">
                <Label>Add Logo</Label>
                <Input type="file" />
            </div>
        </div>
        <div>
            <Label className="block mb-2">QR Code Preview</Label>
            <Card className="p-4 flex flex-col items-center gap-4">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=Example&color=00b37e" alt="QR Code Preview"/>
                <div className="grid grid-cols-2 gap-2 w-full">
                    <Button variant="outline" className="w-full"><Download className="mr-2 h-4 w-4"/> PNG</Button>
                    <Button variant="outline" className="w-full"><Download className="mr-2 h-4 w-4"/> SVG</Button>
                    <Button variant="outline" className="w-full"><Download className="mr-2 h-4 w-4"/> PDF</Button>
                    <Button variant="outline" className="w-full"><Download className="mr-2 h-4 w-4"/> EPS</Button>
                </div>
            </Card>
        </div>
    </div>
);

const Step5 = () => (
    <div className="space-y-6 max-w-2xl mx-auto">
        <h3 className="font-semibold">Review Campaign</h3>
        <Card>
            <CardContent className="p-6 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Name:</span><span className="font-medium">Property Expo - Whitefield</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Type:</span><span className="font-medium">Event</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Date:</span><span className="font-medium">Dec 1 - Dec 3, 2025</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Form Title:</span><span className="font-medium">Interested in Our Properties?</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Lead Source:</span><span className="font-medium">Event / Whitefield Expo</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Assigned to:</span><span className="font-medium">Priya Sharma</span></div>
            </CardContent>
        </Card>
         <div className="text-center">
            <p className="font-medium mb-2">Test your QR Code</p>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example&color=00b37e" alt="QR Code Preview" className="mx-auto border p-2 rounded-lg" />
            <p className="text-xs text-muted-foreground mt-2">Scan with your phone to test the lead capture form.</p>
        </div>
    </div>
);
