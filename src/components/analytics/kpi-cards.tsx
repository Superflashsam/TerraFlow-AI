"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, CheckCircle, Clock, AlertCircle, LineChart, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { AreaChart, Area } from "recharts"
import {
  ChartContainer,
} from "@/components/ui/chart"

const chartConfig = {
  views: {
    color: "hsl(var(--chart-1))",
  },
}

const chartData = [
  { day: '2024-01-01', views: 45 },
  { day: '2024-01-02', views: 52 },
  { day: '2024-01-03', views: 48 },
  { day: '2024-01-04', views: 61 },
  { day: '2024-01-05', views: 55 },
  { day: '2024-01-06', views: 67 },
  { day: '2024-01-07', views: 69 },
]


const kpiData = [
  { title: "Total Leads", value: "1,247", icon: Users, change: "+12.5%", changeType: 'positive', chartData: chartData },
  { title: "Conversion Rate", value: "8.4%", icon: CheckCircle, change: "+1.2%", changeType: 'positive', chartData: chartData.slice().reverse() },
  { title: "Pipeline Value", value: "₹2.4Cr", icon: DollarSign, change: "+18.3%", changeType: 'positive', chartData: chartData },
  { title: "Avg Response Time", value: "18 min", icon: Clock, change: "-5 min", changeType: 'negative', chartData: chartData.slice().reverse() },
];

export function KpiCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon;
        const ChangeIcon = kpi.changeType === 'positive' ? TrendingUp : TrendingDown;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
              <Icon className={`h-5 w-5 text-muted-foreground`} />
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                    <div className="text-3xl font-bold">{kpi.value}</div>
                    <p className={`text-xs flex items-center ${kpi.changeType === 'positive' ? 'text-green-500' : 'text-destructive'}`}>
                        <ChangeIcon className="h-4 w-4 mr-1"/>
                        {kpi.change} from last period
                    </p>
                </div>
                 <div className="h-16 w-24">
                    <ChartContainer config={chartConfig}>
                        <AreaChart
                            accessibilityLayer
                            data={kpi.chartData}
                            margin={{
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                            }}
                            >
                            <defs>
                                <linearGradient id={`fill${index}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={kpi.changeType === 'positive' ? "var(--color-views)" : "hsl(var(--destructive))"} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={kpi.changeType === 'positive' ? "var(--color-views)" : "hsl(var(--destructive))"} stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <Area
                                dataKey="views"
                                type="natural"
                                fill={`url(#fill${index})`}
                                stroke={kpi.changeType === 'positive' ? "var(--color-views)" : "hsl(var(--destructive))"}
                                stackId="a"
                            />
                        </AreaChart>
                    </ChartContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
