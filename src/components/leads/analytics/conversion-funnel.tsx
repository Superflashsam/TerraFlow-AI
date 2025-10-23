
"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export const ConversionFunnel = () => {
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
      </CardContent>
    </Card>
  );
};
