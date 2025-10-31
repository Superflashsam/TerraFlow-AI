import React from 'react';
import AppIcon from '@/components/contacts/app-icon';
import { Card } from '@/components/ui/card';

const WorkflowStats = ({ workflows }: { workflows: any[] }) => {
  const stats = {
    total: workflows.length,
    active: workflows.filter(w => w.status === 'active').length,
    paused: workflows.filter(w => w.status === 'paused').length,
    draft: workflows.filter(w => w.status === 'draft').length,
    totalExecutions: workflows.reduce((sum, w) => sum + w.executions, 0)
  };

  const statItems = [
    {
      label: 'Total Workflows',
      value: stats.total,
      icon: 'Workflow',
      color: 'text-foreground'
    },
    {
      label: 'Active',
      value: stats.active,
      icon: 'Play',
      color: 'text-green-500'
    },
    {
      label: 'Paused',
      value: stats.paused,
      icon: 'Pause',
      color: 'text-yellow-500'
    },
    {
      label: 'Draft',
      value: stats.draft,
      icon: 'FileText',
      color: 'text-muted-foreground'
    },
    {
      label: 'Total Executions',
      value: stats.totalExecutions.toLocaleString(),
      icon: 'TrendingUp',
      color: 'text-primary'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      {statItems.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 text-center"
        >
          <div className="flex items-center justify-center mb-2">
            <AppIcon 
              name={stat.icon} 
              size={24} 
              className={stat.color} 
            />
          </div>
          <div className="text-2xl font-semibold text-foreground mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-muted-foreground">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export { WorkflowStats };
