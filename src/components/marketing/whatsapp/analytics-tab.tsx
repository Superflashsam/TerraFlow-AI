"use client"

import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, Info, Lightbulb, MessageCircle, Send, TrendingUp } from 'lucide-react';

const analyticsData = {
  kpi: [
    { title: "Sent", value: "12,847", percentage: "100%" },
    { title: "Delivered", value: "12,698", percentage: "98.8%" },
    { title: "Read", value: "9,845", percentage: "76.6%" },
    { title: "Replied", value: "3,421", percentage: "26.6%" },
    { title: "Converted", value: "342", percentage: "2.7%" },
  ],
  performanceOverTime: [
    { name: 'Nov 1', sent: 400, delivered: 390, read: 300, replied: 100, converted: 10 },
    { name: 'Nov 3', sent: 450, delivered: 440, read: 350, replied: 120, converted: 15 },
    { name: 'Nov 5', sent: 500, delivered: 490, read: 400, replied: 150, converted: 20 },
    { name: 'Nov 7', sent: 480, delivered: 470, read: 380, replied: 140, converted: 18 },
    { name: 'Nov 9', sent: 520, delivered: 510, read: 420, replied: 160, converted: 25 },
    { name: 'Nov 11', sent: 550, delivered: 540, read: 450, replied: 180, converted: 30 },
  ],
  responseRateByCampaign: [
    { name: 'Whitefield 3BHK', responseRate: 75 },
    { name: 'Diwali Offer', responseRate: 68 },
    { name: 'Site Visit', responseRate: 82 },
    { name: 'Re-engagement', responseRate: 55 },
    { name: 'New Launch', responseRate: 78 },
  ],
  topPerformingTemplates: [
    { name: 'Site Visit Confirmation', campaigns: 12, totalSent: 2847, readRate: 81, replyRate: 42, convRate: 9 },
    { name: 'Property Launch', campaigns: 8, totalSent: 1956, readRate: 76, replyRate: 35, convRate: 5 },
    { name: 'Diwali Special', campaigns: 6, totalSent: 1450, readRate: 72, replyRate: 34, convRate: 5 },
    { name: 'Payment Reminder', campaigns: 4, totalSent: 567, readRate: 86, replyRate: 28, convRate: 12 },
  ],
  insights: [
    { text: "Best send time: 10-11 AM shows highest open rates, schedule campaigns during this window for better engagement.", icon: Check, color: 'text-green-500' },
    { text: "Re-engagement impact: Re-engagement campaigns convert 2.3x better than cold outreach. Focus on warming up leads first.", icon: Lightbulb, color: 'text-yellow-500' },
    { text: "Personalization boost: Personalized messages increase reply rate by 34%. Use name and property variables for better results.", icon: Info, color: 'text-blue-500' },
  ],
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover p-2 border rounded-lg shadow-lg">
          <p className="font-bold">{label}</p>
          {payload.map((p: any, i: number) => (
            <p key={i} style={{ color: p.color }}>{`${p.name}: ${p.value}`}</p>
          ))}
        </div>
      );
    }
    return null;
  };

export const AnalyticsTab = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-5 gap-4">
                {analyticsData.kpi.map((item, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{item.value}</p>
                            <p className="text-xs text-green-500">{item.percentage}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Campaign Performance Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={analyticsData.performanceOverTime}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} />
                            <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{fontSize: "12px"}}/>
                            <Line type="monotone" dataKey="sent" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Sent" />
                            <Line type="monotone" dataKey="delivered" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Delivered" />
                            <Line type="monotone" dataKey="read" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Read" />
                            <Line type="monotone" dataKey="replied" stroke="hsl(var(--chart-4))" strokeWidth={2} name="Replied" />
                            <Line type="monotone" dataKey="converted" stroke="hsl(var(--chart-5))" strokeWidth={2} name="Converted" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Response Rate by Campaign</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={analyticsData.responseRateByCampaign}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} />
                            <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="responseRate" fill="hsl(var(--primary))" name="Response Rate (%)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Top Performing Templates</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Template Name</TableHead>
                                <TableHead>Campaigns</TableHead>
                                <TableHead>Total Sent</TableHead>
                                <TableHead>Read Rate</TableHead>
                                <TableHead>Reply Rate</TableHead>
                                <TableHead>Conv. Rate</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {analyticsData.topPerformingTemplates.map((template, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{template.name}</TableCell>
                                    <TableCell>{template.campaigns}</TableCell>
                                    <TableCell>{template.totalSent}</TableCell>
                                    <TableCell className="text-green-500">{template.readRate}%</TableCell>
                                    <TableCell className="text-yellow-500">{template.replyRate}%</TableCell>
                                    <TableCell className="text-blue-500">{template.convRate}%</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {analyticsData.insights.map((insight, index) => {
                    const Icon = insight.icon;
                    return (
                        <Card key={index}>
                            <CardContent className="p-4 flex items-start gap-4">
                                <Icon className={`mt-1 h-5 w-5 ${insight.color}`} />
                                <p className="text-xs text-muted-foreground">{insight.text}</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
