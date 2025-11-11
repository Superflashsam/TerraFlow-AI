
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { type: "Apartment", days: 45, fill: "var(--color-apartment)" },
  { type: "Villa", days: 62, fill: "var(--color-villa)" },
  { type: "Penthouse", days: 78, fill: "var(--color-penthouse)" },
  { type: "Plot", days: 35, fill: "var(--color-plot)" },
  { type: "Other", days: 55, fill: "var(--color-other)" },
]

const chartConfig = {
  days: {
    label: "Days on Market",
  },
  apartment: {
    label: "Apartment",
    color: "hsl(var(--chart-1))",
  },
  villa: {
    label: "Villa",
    color: "hsl(var(--chart-2))",
  },
  penthouse: {
    label: "Penthouse",
    color: "hsl(var(--chart-3))",
  },
  plot: {
    label: "Plot",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
}

export function SalesVelocityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Velocity</CardTitle>
        <CardDescription>Average days on market by property type.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="type"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Bar dataKey="days" radius={8}>
                {chartData.map((entry) => (
                    <Cell key={entry.type} fill={entry.fill} />
                ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
