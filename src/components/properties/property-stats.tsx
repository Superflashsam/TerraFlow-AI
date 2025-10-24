"use client";

import React from 'react';
import { Home, Eye, Clock, CheckCircle, TrendingUp, Users, MessageCircle, Calendar, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const PropertyStats = ({ properties }: { properties: any[] }) => {
  const stats = React.useMemo(() => {
    const total = properties.length || 0;
    const active = properties.filter(p => p.status === 'active').length || 0;
    const sold = properties.filter(p => p.status === 'sold').length || 0;
    const pending = properties.filter(p => p.status === 'pending').length || 0;
    
    const totalViews = properties.reduce((sum, p) => sum + (p.views || 0), 0);
    const totalInquiries = properties.reduce((sum, p) => sum + (p.inquiries || 0), 0);
    const avgDaysOnMarket = total > 0 
      ? Math.round(properties.reduce((sum, p) => sum + (p.daysOnMarket || 0), 0) / total)
      : 0;
    
    const conversionRate = totalViews > 0 
      ? ((totalInquiries / totalViews) * 100).toFixed(1)
      : "0";

    return {
      total,
      active,
      sold,
      pending,
      totalViews,
      totalInquiries,
      avgDaysOnMarket,
      conversionRate
    };
  }, [properties]);

  const statCards = [
    { title: 'Total Listings', value: stats.total, icon: Home, color: 'bg-primary' },
    { title: 'Active', value: stats.active, icon: Eye, color: 'bg-green-500' },
    { title: 'Under Contract', value: stats.pending, icon: Clock, color: 'bg-yellow-500' },
    { title: 'Sold', value: stats.sold, icon: CheckCircle, color: 'bg-accent' },
    { title: 'Total Views', value: stats.totalViews.toLocaleString(), icon: Eye, color: 'bg-blue-500', change: '+12%' },
    { title: 'Total Inquiries', value: stats.totalInquiries.toLocaleString(), icon: MessageCircle, color: 'bg-secondary', change: '+8%' },
    { title: 'Avg Days on Market', value: stats.avgDaysOnMarket, icon: Calendar, color: 'bg-purple-500', change: '-3 days' },
    { title: 'Conversion Rate', value: `${stats.conversionRate}%`, icon: TrendingUp, color: 'bg-teal-500', change: '+0.8%' }
  ];

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded ${stat.color}`}>
                  <Icon size={16} color="white" />
                </div>
                {stat.change && (
                  <span className={`text-xs font-medium ${
                    stat.change.startsWith('+') ? 'text-green-500' : 'text-destructive'
                  }`}>
                    {stat.change}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <div className="text-xl font-semibold text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.title}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  );
};
