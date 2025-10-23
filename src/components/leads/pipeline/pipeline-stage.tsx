
"use client";
import React, { useState } from 'react';
import { MoreHorizontal, Plus, Target } from 'lucide-react';
import { LeadCard } from './lead-card';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const PipelineStage = ({ stage, leads, onLeadMove, onLeadClick, metrics }: { stage: any, leads: any[], onLeadMove: (leadId: number, stageId: string) => void, onLeadClick: (lead: any) => void, metrics: any }) => {
  const [draggedOver, setDraggedOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOver(false);
    
    const leadId = e.dataTransfer.getData('text/plain');
    if (leadId) {
      onLeadMove?.(parseInt(leadId), stage.id);
    }
  };

  return (
    <Card className="w-80 flex flex-col h-full">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
            <h3 className="font-medium text-foreground">{stage.name}</h3>
            <span className="bg-muted px-2 py-1 rounded-full text-xs font-medium text-muted-foreground">
              {metrics?.count || 0}
            </span>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreHorizontal size={16} />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-muted/50 p-2 rounded-md">
            <div className="text-muted-foreground">Total Value</div>
            <div className="font-medium text-foreground">{metrics?.totalValue || '₹0Cr'}</div>
          </div>
          <div className="bg-muted/50 p-2 rounded-md">
            <div className="text-muted-foreground">Avg. Time</div>
            <div className="font-medium text-foreground">{metrics?.avgTime || 0}d</div>
          </div>
        </div>
      </CardHeader>

      <CardContent 
        className={`flex-1 overflow-y-auto p-4 space-y-3 min-h-32 transition-colors ${
          draggedOver ? 'bg-primary/10 border-2 border-dashed border-primary' : 'bg-muted/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {leads.length > 0 ? (
          leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onClick={onLeadClick}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className={`w-12 h-12 rounded-full ${stage.color} opacity-20 flex items-center justify-center mb-3`}>
              <Target size={24} className="text-current" />
            </div>
            <p className="text-sm text-muted-foreground">No leads in this stage</p>
            <p className="text-xs text-muted-foreground mt-1">
              Drag leads here to move them
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4">
        <Button variant="ghost" className="w-full">
            <Plus size={16} className="mr-2" /> Add Lead
        </Button>
      </CardFooter>
    </Card>
  );
};
