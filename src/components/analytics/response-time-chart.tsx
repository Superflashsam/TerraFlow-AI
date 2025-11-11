
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
} from "@/components/ui/chart"

const chartData = [
  { range: "0-5min", leads: 450, fill: "var(--color-leads)" },
  { range: "5-15min", leads: 320, fill: "var(--color-leads)" },
  { range: "15-30min", leads: 180, fill: "hsl(var(--chart-3))" },
  { range: "30-60min", leads: 120, fill: "hsl(var(--chart-3))" },
  { range: "1-2hr", leads: 80, fill: "hsl(var(--chart-4))" },
  { range: "2hr+", leads: 97, fill: "hsl(var(--chart-5))" },
]

const chartConfig = {
  leads: {
    label: "Leads",
    color: "hsl(var(--chart-1))",
  },
}

export function ResponseTimeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Response Time Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-96 w-full">
          <BarChart data={chartData} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="range"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="leads" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
