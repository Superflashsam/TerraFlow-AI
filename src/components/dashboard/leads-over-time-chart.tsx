"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { leadsChartData } from "@/lib/placeholder-data"

const chartConfig = {
  leads: {
    label: "Leads",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function LeadsOverTimeChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Leads Over Time</CardTitle>
        <CardDescription>Monthly lead generation overview</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart accessibilityLayer data={leadsChartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid vertical={false} />
             <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="leads" fill="var(--color-leads)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
