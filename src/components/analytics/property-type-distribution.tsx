
"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { type ChartConfig } from "@/components/ui/chart"

const chartData = [
  { type: "Apartment", count: 275, fill: "var(--color-apartment)" },
  { type: "Villa", count: 200, fill: "var(--color-villa)" },
  { type: "Penthouse", count: 187, fill: "var(--color-penthouse)" },
  { type: "Plot", count: 173, fill: "var(--color-plot)" },
  { type: "Other", count: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  count: {
    label: "Count",
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
} satisfies ChartConfig

export function PropertyTypeDistribution() {
  const totalProperties = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0)
  }, [])

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Property Type Distribution</CardTitle>
        <CardDescription>Breakdown of your property portfolio by type.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-60"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalProperties.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Properties
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <ChartLegend
                content={<ChartLegendContent nameKey="type" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/2 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
