
"use client";
import React, { useState } from 'react';
import { Search, Share2, Users, Globe, Download, Mail, MessageSquare, FileText, Calculator, MapPin, Phone, FileCheck, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

const iconMap: { [key: string]: LucideIcon } = {
    Search, Share2, Users, Globe, Download, Mail, MessageSquare, FileText, Calculator, MapPin, Phone, FileCheck, ChevronDown
};


export const LeadJourneyMap = () => {
  const [selectedTouchpoint, setSelectedTouchpoint] = useState<string | null>(null);

  const journeyStages = [
    {
      id: 1,
      name: 'Awareness',
      touchpoints: [
        { name: 'Google Search', effectiveness: 85, leads: 456, icon: 'Search' as keyof typeof iconMap },
        { name: 'Social Media', effectiveness: 72, leads: 234, icon: 'Share2' as keyof typeof iconMap },
        { name: 'Referral', effectiveness: 91, leads: 123, icon: 'Users' as keyof typeof iconMap }
      ]
    },
    {
      id: 2,
      name: 'Interest',
      touchpoints: [
        { name: 'Website Visit', effectiveness: 78, leads: 678, icon: 'Globe' as keyof typeof iconMap },
        { name: 'Content Download', effectiveness: 83, leads: 345, icon: 'Download' as keyof typeof iconMap },
        { name: 'Email Signup', effectiveness: 76, leads: 289, icon: 'Mail' as keyof typeof iconMap }
      ]
    },
    {
      id: 3,
      name: 'Consideration',
      touchpoints: [
        { name: 'Property Inquiry', effectiveness: 89, leads: 234, icon: 'MessageSquare' as keyof typeof iconMap },
        { name: 'Brochure Request', effectiveness: 74, leads: 156, icon: 'FileText' as keyof typeof iconMap },
        { name: 'Calculator Use', effectiveness: 81, leads: 198, icon: 'Calculator' as keyof typeof iconMap }
      ]
    },
    {
      id: 4,
      name: 'Decision',
      touchpoints: [
        { name: 'Site Visit', effectiveness: 92, leads: 145, icon: 'MapPin' as keyof typeof iconMap },
        { name: 'Sales Call', effectiveness: 88, leads: 167, icon: 'Phone' as keyof typeof iconMap },
        { name: 'Proposal Review', effectiveness: 85, leads: 134, icon: 'FileCheck' as keyof typeof iconMap }
      ]
    }
  ];

  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness >= 85) return 'bg-green-500';
    if (effectiveness >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getEffectivenessIntensity = (effectiveness: number) => {
    return Math.max(0.3, effectiveness / 100);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Journey Mapping</CardTitle>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>High (85%+)</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Medium (75-84%)</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Low (&lt;75%)</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {journeyStages.map((stage, stageIndex) => {
            const Icon = ChevronDown;
            return (
                <div key={stage.id} className="relative">
                <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                    {stageIndex + 1}
                </div>
                <h4 className="ml-3 text-lg font-medium text-foreground">{stage.name}</h4>
                </div>

                <div className="ml-11 grid grid-cols-1 md:grid-cols-3 gap-4">
                {stage.touchpoints.map((touchpoint, index) => {
                    const TouchpointIcon = iconMap[touchpoint.icon];
                    return (
                        <div
                        key={index}
                        className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            selectedTouchpoint === `${stage.id}-${index}`
                            ? 'border-primary bg-primary/10' :'border-border hover:border-muted-foreground'
                        }`}
                        onClick={() => setSelectedTouchpoint(`${stage.id}-${index}`)}
                        >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                            <TouchpointIcon size={20} className="text-muted-foreground" />
                            <span className="font-medium text-foreground">{touchpoint.name}</span>
                            </div>
                            <div className={`w-3 h-3 rounded-full ${getEffectivenessColor(touchpoint.effectiveness)}`}></div>
                        </div>
                        
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Effectiveness:</span>
                            <span className="font-medium text-foreground">{touchpoint.effectiveness}%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Leads:</span>
                            <span className="font-medium text-foreground">{touchpoint.leads}</span>
                            </div>
                        </div>

                        <div className="mt-3 w-full bg-muted rounded-full h-2">
                            <div
                            className={`h-2 rounded-full ${getEffectivenessColor(touchpoint.effectiveness)}`}
                            style={{ width: `${touchpoint.effectiveness}%` }}
                            ></div>
                        </div>
                        </div>
                    )
                })}
                </div>

                {stageIndex < journeyStages.length - 1 && (
                <div className="flex justify-center mt-6">
                    <Icon size={24} className="text-muted-foreground" />
                </div>
                )}
            </div>
            )
          })}
        </div>
        {selectedTouchpoint && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="text-sm font-medium text-foreground mb-2">Touchpoint Analysis</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>• Average time spent: 3.2 minutes</p>
              <p>• Conversion to next stage: 24.5%</p>
              <p>• Best performing time: 2-4 PM weekdays</p>
              <p>• Recommended optimization: Improve mobile experience</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
