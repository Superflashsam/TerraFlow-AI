
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Send, MailOpen, MousePointer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const EmailMetrics = () => {
  const metrics = [
    {
      title: 'Total Campaigns',
      value: '18',
      icon: Mail,
      badge: '8 active',
      badgeColor: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    },
    {
      title: 'Emails Sent',
      value: '24,567',
      icon: Send,
      change: '+18% vs last month',
    },
    {
      title: 'Open Rate',
      value: '42.3%',
      icon: MailOpen,
      change: 'vs 38% avg',
    },
    {
      title: 'Click Rate',
      value: '12.7%',
      icon: MousePointer,
      change: '247 conversions',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                 {metric.badge && (
                  <p className={`text-xs font-medium px-2 py-1 rounded-full inline-block mt-2 ${metric.badgeColor}`}>
                    {metric.badge}
                  </p>
                )}
                 {metric.change && (
                  <p className="text-xs text-muted-foreground mt-1">{metric.change}</p>
                )}
              </CardContent>
            </Card>
          )
      })}
    </div>
  );
};
