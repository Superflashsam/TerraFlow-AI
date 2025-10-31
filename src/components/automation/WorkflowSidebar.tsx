"use client";
import React from 'react';
import {
  Zap,
  Play,
  GitBranch,
  UserPlus,
  Building,
  Calendar,
  TrendingUp,
  Mail,
  CheckSquare,
  RefreshCw,
  PenTool,
  GitFork,
  Clock,
  Filter as FilterIcon
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const components = {
  triggers: [
    { id: 'new-lead', name: 'New Lead', icon: UserPlus, type: 'trigger', service: 'Leads', serviceIcon: 'UserPlus' },
    { id: 'property-inquiry', name: 'Property Inquiry', icon: Building, type: 'trigger', service: 'Properties', serviceIcon: 'Building' },
    { id: 'date-time', name: 'Date/Time', icon: Calendar, type: 'trigger', service: 'Schedule', serviceIcon: 'Calendar' },
    { id: 'lead-score-change', name: 'Lead Score Change', icon: TrendingUp, type: 'trigger', service: 'Leads', serviceIcon: 'TrendingUp' },
  ],
  actions: [
    { id: 'send-email', name: 'Send Email', icon: Mail, type: 'action', service: 'Email', serviceIcon: 'Mail' },
    { id: 'create-task', name: 'Create Task', icon: CheckSquare, type: 'action', service: 'Tasks', serviceIcon: 'CheckSquare' },
    { id: 'update-status', name: 'Update Status', icon: RefreshCw, type: 'action', service: 'CRM', serviceIcon: 'RefreshCw' },
    { id: 'terrascribe-content', name: 'TerraScribe Content', icon: PenTool, type: 'action', service: 'TerraScribe AI', serviceIcon: 'PenTool' },
  ],
  conditions: [
    { id: 'if-then', name: 'If/Then', icon: GitFork, type: 'condition', service: 'Logic', serviceIcon: 'GitFork' },
    { id: 'wait-delay', name: 'Wait/Delay', icon: Clock, type: 'condition', service: 'Logic', serviceIcon: 'Clock' },
    { id: 'filter', name: 'Filter', icon: FilterIcon, type: 'condition', service: 'Logic', serviceIcon: 'FilterIcon' },
    { id: 'split-path', name: 'Split Path', icon: GitBranch, type: 'condition', service: 'Logic', serviceIcon: 'GitBranch' },
  ],
};

const DraggableComponent = ({ component }: { component: any }) => {
    const onDragStart = (event: React.DragEvent, componentData: any) => {
        const json = JSON.stringify(componentData);
        event.dataTransfer.setData('application/json', json);
    };

    const Icon = component.icon;

    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, component)}
            className="flex items-center p-2 rounded-md bg-muted hover:bg-muted/80 cursor-grab"
        >
            <Icon className="h-5 w-5 mr-3 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{component.name}</span>
        </div>
    );
};

export function WorkflowSidebar() {
  return (
    <aside className="w-64 flex-shrink-0 bg-card border-r border-border p-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-foreground">Workflow Components</h2>
      <Accordion type="multiple" defaultValue={['triggers', 'actions', 'conditions']} className="w-full">
        <AccordionItem value="triggers">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Triggers</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {components.triggers.map(component => <DraggableComponent key={component.id} component={component} />)}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="actions">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              <span>Actions</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {components.actions.map(component => <DraggableComponent key={component.id} component={component} />)}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="conditions">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4" />
              <span>Conditions</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {components.conditions.map(component => <DraggableComponent key={component.id} component={component} />)}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
