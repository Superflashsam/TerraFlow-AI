"use client";
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Search, Share2, Users, Globe, Download, Mail, MessageSquare, FileText, Calculator, MapPin, Phone, FileCheck, ChevronDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const iconMap: { [key: string]: LucideIcon } = {
    Search, Share2, Users, Globe, Download, Mail, MessageSquare, FileText, Calculator, MapPin, Phone, FileCheck, ChevronDown
};

export const ConversionFunnel = () => {
  const [selectedTouchpoint, setSelectedTouchpoint] = useState<string | null>(null);

  const funnelData = [
    { stage: 'Leads Generated', count: 2847, percentage: 100, color: 'hsl(var(--chart-1))' },
    { stage: 'Qualified Leads', count: 1708, percentage: 60, color: 'hsl(var(--chart-2))' },
    { stage: 'Appointments Set', count: 1139, percentage: 40, color: 'hsl(var(--chart-3))' },
    { stage: 'Property Visits', count: 854, percentage: 30, color: 'hsl(var(--chart-4))' },
    { stage: 'Offers Made', count: 569, percentage: 20, color: 'hsl(var(--chart-5))' },
    { stage: 'Deals Closed', count: 285, percentage: 10, color: 'hsl(var(--primary))' }
  ];

  const chartConfig = funnelData.reduce((acc, item) => {
    acc[item.stage] = {
      label: item.stage,
      color: item.color
    };
    return acc;
  }, {} as any);

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

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Lead Conversion Funnel</CardTitle>
        <CardDescription>Overall Conversion Rate: 10%</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
         <ChartContainer config={chartConfig} className="h-80 w-full">
          <BarChart data={funnelData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid vertical={false} />
            <XAxis 
              dataKey="stage" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              interval={0}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {funnelData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {funnelData.map((stage) => (
          <div key={stage.stage} className="text-center">
            <div 
              className="w-4 h-4 rounded-full mx-auto mb-2"
              style={{ backgroundColor: stage.color }}
            />
            <p className="text-xs text-muted-foreground mb-1">{stage.stage}</p>
            <p className="text-sm font-semibold text-foreground">{stage.count.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{stage.percentage}%</p>
          </div>
        ))}
      </div>
      
        <Separator className="my-8" />

        <div>
            <CardTitle className="mb-2">Lead Journey Mapping</CardTitle>
             <div className="flex items-center space-x-4 mb-4">
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
        </div>
      </CardContent>
    </Card>
  );
};
