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
  { property: "Prestige Lakeside Habitat", inquiries: 247 },
  { property: "Brigade Orchards", inquiries: 198 },
  { property: "Sobha Dream Acres", inquiries: 176 },
  { property: "Godrej Ananda", inquiries: 154 },
  { property: "Purva Atmosphere", inquiries: 142 },
  { property: "Assetz Marq", inquiries: 131 },
  { property: "Salarpuria Sattva Park Cubix", inquiries: 120 },
  { property: "Shriram Blue", inquiries: 110 },
  { property: "Provident Sunworth", inquiries: 98 },
  { property: "Embassy Springs", inquiries: 89 },
]

const chartConfig = {
  inquiries: {
    label: "Inquiries",
    color: "hsl(var(--chart-1))",
  },
}

export function PropertyPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 10 Properties by Inquiries</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-96 w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 10, right: 10 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="property"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 20) + (value.length > 20 ? '...' : '')}
            />
            <XAxis dataKey="inquiries" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="inquiries"
              layout="vertical"
              fill="var(--color-inquiries)"
              radius={4}
            >
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
