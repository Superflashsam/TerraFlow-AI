
"use client";

import {
  PlusCircle,
  Upload,
  LayoutGrid,
  RefreshCw,
  Settings,
  LineChart,
  Target,
  Table,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeadAnalyticsHub } from '@/components/leads/analytics/lead-analytics-hub';
import { LeadPipelineManager } from '@/components/leads/pipeline/lead-pipeline-manager';
import { LeadsManagement } from '@/components/leads/leads-management';

export default function LeadsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Leads"
        description="Track, manage, and analyze your real estate leads with AI-powered insights."
      >
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2" />
            Import Leads
          </Button>
          <Button>
            <PlusCircle className="mr-2" />
            Add New Lead
          </Button>
        </div>
      </PageHeader>

      <Tabs defaultValue="management" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 bg-transparent p-0 h-auto">
          <TabsTrigger value="management" className="rounded-t-lg rounded-b-none data-[state=active]:bg-background data-[state=inactive]:bg-muted/50 data-[state=active]:shadow-none data-[state=inactive]:border-b">
            <Table className="mr-2"/>
            Leads Management
          </TabsTrigger>
          <TabsTrigger value="pipeline" className="rounded-t-lg rounded-b-none data-[state=active]:bg-background data-[state=inactive]:bg-muted/50 data-[state=active]:shadow-none data-[state=inactive]:border-b">
            <Target className="mr-2"/>
            Lead Pipeline
          </TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-t-lg rounded-b-none data-[state=active]:bg-background data-[state=inactive]:bg-muted/50 data-[state=active]:shadow-none data-[state=inactive]:border-b">
            <LineChart className="mr-2"/>
            Lead Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="management" className="mt-0 bg-background border-t-0 rounded-b-lg">
          <div className="p-6">
            <LeadsManagement />
          </div>
        </TabsContent>
        <TabsContent value="pipeline" className="mt-0 bg-background border-t-0 rounded-b-lg">
           <div className="overflow-x-auto">
            <LeadPipelineManager />
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="mt-0 bg-background border-t-0 rounded-b-lg">
          <div className="p-6">
            <LeadAnalyticsHub />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
