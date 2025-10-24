
"use client";

import {
  PlusCircle,
  Upload,
  LineChart,
  Target,
  Table,
  LayoutGrid,
  FileDown,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeadAnalyticsHub } from '@/components/leads/analytics/lead-analytics-hub';
import { LeadPipelineManager } from '@/components/leads/pipeline/lead-pipeline-manager';
import { LeadsManagement } from '@/components/leads/leads-management';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function LeadsPage() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <PageHeader
            title="Leads"
            description="Track, manage, and analyze your real estate leads with AI-powered insights."
        />
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
      </div>

      <Tabs defaultValue="management" className="w-full flex-1 flex flex-col overflow-hidden">
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
        <TabsContent value="management" className="flex-1 overflow-hidden mt-4">
            <LeadsManagement />
        </TabsContent>
        <TabsContent value="pipeline" className="flex-1 flex flex-col overflow-hidden">
            <LeadPipelineManager />
        </TabsContent>
        <TabsContent value="analytics" className="flex-1 overflow-y-auto">
            <LeadAnalyticsHub />
        </TabsContent>
      </Tabs>
    </div>
  );
}
