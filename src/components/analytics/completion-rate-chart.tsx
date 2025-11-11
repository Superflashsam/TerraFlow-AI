"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { day: 'Mon', completed: 22, created: 30 },
  { day: 'Tue', completed: 25, created: 32 },
  { day: 'Wed', completed: 18, created: 25 },
  { day: 'Thu', completed: 28, created: 35 },
  { day: 'Fri', completed: 31, created: 38 },
  { day: 'Sat', completed: 15, created: 20 },
  { day: 'Sun', completed: 12, created: 18 },
];

const chartConfig = {
  completed: { label: "Completed", color: "hsl(var(--chart-2))" },
  created: { label: "Created", color: "hsl(var(--muted))" },
};

export function CompletionRateChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Completion Rate</CardTitle>
        <CardDescription>Daily created vs. completed tasks for the last week.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="created" fill="var(--color-created)" radius={4} />
              <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
