
"use client";

import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, ChevronLeft, ChevronRight, Mail, Users, HardDrive, Share2, Move, Image as ImageIcon, Type, Divide, AppWindow, Smartphone, Sun, Moon, Eye, Send, Code, Rows, Plus, GripVertical, Trash2 } from 'lucide-react';
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
            case 3: return <DndProvider backend={HTML5Backend}><Step3 /></DndProvider>;
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

const ItemTypes = {
  COMPONENT: 'component',
};

const DraggableComponent = ({ item }: { item: { name: string; icon: React.ElementType } }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.COMPONENT,
    item: { type: item.name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const Icon = item.icon;
  return (
    <div
      ref={drag}
      className="flex items-center p-2 rounded-md bg-background border hover:bg-accent cursor-grab"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Icon className="w-4 h-4 mr-2 text-muted-foreground" />
      <span className="text-sm">{item.name}</span>
    </div>
  );
};

const DroppedComponent = ({ item, index, moveComponent, removeComponent }: { item: any, index: number, moveComponent: any, removeComponent: any }) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
        accept: ItemTypes.COMPONENT,
        hover(draggedItem: { index: number }, monitor) {
            if (!ref.current) return;
            const dragIndex = draggedItem.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
            
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

            moveComponent(dragIndex, hoverIndex);
            draggedItem.index = hoverIndex;
        },
    });

     const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.COMPONENT,
        item: { type: item.type, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    
    drag(drop(ref));

    const renderContent = () => {
        switch (item.type) {
            case 'Text': return <p className="text-sm text-gray-600 dark:text-gray-400">This is a sample text block. You can edit this content.</p>;
            case 'Image': return <img src="https://picsum.photos/seed/mail/500/200" alt="placeholder" className="rounded-md" />;
            case 'Button': return <Button className="w-full">Call to Action</Button>;
            default: return <div>{item.type}</div>;
        }
    };
    
    return (
        <div ref={ref} style={{ opacity: isDragging ? 0 : 1 }} className="relative group p-2 border border-dashed border-transparent hover:border-primary rounded-md">
            <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeComponent(index)}>
                    <Trash2 className="h-4 w-4 text-destructive"/>
                </Button>
                 <Button variant="ghost" size="icon" className="h-6 w-6 cursor-move">
                    <GripVertical className="h-4 w-4"/>
                </Button>
            </div>
            {renderContent()}
        </div>
    )
}

const Step3 = () => {
    const [view, setView] = useState('desktop');
    const [emailContent, setEmailContent] = useState<{ id: number; type: string }[]>([]);

    const [, drop] = useDrop(() => ({
        accept: ItemTypes.COMPONENT,
        drop: (item: { type: string }, monitor) => {
            if (monitor.didDrop()) return;
            addComponent(item.type);
        },
    }));

    const addComponent = (type: string) => {
        setEmailContent(prev => [...prev, { id: Date.now(), type }]);
    };
    
    const removeComponent = (index: number) => {
        setEmailContent(prev => prev.filter((_, i) => i !== index));
    }
    
    const moveComponent = (dragIndex: number, hoverIndex: number) => {
        const draggedItem = emailContent[dragIndex];
        setEmailContent(prev => {
            const newContent = [...prev];
            newContent.splice(dragIndex, 1);
            newContent.splice(hoverIndex, 0, draggedItem);
            return newContent;
        })
    }

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
            <div className="flex gap-6 h-[65vh]">
                {/* Components Sidebar */}
                <div className="w-56 bg-muted/50 p-4 rounded-lg flex-shrink-0">
                    <h4 className="font-semibold mb-4 text-sm">Components</h4>
                    <div className="space-y-2">
                        {builderComponents.map(comp => (
                            <DraggableComponent key={comp.name} item={comp} />
                        ))}
                    </div>
                </div>

                {/* Email Canvas */}
                <div className="flex-1 flex flex-col gap-4">
                    <Card>
                        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Subject Line</Label>
                                <Input placeholder="Your amazing email subject" />
                            </div>
                            <div className="space-y-2">
                                <Label>Preview Text</Label>
                                <Input placeholder="A catchy preview to grab attention" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="flex-1">
                        <CardContent ref={drop} className="p-4 bg-gray-100 dark:bg-gray-900 h-full overflow-y-auto">
                            <div className="bg-white dark:bg-black p-6 mx-auto max-w-2xl shadow-lg space-y-4">
                                {emailContent.length === 0 ? (
                                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center text-muted-foreground">
                                        Drag components here
                                    </div>
                                ) : (
                                    emailContent.map((item, index) => (
                                        <DroppedComponent key={item.id} item={item} index={index} moveComponent={moveComponent} removeComponent={removeComponent} />
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview & Settings Sidebar */}
                <div className="w-80 bg-muted/50 p-4 rounded-lg flex-shrink-0 flex flex-col">
                    <h4 className="font-semibold mb-4 text-sm">Preview</h4>
                    <div className="flex items-center justify-center gap-2 mb-4 bg-background p-1 rounded-md">
                        <Button size="sm" variant={view === 'desktop' ? 'secondary' : 'ghost'} onClick={() => setView('desktop')}><AppWindow className="h-4 w-4" /></Button>
                        <Button size="sm" variant={view === 'mobile' ? 'secondary' : 'ghost'} onClick={() => setView('mobile')}><Smartphone className="h-4 w-4" /></Button>
                        <Button size="sm" variant={view === 'dark' ? 'secondary' : 'ghost'} onClick={() => setView('dark')}><Moon className="h-4 w-4" /></Button>
                    </div>
                    <div className="flex-1 border rounded-lg p-2 bg-background overflow-hidden">
                        <div className={cn("mx-auto transition-all", view === 'mobile' ? 'max-w-[320px] h-full' : 'w-full h-full')}>
                             <div className={cn("w-full h-full overflow-y-auto rounded-md p-4", view === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black')}>
                                {emailContent.map((item, index) => {
                                    switch (item.type) {
                                        case 'Text': return <p key={index} className="text-sm">This is a sample text block.</p>;
                                        case 'Image': return <img key={index} src="https://picsum.photos/seed/mail/500/200" alt="placeholder" className="rounded-md my-2" />;
                                        case 'Button': return <Button key={index} className="my-2">Call to Action</Button>;
                                        default: return <div key={index}>{item.type}</div>;
                                    }
                                })}
                                 {emailContent.length === 0 && <p className="text-xs text-center text-muted-foreground">Live email preview</p>}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button variant="outline" className="w-full"><Send className="mr-2 h-4 w-4" /> Send Test Email</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

    