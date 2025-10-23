
"use client";
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';


export const LeadScoringChart = () => {
  const scoringData = [
    { name: 'Hot Leads (80-100)', value: 145, color: 'hsl(var(--destructive))', percentage: 18 },
    { name: 'Warm Leads (60-79)', value: 298, color: 'hsl(var(--chart-4))', percentage: 37 },
    { name: 'Cold Leads (40-59)', value: 234, color: 'hsl(var(--chart-2))', percentage: 29 },
    { name: 'Poor Leads (0-39)', value: 128, color: 'hsl(var(--muted-foreground))', percentage: 16 }
  ];

  const chartConfig = scoringData.reduce((acc, item) => {
    acc[item.name] = {
      label: item.name,
      color: item.color
    };
    return acc;
  }, {} as any);

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-col space-y-2 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.value}</span>
            </div>
            <span className="font-medium text-foreground">
              {scoringData[index].value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Scoring Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <PieChart>
            <Pie
              data={scoringData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {scoringData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
        <CustomLegend payload={scoringData.map(item => ({ value: item.name, color: item.color }))} />
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-2">Scoring Insights</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>• 55% of leads are warm or hot (score ≥60)</p>
            <p>• Hot leads have 85% higher conversion rate</p>
            <p>• Focus on nurturing 298 warm leads</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
