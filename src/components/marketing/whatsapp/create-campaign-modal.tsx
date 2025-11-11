
"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronLeft, ChevronRight, X, MessageSquare } from 'lucide-react';

const steps = [
    { id: 1, title: 'Campaign Details' },
    { id: 2, title: 'Audience Selection' },
    { id: 3, title: 'Message Creation' },
    { id: 4, title: 'Review & Send' }
];

export const CreateCampaignModal = ({ isOpen, onClose, campaign, onSave }: { isOpen: boolean, onClose: () => void, campaign?: any, onSave: (data: any) => void }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        if(campaign) {
            setFormData(campaign);
        } else {
             setFormData({
                name: '',
                goal: '',
                schedule: 'now',
             });
        }
    }, [campaign]);
    
    const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
    const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));
    
    const StepContent = () => {
        switch(currentStep) {
            case 1: return <Step1 formData={formData} setFormData={setFormData} />;
            case 2: return <Step2 formData={formData} setFormData={setFormData} />;
            case 3: return <Step3 formData={formData} setFormData={setFormData} />;
            case 4: return <Step4 formData={formData} />;
            default: return null;
        }
    }

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2"><MessageSquare /> {campaign ? "Edit" : "Create"} WhatsApp Campaign</DialogTitle>
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
                        <Button onClick={handleSave}>{campaign ? "Save Changes" : "Confirm & Launch"}</Button>
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

const Step1 = ({ formData, setFormData }: { formData: any, setFormData: (data: any) => void }) => (
    <div className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="campaign-name">Campaign Name</Label>
            <Input id="campaign-name" placeholder="e.g., Q4 Festive Offer" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        <div className="space-y-2">
            <Label htmlFor="campaign-goal">Campaign Goal</Label>
             <Select value={formData.goal} onValueChange={(value) => setFormData({...formData, goal: value})}>
              <SelectTrigger><SelectValue placeholder="Select a goal" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="brand_awareness">Brand Awareness</SelectItem>
                <SelectItem value="lead_nurture">Lead Nurture</SelectItem>
                <SelectItem value="re_engagement">Re-engagement</SelectItem>
                <SelectItem value="promotion">Promotion</SelectItem>
                <SelectItem value="site_visit_drive">Site Visit Drive</SelectItem>
              </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
            <Label>Schedule</Label>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2"><input type="radio" name="schedule" checked={formData.schedule === 'now'} onChange={() => setFormData({...formData, schedule: 'now'})} /> <Label>Send Now</Label></div>
                <div className="flex items-center space-x-2"><input type="radio" name="schedule" checked={formData.schedule !== 'now'} onChange={() => setFormData({...formData, schedule: 'later'})} /> <Label>Schedule for Later</Label></div>
            </div>
        </div>
    </div>
);

const Step2 = ({ formData, setFormData }: { formData: any, setFormData: (data: any) => void }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
             <div className="space-y-2">
                <Label>Lead Score</Label>
                <Slider defaultValue={[80]} max={100} step={1} />
                <p className="text-sm text-muted-foreground">80 and above</p>
            </div>
             <div className="space-y-2">
                <Label>Lead Stage</Label>
                 <div className="flex flex-wrap gap-2">
                    {['New', 'Contacted', 'Qualified', 'Proposal'].map(stage => (
                        <Badge key={stage} variant="outline">{stage}</Badge>
                    ))}
                 </div>
            </div>
            <div className="space-y-2">
                <Label>Location</Label>
                 <div className="flex flex-wrap gap-2">
                    {['Whitefield', 'HSR', 'Koramangala'].map(loc => (
                        <Badge key={loc} variant="outline">{loc}</Badge>
                    ))}
                 </div>
            </div>
        </div>
        <div>
            <h4 className="font-semibold mb-2">Audience Preview</h4>
            <div className="bg-muted p-4 rounded-lg">
                <p className="font-bold text-lg">247 leads match criteria</p>
                <ul className="text-sm text-muted-foreground mt-2 list-disc list-inside">
                    <li>Rajesh Kumar</li>
                    <li>Priya Sharma</li>
                    <li>Amit Patel</li>
                    <li>...and 244 others</li>
                </ul>
            </div>
        </div>
    </div>
);

const Step3 = ({ formData, setFormData }: { formData: any, setFormData: (data: any) => void }) => (
     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
             <div className="space-y-2">
                <Label>WhatsApp Template</Label>
                 <Select>
                    <SelectTrigger><SelectValue placeholder="Select a template" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="template1">Property Launch (Approved)</SelectItem>
                        <SelectItem value="template2">Site Visit Reminder (Approved)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label>Variable Mapping</Label>
                <div className="space-y-2 text-sm">
                    <p>&#123;&#123;name&#125;&#125; &rarr; Lead first name</p>
                    <p>&#123;&#123;property&#125;&#125; &rarr; Property title</p>
                    <p>&#123;&#123;agent&#125;&#125; &rarr; Assigned agent name</p>
                </div>
            </div>
            <div>
                 <Label>Media (Optional)</Label>
                 <Input type="file" />
            </div>
            <div>
                 <Label>Buttons (Optional)</Label>
                 <div className="space-y-2">
                    <Input placeholder="Button 1: View Property (URL)" />
                    <Input placeholder="Button 2: Schedule Visit (Quick Reply)" />
                 </div>
            </div>
        </div>
        <div>
            <h4 className="font-semibold mb-2">Message Preview</h4>
            <div className="bg-green-100 p-4 rounded-lg">
                <div className="bg-white p-3 rounded-md shadow-sm max-w-sm">
                    <p className="text-sm">Hello &#123;Rajesh&#125;, excited to share our new property: &#123;Whitefield 3BHK&#125;! Your agent &#123;Priya&#125; is available to help. Tap below to learn more!</p>
                    <div className="border-t mt-3 pt-2 space-y-1">
                        <Button variant="outline" size="sm" className="w-full justify-center bg-gray-200">View Property</Button>
                        <Button variant="outline" size="sm" className="w-full justify-center bg-gray-200">Schedule Visit</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Step4 = ({formData}: {formData: any}) => (
    <div className="space-y-4">
        <h3 className="font-semibold text-lg">Review Campaign</h3>
        <div className="bg-muted p-4 rounded-lg space-y-2">
            <p><strong>Campaign:</strong> {formData.name || 'Q4 Festive Offer'}</p>
            <p><strong>Audience:</strong> {formData.audience || '247 hot leads'}</p>
            <p><strong>Message:</strong> Using template "Property Launch"</p>
            <p><strong>Schedule:</strong> {formData.schedule === 'now' ? 'Send Now' : 'Scheduled'}</p>
            <p><strong>Estimated Cost:</strong> ₹2,470 (₹10 per message)</p>
            <div className="flex items-center space-x-4 pt-2">
                <p className="flex items-center gap-1 text-green-600"><Check size={16}/>WABA approved</p>
                <p className="flex items-center gap-1 text-green-600"><Check size={16}/>DND filter applied</p>
            </div>
        </div>
        <div className="flex items-center space-x-2">
            <Input placeholder="Your WhatsApp number" />
            <Button variant="secondary">Send Test Message</Button>
        </div>
    </div>
);
