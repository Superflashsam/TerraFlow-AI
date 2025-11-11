
"use client";

import { useState } from "react";
import { FilterControls } from '@/components/leads/analytics/filter-controls';
import { PageHeader } from "@/components/shared/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, Building2, Target, FileDown } from "lucide-react";
import { KPICard } from "@/components/leads/analytics/kpi-card";
import { ConversionFunnel } from "@/components/leads/analytics/conversion-funnel";
import { LeadScoringChart } from "@/components/leads/analytics/lead-scoring-chart";
import { TopSourcesRanking } from "@/components/leads/analytics/top-sources-ranking";
import { TaskAnalytics } from "@/components/analytics/task-analytics";

export default function AnalyticsPage() {
  const [filters, setFilters] = useState({});

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    console.log("Analytics filters updated:", newFilters);
  };
  
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
  ];

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Analytics & Reports"
        description="Gain deep insights into your business performance."
      />
      
      <FilterControls onFiltersChange={handleFiltersChange} />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview"><BarChart3 className="mr-2 h-4 w-4" />Overview</TabsTrigger>
          <TabsTrigger value="agents"><Users className="mr-2 h-4 w-4" />Agents</TabsTrigger>
          <TabsTrigger value="properties"><Building2 className="mr-2 h-4 w-4" />Properties</TabsTrigger>
          <TabsTrigger value="leads"><Target className="mr-2 h-4 w-4" />Leads</TabsTrigger>
          <TabsTrigger value="custom"><FileDown className="mr-2 h-4 w-4" />Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <TaskAnalytics />
        </TabsContent>
        <TabsContent value="agents" className="mt-4">
            <p>Agent performance analytics will be displayed here.</p>
        </TabsContent>
         <TabsContent value="properties" className="mt-4">
            <p>Property analytics will be displayed here.</p>
        </TabsContent>
         <TabsContent value="leads" className="mt-4">
            <p>Detailed lead analytics will be displayed here.</p>
        </TabsContent>
         <TabsContent value="custom" className="mt-4">
            <p>Custom report builder and saved reports will be here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
