"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LayoutTemplate, Save, Type, ImageIcon, AppWindow, Rows, Divide } from 'lucide-react';

export const CreateTemplateModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <LayoutTemplate /> Create New Email Template
                    </DialogTitle>
                    <DialogDescription>Design a reusable template for your email campaigns.</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="template-name">Template Name</Label>
                        <Input id="template-name" placeholder="e.g., Monthly Newsletter Template" />
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Initial Structure</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Button variant="outline" className="h-20 flex-col"><Type />Text-focused</Button>
                            <Button variant="outline" className="h-20 flex-col"><ImageIcon />Image Header</Button>
                            <Button variant="outline" className="h-20 flex-col"><Rows />Multi-column</Button>
                            <Button variant="outline" className="h-20 flex-col"><AppWindow />Promotional</Button>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    <Button onClick={onClose}>
                        <Save className="mr-2 h-4 w-4" /> Save & Continue to Editor
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
