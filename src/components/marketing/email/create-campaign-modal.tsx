
"use client";

import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, ChevronLeft, ChevronRight, Mail, Users, HardDrive, Share2, Move, ImageIcon, Type, Divide, AppWindow, Smartphone, Sun, Moon, Eye, Send, Code, Rows, Plus, GripVertical, Trash2, Sparkles } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { generatePropertyDescription } from '@/ai/flows/generate-property-description'; // We'll adapt this for email generation
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
            <DialogContent className="max-w-7xl h-[95vh] flex flex-col">
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
                    <DndProvider backend={HTML5Backend}>
                        <StepContent />
                    </DndProvider>
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
            {/* Left Side - Filters */}
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
                        <div className="space-y-2">
                            <Label>Property Interest</Label>
                            <Input placeholder="e.g. 3BHK, Villa" />
                        </div>
                         <div className="space-y-2">
                            <Label>Location</Label>
                            <Input placeholder="e.g. Whitefield, KR Puram" />
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

            {/* Right Side - Preview */}
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

const DroppedComponent = ({ item, index, removeComponent }: any) => {
    const renderContent = () => {
        switch(item.type) {
            case 'text': return <Textarea defaultValue={item.content} className="w-full" />;
            case 'image': return <img src={item.content} alt="preview" className="w-full rounded"/>;
            case 'button': return <Button className="w-full">{item.content}</Button>;
            case 'divider': return <hr className="border-border my-2"/>;
            case 'property': return <div className="p-4 border rounded-lg text-sm text-muted-foreground">Property Card Placeholder</div>;
            default: return null;
        }
    }
  
    return (
      <div className="relative bg-background p-2 rounded group">
        <div className="absolute top-1 right-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => removeComponent(index)}><Trash2 size={14} /></Button>
        </div>
        {renderContent()}
      </div>
    );
};


const Step3 = () => {
    const { toast } = useToast();
    const [emailContent, setEmailContent] = useState<any[]>([]);
    const [subject, setSubject] = useState("Exclusive NEO 3BHK Launch in Whitefield");
    const [previewText, setPreviewText] = useState("Don't miss out on our exclusive pre-launch offer!");
    const [fromName, setFromName] = useState("TerraFlow Realty");
    const [fromEmail, setFromEmail] = useState("info@terraflow.ai");
    const [view, setView] = useState('desktop');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [template, setTemplate] = useState('blank');
    const [showFullPreview, setShowFullPreview] = useState(false);

    const components = [
        { id: 'text', type: 'text', icon: Type, label: 'Text', defaultContent: 'This is a new text block. You can personalize it using {{first_name}}.' },
        { id: 'image', type: 'image', icon: ImageIcon, label: 'Image', defaultContent: 'https://picsum.photos/seed/realestate/600/300' },
        { id: 'button', type: 'button', icon: AppWindow, label: 'Button', defaultContent: 'View Property' },
        { id: 'divider', type: 'divider', icon: Divide, label: 'Divider' },
        { id: 'property', type: 'property', icon: Rows, label: 'Property Card' },
    ];
    
    const addComponent = (type: string, defaultContent?: string) => {
      setEmailContent(prev => [...prev, { id: Date.now(), type, content: defaultContent || '' }]);
    };

    const removeComponent = (index: number) => {
        setEmailContent(prev => prev.filter((_, i) => i !== index));
    };

    const handleGenerate = async () => {
      setIsLoading(true);
      try {
        const result = await generatePropertyDescription({
          propertyType: "3BHK Apartment",
          location: "Whitefield",
          bedrooms: 3,
          bathrooms: 2,
          squareFootage: 1500,
          amenities: "Pool, Gym",
          uniqueFeatures: "Smart home enabled",
          targetAudience: "Young Professionals",
          style: "Luxurious",
          socialMediaPlatform: "Email"
        });
        setEmailContent([{ id: Date.now(), type: 'text', content: result.description }]);
        toast({ title: "Content Generated!", description: "AI has drafted your email content." });
      } catch (error) {
        toast({ variant: "destructive", title: "Generation Failed", description: "Could not generate content." });
      } finally {
        setIsLoading(false);
      }
    };
    
    const renderPreviewContent = (item: any, index: number) => {
        switch(item.type) {
            case 'text': return <p key={index} className="text-sm my-2" dangerouslySetInnerHTML={{ __html: item.content.replace(/{{(.*?)}}/g, `<span class="text-blue-500 font-medium">{<!-- -->{{\$1}}<!-- -->}</span>`) }}></p>;
            case 'image': return <img key={index} src={item.content} alt="preview" className="w-full rounded my-2"/>;
            case 'button': return <div key={index} className="my-4 text-center"><a href="#" className="bg-blue-600 text-white px-6 py-3 rounded-md text-sm no-underline">{item.content}</a></div>;
            case 'divider': return <hr key={index} className="my-4"/>;
            case 'property': return <div key={index} className="p-2 border rounded text-xs my-2">Property Card Placeholder</div>
            default: return null;
        }
    }
    
    return (
        <div className="grid grid-cols-12 gap-6 h-full">
            {/* Left: Editor */}
            <div className="col-span-8 space-y-4 flex flex-col">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="template-selector">Email Template</Label>
                        <Select onValueChange={setTemplate} defaultValue={template}>
                            <SelectTrigger id="template-selector"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="blank">Blank Canvas</SelectItem>
                                <SelectItem value="property-showcase">Property Showcase</SelectItem>
                                <SelectItem value="newsletter">Newsletter</SelectItem>
                                <SelectItem value="promotional">Promotional</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label>Components</Label>
                        <div className="grid grid-cols-5 gap-2">
                            {components.map(c => {
                                const CompIcon = c.icon;
                                return <Button key={c.id} variant="outline" className="flex flex-col h-auto p-2" onClick={() => addComponent(c.type, c.defaultContent)}>
                                    <CompIcon className="h-6 w-6 mb-1" />
                                    <span className="text-xs">{c.label}</span>
                                </Button>
                            })}
                        </div>
                    </div>
                </div>
                
                <Card className="flex-1 flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-base flex justify-between items-center">
                            <span>Email Body</span>
                            <Button onClick={handleGenerate} size="sm" variant="outline" disabled={isLoading}>
                                <Sparkles className="mr-2 h-4 w-4"/>
                                {isLoading ? "Generating..." : "Generate with AI"}
                            </Button>
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                            Use &#123;&#123;first_name&#125;&#125; for personalization.
                        </p>
                    </CardHeader>
                    <CardContent className="border-t pt-4 flex-1">
                        <div className="bg-muted min-h-[400px] rounded-lg p-4 space-y-4">
                             {emailContent.length === 0 ? (
                                <div className="text-center text-muted-foreground py-10">
                                    Click a component to start building your email.
                                </div>
                             ) : (
                                emailContent.filter(item => item).map((item, index) => (
                                   <DroppedComponent key={item.id} item={item} index={index} removeComponent={removeComponent} />
                                ))
                             )}
                        </div>
                    </CardContent>
                </Card>
            </div>
             {/* Right: Preview & Settings */}
            <div className="col-span-4 space-y-4">
                <Card>
                    <CardHeader><CardTitle className="text-base">Subject & Sender</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="subject-line">Subject Line</Label>
                            <Input id="subject-line" value={subject} onChange={(e) => setSubject(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="preview-text">Preview Text</Label>
                            <Input id="preview-text" value={previewText} onChange={(e) => setPreviewText(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="from-name">From Name</Label>
                                <Input id="from-name" value={fromName} onChange={(e) => setFromName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="from-email">From Email</Label>
                                <Input id="from-email" value={fromEmail} onChange={(e) => setFromEmail(e.target.value)} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex justify-between items-center">
                            <span>Live Preview</span>
                            <div className="flex items-center justify-end gap-2">
                                <div className="flex items-center bg-muted p-1 rounded-lg">
                                    <Button size="xs" variant={view === 'desktop' ? 'secondary' : 'ghost'} onClick={() => setView('desktop')}><AppWindow/></Button>
                                    <Button size="xs" variant={view === 'mobile' ? 'secondary' : 'ghost'} onClick={() => setView('mobile')}><Smartphone/></Button>
                                </div>
                                <div className="flex items-center bg-muted p-1 rounded-lg">
                                    <Button size="xs" variant={!isDarkMode ? 'secondary' : 'ghost'} onClick={() => setIsDarkMode(false)}><Sun/></Button>
                                    <Button size="xs" variant={isDarkMode ? 'secondary' : 'ghost'} onClick={() => setIsDarkMode(true)}><Moon/></Button>
                                </div>
                            </div>
                        </CardTitle>
                    </CardHeader>
                     <CardContent className="p-2 bg-muted/50 rounded-b-lg">
                        <div className={cn("mx-auto transition-all", view === 'mobile' ? 'max-w-[320px] h-full' : 'w-full h-full')}>
                             <div className={cn("w-full h-full overflow-y-auto rounded-md p-4", isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black')}>
                                <p className="text-xs text-gray-500">To: &#123;John Doe&#125;</p>
                                <h3 className="text-lg font-bold border-b pb-2 mb-2">{subject}</h3>
                                {emailContent.filter(item => item).map((item, index) => renderPreviewContent(item, index))}
                             </div>
                        </div>
                    </CardContent>
                    <CardFooter className="p-4 flex items-center justify-between">
                         <Button variant="outline" size="sm" onClick={() => setShowFullPreview(true)}><Eye className="mr-2 h-4 w-4"/>Full Preview</Button>
                         <Button variant="outline" size="sm"><Send className="mr-2 h-4 w-4"/>Send Test</Button>
                    </CardFooter>
                </Card>
            </div>
            {showFullPreview && (
                <Dialog open onOpenChange={() => setShowFullPreview(false)}>
                    <DialogContent className="max-w-4xl p-0 border-0">
                         <div className={cn("w-full h-full overflow-y-auto rounded-md p-8", isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black')}>
                            <p className="text-sm text-gray-500">To: &#123;John Doe&#125;</p>
                            <h3 className="text-xl font-bold border-b pb-2 mb-4">{subject}</h3>
                            {emailContent.filter(item => item).map((item, index) => renderPreviewContent(item, index))}
                         </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};
