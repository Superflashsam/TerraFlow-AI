
"use client";

import React, { useState, useEffect } from 'react';
import { KPICard } from './kpi-card';
import { ConversionFunnel } from './conversion-funnel';
import { LeadScoringChart } from './lead-scoring-chart';
import { TopSourcesRanking } from './top-sources-ranking';
import { LeadJourneyMap } from './lead-journey-map';
import { FilterControls } from './filter-controls';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock } from 'lucide-react';

export const LeadAnalyticsHub = () => {
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());


  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const kpiData = [
    {
      title: 'Total Leads',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: 'Users',
      color: 'blue' as const
    },
    {
      title: 'Conversion Rate',
      value: '10.2%',
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: 'TrendingUp',
      color: 'green' as const
    },
    {
      title: 'Avg Deal Value',
      value: '₹45.2L',
      change: '+8.7%',
      changeType: 'positive' as const,
      icon: 'DollarSign',
      color: 'purple' as const
    },
    {
      title: 'Pipeline Velocity',
      value: '18.5 days',
      change: '-3.2%',
      changeType: 'positive' as const,
      icon: 'Clock',
      color: 'orange' as const
    },
    {
      title: 'Cost Per Lead',
      value: '₹2,340',
      change: '-5.8%',
      changeType: 'positive' as const,
      icon: 'Target',
      color: 'indigo' as const
    },
    {
      title: 'Lead Quality Score',
      value: '7.8/10',
      change: '+0.3',
      changeType: 'positive' as const,
      icon: 'Star',
      color: 'pink' as const
    }
  ];

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
            ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-96">
                 <Skeleton className="h-full w-full" />
            </div>
            <div className="h-96">
                <Skeleton className="h-full w-full" />
            </div>
        </div>
         <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <FilterControls onFiltersChange={handleFiltersChange} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {kpiData.map((kpi, index) => (
            <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            changeType={kpi.changeType}
            icon={kpi.icon as any}
            color={kpi.color}
            />
        ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <ConversionFunnel />
            </div>
            <div className="space-y-6">
                <LeadScoringChart />
                <TopSourcesRanking />
            </div>
        </div>

        <LeadJourneyMap />

        <div className="fixed bottom-6 right-6 z-50">
            <div className="bg-card rounded-lg shadow-lg border border-border p-4 max-w-sm">
            <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                <p className="text-sm font-medium text-foreground">Live Updates Active</p>
                <p className="text-xs text-muted-foreground">Last sync: {lastUpdated.toLocaleTimeString()}</p>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
};
