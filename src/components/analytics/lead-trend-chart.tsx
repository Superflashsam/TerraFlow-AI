
"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts"
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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const chartData = [
  { date: "Oct 01", total: 60, qualified: 40, hot: 15 },
  { date: "Oct 08", total: 75, qualified: 55, hot: 20 },
  { date: "Oct 15", total: 90, qualified: 65, hot: 25 },
  { date: "Oct 22", total: 110, qualified: 80, hot: 30 },
  { date: "Oct 29", total: 125, qualified: 95, hot: 35 },
];

const chartConfig = {
  total: {
    label: "Total Leads",
    color: "hsl(var(--chart-2))",
  },
  qualified: {
    label: "Qualified Leads",
    color: "hsl(var(--chart-3))",
  },
  hot: {
    label: "Hot Leads (>80)",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function LeadTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Generation Trend</CardTitle>
        <CardDescription>Daily leads for last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-72 w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} />
             <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={6}
            />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
             <Legend content={<ChartLegendContent />} />
            <Line
              dataKey="total"
              type="monotone"
              stroke="var(--color-total)"
              strokeWidth={2}
              dot={false}
            />
             <Line
              dataKey="qualified"
              type="monotone"
              stroke="var(--color-qualified)"
              strokeWidth={2}
              dot={false}
            />
             <Line
              dataKey="hot"
              type="monotone"
              stroke="var(--color-hot)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
