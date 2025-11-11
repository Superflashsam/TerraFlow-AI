
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
  { location: "Baner", avgPrice: 85, fill: "var(--color-baner)" },
  { location: "Koregaon Park", avgPrice: 250, fill: "var(--color-koregaon)" },
  { location: "Wakad", avgPrice: 65, fill: "var(--color-wakad)" },
  { location: "Kalyani Nagar", avgPrice: 380, fill: "var(--color-kalyani)" },
  { location: "Hinjawadi", avgPrice: 75, fill: "var(--color-hinjawadi)" },
  { location: "Viman Nagar", avgPrice: 95, fill: "var(--color-viman)" },
]

const chartConfig = {
  avgPrice: {
    label: "Avg. Price (₹L)",
  },
  baner: { label: "Baner", color: "hsl(var(--chart-1))" },
  koregaon: { label: "Koregaon Park", color: "hsl(var(--chart-2))" },
  wakad: { label: "Wakad", color: "hsl(var(--chart-3))" },
  kalyani: { label: "Kalyani Nagar", color: "hsl(var(--chart-4))" },
  hinjawadi: { label: "Hinjawadi", color: "hsl(var(--chart-5))" },
  viman: { label: "Viman Nagar", color: "hsl(var(--chart-1))" },
}

export function AvgPriceByLocation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Price by Location</CardTitle>
        <CardDescription>Comparison of average property prices in top localities.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 20, right: 20 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="location"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 15)}
            />
            <XAxis dataKey="avgPrice" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="avgPrice"
              layout="vertical"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

