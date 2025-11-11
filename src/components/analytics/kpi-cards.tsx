"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const kpiData = [
  { title: "Total Tasks Completed", value: "1,254", icon: CheckCircle, change: "+15.2%", color: "text-green-500" },
  { title: "Avg. Completion Time", value: "3.2 days", icon: Clock, change: "-8.1%", color: "text-blue-500" },
  { title: "Overdue Tasks", value: "48", icon: AlertCircle, change: "+5.3%", color: "text-red-500" },
  { title: "Top Performer", value: "Priya Sharma", icon: Users, change: "128 tasks", color: "text-purple-500" },
];

export function KpiCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <Icon className={`h-4 w-4 text-muted-foreground ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.change} from last month</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
