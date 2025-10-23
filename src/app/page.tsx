"use client";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { LeadsOverTimeChart } from "@/components/dashboard/leads-over-time-chart";
import { PipelineChart } from "@/components/dashboard/pipeline-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Button } from "@/components/ui/button";
import { kpiData } from "@/lib/placeholder-data";
import { PlusCircle, SquareCheckBig, MessageSquarePlus } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Dashboard"
        description="Here's a snapshot of your real estate activities."
      >
        <div className="flex gap-2">
          <Button>
            <PlusCircle />
            Add Lead
          </Button>
          <Button variant="outline">
            <SquareCheckBig />
            Create Task
          </Button>
          <Button variant="outline">
            <MessageSquarePlus />
            Send Message
          </Button>
        </div>
      </PageHeader>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {kpiData.map((data) => (
          <KpiCard key={data.title} {...data} />
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="grid gap-4 lg:col-span-3">
          <LeadsOverTimeChart />
        </div>
        <div className="grid gap-4 lg:col-span-2">
          <PipelineChart />
        </div>
      </div>

      <div>
        <RecentActivity />
      </div>
    </div>
  );
}
