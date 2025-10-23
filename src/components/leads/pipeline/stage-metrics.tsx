
"use client";
import React from 'react';
import { Users, DollarSign, Target, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const StageMetrics = ({ stages, getStageMetrics }: { stages: any[], getStageMetrics: (id: string) => any }) => {
  const totalLeads = stages.reduce((sum, stage) => sum + (getStageMetrics(stage.id)?.count || 0), 0);
  const totalValue = stages.reduce((sum, stage) => {
    const value = parseFloat(getStageMetrics(stage.id)?.totalValue?.replace(/[₹,\s]/g, '').replace('Cr', '') || '0');
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  const getConversionRate = () => {
    const closedWonCount = getStageMetrics('closed')?.count || 0;
    return totalLeads > 0 ? ((closedWonCount / totalLeads) * 100).toFixed(1) : 0;
  };

  const metricCards = [
      {label: "Total Leads", value: totalLeads, icon: Users, color: "text-blue-600 bg-blue-100"},
      {label: "Pipeline Value", value: `₹${totalValue.toFixed(1)}Cr`, icon: DollarSign, color: "text-green-600 bg-green-100"},
      {label: "Conversion Rate", value: `${getConversionRate()}%`, icon: Target, color: "text-purple-600 bg-purple-100"},
      {label: "Avg. Cycle Time", value: "28d", icon: Clock, color: "text-orange-600 bg-orange-100"},
  ]

  return (
    <div className="bg-muted/50 border-b border-border p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metricCards.map(metric => {
            const Icon = metric.icon;
            return (
                <Card key={metric.label} className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                        <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                        </div>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${metric.color}`}>
                            <Icon size={20} />
                        </div>
                    </div>
                </Card>
            )
        })}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stages.map((stage) => {
          const metrics = getStageMetrics(stage.id);
          const percentage = totalLeads > 0 ? ((metrics.count / totalLeads) * 100).toFixed(1) : 0;
          
          return (
            <div key={stage.id} className="bg-card rounded-lg p-3 border border-border">
              <div className="flex items-center space-x-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                <span className="text-xs font-medium text-foreground truncate">{stage.name}</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-foreground">{metrics.count}</span>
                  <span className="text-xs text-muted-foreground">{percentage}%</span>
                </div>
                <div className="text-xs text-muted-foreground">{metrics.totalValue}</div>
                <div className="w-full bg-muted h-1 rounded-full">
                  <div 
                    className={`h-full rounded-full ${stage.color}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
