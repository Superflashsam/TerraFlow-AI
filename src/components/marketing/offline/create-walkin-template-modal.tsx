
"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Save, FileText } from 'lucide-react';

const formFields = [
    { id: 'name', label: 'Name', default: true },
    { id: 'phone', label: 'Phone', default: true },
    { id: 'email', label: 'Email', default: true },
    { id: 'company', label: 'Company' },
    { id: 'budget', label: 'Budget Range' },
    { id: 'propertyType', label: 'Property Type' },
    { id: 'location', label: 'Location Preference' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'notes', label: 'Additional Notes' },
];

export const CreateWalkInTemplateModal = ({ isOpen, onClose, onSave }: { isOpen: boolean, onClose: () => void, onSave: (data: any) => void }) => {
    const [templateName, setTemplateName] = useState('');
    const [selectedFields, setSelectedFields] = useState<string[]>(['name', 'phone', 'email']);

    const handleFieldToggle = (fieldId: string) => {
        if (formFields.find(f => f.id === fieldId)?.default) return; // Don't allow toggling default fields
        setSelectedFields(prev => 
            prev.includes(fieldId) ? prev.filter(id => id !== fieldId) : [...prev, fieldId]
        );
    };

    const handleSave = () => {
        if (templateName && selectedFields.length > 0) {
            onSave({ name: templateName, fields: selectedFields });
            onClose();
        } else {
            // Add some validation feedback
            alert("Please provide a template name and select at least one field.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2"><FileText />Create Custom Form Template</DialogTitle>
                    <DialogDescription>Design a new template for capturing walk-in leads.</DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="template-name">Template Name</Label>
                        <Input 
                            id="template-name" 
                            placeholder="e.g., Weekend Site Visit Form"
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-3">
                        <Label>Form Fields</Label>
                        <div className="grid grid-cols-2 gap-3 p-4 border rounded-lg bg-muted/50">
                            {formFields.map(field => (
                                <div key={field.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`field-${field.id}`}
                                        checked={selectedFields.includes(field.id)}
                                        onCheckedChange={() => handleFieldToggle(field.id)}
                                        disabled={field.default}
                                    />
                                    <Label 
                                        htmlFor={`field-${field.id}`} 
                                        className={`font-normal ${field.default ? 'text-muted-foreground' : ''}`}
                                    >
                                        {field.label} {field.default && '(default)'}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}><Save className="mr-2 h-4 w-4"/>Save Template</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
