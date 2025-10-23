
"use client";

import {
  PlusCircle,
  Upload,
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
import { cn } from '@/lib/utils';

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
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 bg-transparent p-0 h-auto gap-2">
          <TabsTrigger value="management" className={cn(
              "flex items-center justify-center gap-2 rounded-lg p-4 font-semibold text-foreground/80 transition-all",
              "data-[state=inactive]:bg-muted/50 data-[state=inactive]:shadow-inner data-[state=inactive]:hover:bg-muted",
              "data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md"
            )}>
            <Table className="mr-2"/>
            Leads Management
          </TabsTrigger>
          <TabsTrigger value="pipeline" className={cn(
              "flex items-center justify-center gap-2 rounded-lg p-4 font-semibold text-foreground/80 transition-all",
              "data-[state=inactive]:bg-muted/50 data-[state=inactive]:shadow-inner data-[state=inactive]:hover:bg-muted",
              "data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md"
            )}>
            <Target className="mr-2"/>
            Lead Pipeline
          </TabsTrigger>
          <TabsTrigger value="analytics" className={cn(
              "flex items-center justify-center gap-2 rounded-lg p-4 font-semibold text-foreground/80 transition-all",
              "data-[state=inactive]:bg-muted/50 data-[state=inactive]:shadow-inner data-[state=inactive]:hover:bg-muted",
              "data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md"
            )}>
            <LineChart className="mr-2"/>
            Lead Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="management" className="mt-4 bg-card border-t-0 rounded-b-lg shadow-md">
          <div className="p-6">
            <LeadsManagement />
          </div>
        </TabsContent>
        <TabsContent value="pipeline" className="mt-4 bg-card border-t-0 rounded-b-lg shadow-md h-[calc(100vh-22rem)] overflow-hidden">
           <div className="overflow-auto h-full">
            <LeadPipelineManager />
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="mt-4 bg-card border-t-0 rounded-b-lg shadow-md">
          <div className="p-6">
            <LeadAnalyticsHub />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
