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
  { source: "99acres", leads: 475, fill: "var(--color-99acres)" },
  { source: "MagicBricks", leads: 337, fill: "var(--color-magicbricks)" },
  { source: "Website", leads: 225, fill: "var(--color-website)" },
  { source: "WhatsApp", leads: 150, fill: "var(--color-whatsapp)" },
  { source: "Referral", leads: 60, fill: "var(--color-referral)" },
]

const chartConfig = {
  leads: {
    label: "Leads",
  },
  "99acres": {
    label: "99acres",
    color: "hsl(var(--chart-1))",
  },
  magicbricks: {
    label: "MagicBricks",
    color: "hsl(var(--chart-2))",
  },
  website: {
    label: "Website",
    color: "hsl(var(--chart-3))",
  },
  whatsapp: {
    label: "WhatsApp",
    color: "hsl(var(--chart-4))",
  },
  referral: {
    label: "Referral",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function LeadSourceChart() {
  const totalLeads = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.leads, 0)
  }, [])

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Lead Sources</CardTitle>
        <CardDescription>Where are your leads coming from?</CardDescription>
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
              dataKey="leads"
              nameKey="source"
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
                          {totalLeads.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Leads
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="source" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
       <CardFooter className="flex-col gap-2 text-sm pt-10">
         <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2 leading-none text-muted-foreground">
            Showing total leads for the last 30 days
          </div>
      </CardFooter>
    </Card>
  )
}
