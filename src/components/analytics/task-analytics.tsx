
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const taskCompletionData = [
  { name: 'Mon', completed: 12, created: 15 },
  { name: 'Tue', completed: 18, created: 20 },
  { name: 'Wed', completed: 15, created: 18 },
  { name: 'Thu', completed: 22, created: 25 },
  { name: 'Fri', completed: 20, created: 22 },
  { name: 'Sat', completed: 8, created: 10 },
  { name: 'Sun', completed: 5, created: 7 },
];

const teamPerformanceData = [
    { name: 'Priya Sharma', completed: 45, overdue: 3 },
    { name: 'Rajesh Kumar', completed: 38, overdue: 5 },
    { name: 'Amit Patel', completed: 52, overdue: 1 },
    { name: 'Me', completed: 32, overdue: 8 },
];

export function TaskAnalytics() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Task Analytics</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
             <div>
                <h3 className="font-semibold mb-2">Weekly Completion Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={taskCompletionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="created" stackId="a" fill="hsl(var(--muted))" name="Created" />
                        <Bar dataKey="completed" stackId="a" fill="hsl(var(--primary))" name="Completed" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
             <div>
                <h3 className="font-semibold mb-2">Team Performance (Last 30 Days)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={teamPerformanceData} layout="vertical">
                         <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={100} />
                        <Tooltip />
                        <Bar dataKey="completed" stackId="a" fill="hsl(var(--primary))" name="Completed" />
                        <Bar dataKey="overdue" stackId="a" fill="hsl(var(--destructive))" name="Overdue" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
  );
}
