"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Copy, Trash2, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreateTemplateModal } from './create-template-modal';

const mockTemplates = [
  { id: 1, name: 'Property Showcase', type: 'Pre-designed', usage: 18 },
  { id: 2, name: 'Weekly Newsletter', type: 'Pre-designed', usage: 52 },
  { id: 3, name: 'Promotional Offer', type: 'Pre-designed', usage: 9 },
  { id: 4, name: 'My Custom Template 1', type: 'Custom', usage: 2 },
  { id: 5, name: 'Event Invitation', type: 'Pre-designed', usage: 4 },
];


export const TemplatesTab = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    return (
        <div className="space-y-4">
             <div className="flex justify-end">
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Template
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTemplates.map(template => (
                    <Card key={template.id}>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-semibold text-lg">{template.name}</h3>
                                <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">{template.type}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">Used in {template.usage} campaigns</p>
                            <div className="flex justify-end items-center gap-2">
                                <Button variant="outline" size="sm"><Eye className="mr-2 h-4 w-4" />Preview</Button>
                                <Button variant="ghost" size="sm"><Edit className="mr-2 h-4 w-4" />Edit</Button>
                                <Button variant="ghost" size="sm"><Copy className="mr-2 h-4 w-4" />Duplicate</Button>
                                <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</Button>
                           </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <CreateTemplateModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
        </div>
    )
}
