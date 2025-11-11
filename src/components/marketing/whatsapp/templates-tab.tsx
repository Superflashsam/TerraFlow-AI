"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Copy, Trash2, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreateTemplateModal } from './create-template-modal';

const mockTemplates = [
  { id: 1, name: 'Property Launch Announcement', status: 'Approved', category: 'Marketing', language: 'English', usage: 12 },
  { id: 2, name: 'Site Visit Confirmation', status: 'Approved', category: 'Utility', language: 'English', usage: 189 },
  { id: 3, name: 'Payment Reminder', status: 'Approved', category: 'Utility', language: 'English', usage: 56 },
  { id: 4, name: 'Diwali Offer', status: 'Pending', category: 'Marketing', language: 'Hinglish', usage: 0 },
  { id: 5, name: 'New Listing Alert', status: 'Rejected', category: 'Marketing', language: 'English', usage: 0 },
];

const StatusBadge = ({ status }: { status: string }) => {
  const colors: { [key: string]: string } = {
    Approved: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Rejected: 'bg-red-100 text-red-800',
  };
  return (
    <Badge className={`${colors[status]} capitalize`}>
      {status}
    </Badge>
  );
};

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
                                <StatusBadge status={template.status} />
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1 mb-4">
                               <p><strong>Category:</strong> {template.category}</p>
                               <p><strong>Language:</strong> {template.language}</p>
                               <p><strong>Usage:</strong> Used in {template.usage} campaigns</p>
                           </div>
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