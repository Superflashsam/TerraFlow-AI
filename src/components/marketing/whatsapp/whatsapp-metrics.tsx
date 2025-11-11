"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Send, TrendingUp, CheckCircle, Progress } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const WhatsappMetrics = () => {
  const metrics = [
    {
      title: 'Total Campaigns',
      value: '24',
      icon: MessageCircle,
      badge: '12 active',
      badgeColor: 'bg-green-500/10 text-green-600',
    },
    {
      title: 'Messages Sent',
      value: '12,847',
      icon: Send,
      badge: '+23% vs last month',
      badgeColor: 'bg-primary/10 text-primary',
    },
    {
      title: 'Response Rate',
      value: '67.4%',
      icon: TrendingUp,
      progress: 67.4,
    },
    {
      title: 'Conversions',
      value: '342',
      icon: CheckCircle,
      badge: '₹2.1Cr value',
      badgeColor: 'bg-purple-500/10 text-purple-600'
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
                {metric.progress !== undefined && (
                   <Progress value={metric.progress} className="mt-2 h-2" />
                )}
              </CardContent>
            </Card>
          )
      })}
    </div>
  );
};