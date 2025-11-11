
"use client";

import { useState } from "react";
import { DateRangePicker } from "@/components/analytics/date-range-picker";
import { KpiCards } from "@/components/analytics/kpi-cards";
import { LeadTrendChart } from "@/components/analytics/lead-trend-chart";
import { LeadSourceChart } from "@/components/analytics/lead-source-chart";
import { AgentLeaderboard } from "@/components/analytics/agent-leaderboard";
import { ConversionFunnel } from "@/components/analytics/conversion-funnel";
import { PropertyPerformanceChart } from "@/components/analytics/property-performance-chart";
import { ResponseTimeChart } from "@/components/analytics/response-time-chart";
import { AiInsights } from "@/components/analytics/ai-insights";
import { CustomReports } from "@/components/analytics/custom-reports";
import { TaskAnalytics } from "@/components/analytics/task-analytics";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, CheckSquare, FileDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function AnalyticsPage() {
  const [compare, setCompare] = useState(false);
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Analytics & Reports"
        description="Gain deep insights into your business performance."
      />

       <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart3 className="mr-2 h-4 w-4" />
            CRM Analytics
          </TabsTrigger>
          <TabsTrigger value="tasks">
            <CheckSquare className="mr-2 h-4 w-4" />
            Task Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <DateRangePicker />
                    <div className="flex items-center space-x-2">
                        <Switch id="compare-mode" checked={compare} onCheckedChange={setCompare} />
                        <Label htmlFor="compare-mode">Compare to previous period</Label>
                    </div>
                </div>
                <Button>
                    <FileDown className="mr-2 h-4 w-4" />
                    Export Report
                </Button>
            </div>
            <KpiCards />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                <div className="lg:col-span-3"><LeadTrendChart /></div>
                <div className="lg:col-span-2"><LeadSourceChart /></div>
            </div>
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                <div className="lg:col-span-3"><AgentLeaderboard /></div>
                <div className="lg:col-span-2"><ConversionFunnel /></div>
            </div>
             <div className="grid gap-6 md:grid-cols-2">
                <PropertyPerformanceChart />
                <ResponseTimeChart />
            </div>
            <AiInsights />
            <CustomReports />
        </TabsContent>
        <TabsContent value="tasks" className="mt-4">
            <TaskAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
