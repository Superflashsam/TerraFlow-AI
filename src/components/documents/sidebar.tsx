"use client";

import React from 'react';
import { Folder, Star, Clock, Trash2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const quickAccessItems = [
    { name: 'All Documents', icon: Folder, count: 847 },
    { name: 'Starred', icon: Star, count: 23 },
    { name: 'Recent', icon: Clock, count: 15 },
    { name: 'Trash', icon: Trash2, count: 5 },
];

const folders = [
    { 
        name: 'Property Documents', 
        count: 156,
        subfolders: [
            { name: 'Floor Plans', count: 42 },
            { name: 'Brochures', count: 38 },
            { name: 'Legal', count: 29 },
            { name: 'Photos', count: 47 },
        ]
    },
    { 
        name: 'Contracts & Agreements', 
        count: 89,
        subfolders: [
            { name: 'Sale Deeds', count: 24 },
            { name: 'MoU', count: 18 },
            { name: 'RERA Docs', count: 32 },
            { name: 'Loan Documents', count: 15 },
        ]
    },
    { 
        name: 'Marketing Materials', 
        count: 124,
         subfolders: [
            { name: 'Social Media', count: 45 },
            { name: 'Email Templates', count: 28 },
            { name: 'WhatsApp Templates', count: 51 },
        ]
    },
    { 
        name: 'Client Documents', 
        count: 478,
         subfolders: [
            { name: 'KYC', count: 156 },
            { name: 'Financial', count: 98 },
            { name: 'Proposals', count: 124 },
            { name: 'Site Visit Reports', count: 100 },
        ]
    },
];

export const DocumentSidebar = () => {
    return (
        <aside className="w-1/5 flex-shrink-0 bg-card border-r border-border p-4 flex flex-col gap-4">
            <div className="space-y-1">
                {quickAccessItems.map(item => {
                    const Icon = item.icon;
                    return (
                         <Button key={item.name} variant="ghost" className="w-full justify-start">
                            <Icon className="mr-3 h-4 w-4" />
                            {item.name}
                            <span className="ml-auto text-xs text-muted-foreground">{item.count}</span>
                        </Button>
                    )
                })}
            </div>

            <Accordion type="multiple" defaultValue={['Property Documents']} className="w-full">
                {folders.map(folder => (
                    <AccordionItem key={folder.name} value={folder.name}>
                        <AccordionTrigger className="text-sm">
                            <div className="flex items-center">
                                <Folder className="mr-3 h-4 w-4" />
                                {folder.name}
                                <span className="ml-2 text-xs text-muted-foreground">({folder.count})</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-4">
                             {folder.subfolders.map(sub => (
                                <Button key={sub.name} variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
                                    <Folder className="mr-3 h-4 w-4" />
                                    {sub.name}
                                     <span className="ml-auto text-xs text-muted-foreground">{sub.count}</span>
                                </Button>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            
            <div className="mt-auto pt-4 border-t border-border">
                <p className="text-sm font-medium">Storage</p>
                <Progress value={34.2} className="my-2" />
                <p className="text-xs text-muted-foreground">34.2 GB of 100 GB used</p>
                 <Button variant="link" size="sm" className="px-0">Upgrade Storage</Button>
            </div>
        </aside>
    )
}
