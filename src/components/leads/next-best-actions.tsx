"use client";

import React, { useState } from 'react';
import {
  Sparkles,
  Phone,
  Mail,
  Calendar,
  Clock,
  FileText,
  Home,
  Heart,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Brain,
  Wand2,
  X,
  Target,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const iconMap: { [key: string]: React.ElementType } = {
  Phone,
  Mail,
  Calendar,
  Clock,
  FileText,
  Home,
  Heart,
  Lightbulb,
};

const NextBestActions = ({
  recommendations,
  onExecuteAction,
  onDismissAction,
  onGenerateContent,
}: {
  recommendations: any[];
  onExecuteAction: (id: number) => void;
  onDismissAction: (id: number) => void;
  onGenerateContent: (id: number, type: string) => Promise<void>;
}) => {
  const [expandedAction, setExpandedAction] = useState<number | null>(null);
  const [generatingContent, setGeneratingContent] = useState<number | null>(
    null
  );

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-green-500 bg-green-500/10 border-green-500/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'call': return 'Phone';
      case 'email': return 'Mail';
      case 'meeting': return 'Calendar';
      case 'follow_up': return 'Clock';
      case 'content': return 'FileText';
      case 'property_match': return 'Home';
      case 'nurture': return 'Heart';
      default: return 'Lightbulb';
    }
  };

  const handleGenerateContent = async (actionId: number, contentType: string) => {
    setGeneratingContent(actionId);
    try {
      await onGenerateContent(actionId, contentType);
    } finally {
      setGeneratingContent(null);
    }
  };

  const formatTimeEstimate = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Next Best Actions</h3>
          <p className="text-sm text-muted-foreground">AI-powered recommendations</p>
        </div>
        <div className="flex items-center space-x-1">
          <Sparkles size={16} className="text-accent" />
          <span className="text-sm font-medium text-accent">Terra AI</span>
        </div>
      </div>
      <div className="space-y-3">
        {recommendations.length === 0 ? (
           <div className="text-center py-8">
            <Lightbulb size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No recommendations available</p>
          </div>
        ) : (
          recommendations.map((action) => {
              const Icon = iconMap[getActionIcon(action.type)];
              const ExpandedIcon = expandedAction === action.id ? ChevronUp : ChevronDown;
              return (
                <div key={action.id} className={`border rounded-lg p-4 transition-all duration-200 ${getPriorityColor(action.priority)}`}>
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                             <div className="flex-shrink-0 mt-1">
                                <Icon size={20} className="text-current" />
                             </div>
                             <div className="flex-1">
                                <h4 className="font-medium text-foreground">{action.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                             </div>
                        </div>
                        <div className="flex items-center space-x-2">
                             <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setExpandedAction(expandedAction === action.id ? null : action.id)}
                            >
                                <ExpandedIcon/>
                            </Button>
                        </div>
                    </div>

                    {expandedAction === action.id && (
                        <div className="border-t border-current/20 pt-3 mt-3">
                          <div className="mb-4">
                            <h5 className="text-sm font-medium text-foreground mb-2">Why this action?</h5>
                            <p className="text-sm text-muted-foreground">{action.reasoning}</p>
                          </div>
                        </div>
                    )}
                    
                    <div className="flex items-center space-x-2 mt-3">
                        <Button
                            variant="default"
                            size="sm"
                            onClick={() => onExecuteAction(action.id)}
                            disabled={generatingContent === action.id}
                        >
                          {generatingContent === action.id ? "Generating..." : "Execute Action"}
                        </Button>
                         <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDismissAction(action.id)}
                        >
                          <X className="mr-2"/> Dismiss
                        </Button>
                    </div>

                </div>
              )
          })
        )}
      </div>

       <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Brain size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-2">AI Insights</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• This lead shows high engagement with luxury properties</li>
              <li>• Best response time is typically within 2-4 hours</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { NextBestActions };