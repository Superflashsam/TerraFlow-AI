"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share, Trash2, X } from 'lucide-react';

export const BulkActionsToolbar = ({ selectedCount, onClear }: { selectedCount: number; onClear: () => void; }) => {
    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg shadow-lg flex items-center gap-4 p-3">
            <span className="text-sm font-medium">{selectedCount} file(s) selected</span>
            <div className="h-6 w-px bg-border"></div>
            <Button variant="ghost" size="sm"><Download className="mr-2 h-4 w-4"/>Download</Button>
            <Button variant="ghost" size="sm"><Share className="mr-2 h-4 w-4"/>Share</Button>
            <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="mr-2 h-4 w-4"/>Delete</Button>
            <div className="h-6 w-px bg-border"></div>
            <Button variant="ghost" size="icon" onClick={onClear}><X className="h-4 w-4"/></Button>
        </div>
    )
}
