"use client"

import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Info, Lightbulb, TrendingUp, Sparkles, Users } from 'lucide-react';

const analyticsData = {
  performanceOverTime: [
    { name: 'Day 1', sent: 4000, delivered: 3980, opened: 1800, clicked: 500, unsubscribed: 20 },
    { name: 'Day 5', sent: 4200, delivered: 4150, opened: 1950, clicked: 550, unsubscribed: 22 },
    { name: 'Day 10', sent: 3800, delivered: 3750, opened: 1700, clicked: 480, unsubscribed: 18 },
    { name: 'Day 15', sent: 4500, delivered: 4450, opened: 2100, clicked: 620, unsubscribed: 25 },
    { name: 'Day 20', sent: 4800, delivered: 4750, opened: 2200, clicked: 650, unsubscribed: 28 },
    { name: 'Day 25', sent: 5000, delivered: 4950, opened: 2300, clicked: 700, unsubscribed: 30 },
    { name: 'Day 30', sent: 5200, delivered: 5150, opened: 2400, clicked: 720, unsubscribed: 32 },
  ],
  campaignComparison: [
    { name: 'Q4 Launch', openRate: 48, clickRate: 15 },
    { name: 'Diwali Offer', openRate: 55, clickRate: 18 },
    { name: 'NY Special', openRate: 45, clickRate: 12 },
    { name: 'Re-engagement', openRate: 35, clickRate: 8 },
  ],
  engagementFunnel: [
    { stage: 'Sent', value: 24567, color: '#8884d8' },
    { stage: 'Delivered', value: 24489, color: '#82ca9d' },
    { stage: 'Opened', value: 10359, color: '#ffc658' },
    { stage: 'Clicked', value: 3118, color: '#ff7300' },
    { stage: 'Converted', value: 247, color: '#00C49F' },
  ],
  deviceBreakdown: [
    { name: 'Desktop', value: 45, color: '#0088FE' },
    { name: 'Mobile', value: 48, color: '#00C49F' },
    { name: 'Tablet', value: 7, color: '#FFBB28' },
  ],
  topEmails: [
    { subject: 'Your Exclusive Invite: Whitefield Project Launch', campaign: 'Q4 Launch', sent: 'Nov 10', recipients: 2450, openRate: '52.1%', clickRate: '16.3%', conversion: '2.1%', revenue: '₹45L' },
    { subject: 'Diwali Sparkle: 20% Off on Bookings!', campaign: 'Diwali Offer', sent: 'Nov 1', recipients: 4200, openRate: '58.7%', clickRate: '20.1%', conversion: '3.4%', revenue: '₹82L' },
  ],
  subscriberHealth: {
    total: 8947,
    active: { count: 4521, perc: 50.5 },
    inactive: { count: 3240, perc: 36.2 },
    unsubscribed: { count: 1186, perc: 13.3 },
    growth: [ { month: 'Aug', value: 8200 }, { month: 'Sep', value: 8550 }, { month: 'Oct', value: 8947 }]
  },
  aiInsights: [
    { text: "Best send time: Tuesday at 10 AM shows a 52% open rate, which is 15% higher than your average.", icon: Check, color: 'text-green-500' },
    { text: "Subject lines with emojis (e.g., ✨, 🏡) are increasing open rates by an average of 18%.", icon: Lightbulb, color: 'text-yellow-500' },
    { text: "Property showcase emails with at least 3 images are converting 3x better than text-only announcements.", icon: Info, color: 'text-blue-500' },
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
  
const FunnelChart = ({ data }: {data: any[]}) => {
    const maxValue = data[0].value;
    return (
        <div className="w-full space-y-2">
            {data.map((item, index) => {
                const percentage = (item.value / maxValue * 100).toFixed(1);
                return (
                    <div key={index} className="flex items-center gap-4">
                        <div className="w-28 text-right text-sm text-muted-foreground">{item.stage}</div>
                        <div className="flex-1 bg-muted rounded-full h-8">
                            <div style={{ width: `${percentage}%`, backgroundColor: item.color }} className="h-8 rounded-full flex items-center justify-between px-2 text-white text-xs font-medium">
                                <span>{item.value.toLocaleString()}</span>
                                <span>({(item.value / (data[index-1]?.value || maxValue) * 100).toFixed(1)}%)</span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export const AnalyticsTab = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Email Performance Over Time</CardTitle>
                        <CardDescription>Last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={analyticsData.performanceOverTime}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} />
                                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{fontSize: "12px"}}/>
                                <Line type="monotone" dataKey="sent" stroke="#8884d8" name="Sent" />
                                <Line type="monotone" dataKey="delivered" stroke="#82ca9d" name="Delivered" />
                                <Line type="monotone" dataKey="opened" stroke="#ffc658" name="Opened" />
                                <Line type="monotone" dataKey="clicked" stroke="#ff7300" name="Clicked" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Campaign Comparison</CardTitle>
                        <CardDescription>Open vs Click rates</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={analyticsData.campaignComparison}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} />
                                <YAxis tickFormatter={(val) => `${val}%`} tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{fontSize: "12px"}}/>
                                <Bar dataKey="openRate" fill="#8884d8" name="Open Rate" radius={[4,4,0,0]} />
                                <Bar dataKey="clickRate" fill="#82ca9d" name="Click Rate" radius={[4,4,0,0]}/>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <Card className="lg:col-span-3">
                    <CardHeader><CardTitle>Engagement Funnel</CardTitle></CardHeader>
                    <CardContent>
                        <FunnelChart data={analyticsData.engagementFunnel} />
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader><CardTitle>Device Breakdown</CardTitle></CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie data={analyticsData.deviceBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                                    {analyticsData.deviceBreakdown.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                                <Tooltip />
                                <Legend wrapperStyle={{fontSize: "12px"}}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader><CardTitle>Top Performing Emails</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Subject</TableHead><TableHead>Campaign</TableHead><TableHead>Recipients</TableHead><TableHead>Open</TableHead><TableHead>Click</TableHead><TableHead>Revenue</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {analyticsData.topEmails.map((email, i) => (
                                <TableRow key={i}><TableCell className="font-medium">{email.subject}</TableCell><TableCell>{email.campaign}</TableCell><TableCell>{email.recipients}</TableCell><TableCell>{email.openRate}</TableCell><TableCell>{email.clickRate}</TableCell><TableCell>{email.revenue}</TableCell></TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Subscriber Health</CardTitle>
                        <CardDescription>Total Subscribers: {analyticsData.subscriberHealth.total.toLocaleString()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                            <div><p className="font-bold text-lg text-green-500">{analyticsData.subscriberHealth.active.count.toLocaleString()}</p><p className="text-xs text-muted-foreground">Active ({analyticsData.subscriberHealth.active.perc}%)</p></div>
                            <div><p className="font-bold text-lg text-yellow-500">{analyticsData.subscriberHealth.inactive.count.toLocaleString()}</p><p className="text-xs text-muted-foreground">Inactive ({analyticsData.subscriberHealth.inactive.perc}%)</p></div>
                            <div><p className="font-bold text-lg text-red-500">{analyticsData.subscriberHealth.unsubscribed.count.toLocaleString()}</p><p className="text-xs text-muted-foreground">Unsubscribed ({analyticsData.subscriberHealth.unsubscribed.perc}%)</p></div>
                        </div>
                        <ResponsiveContainer width="100%" height={100}>
                            <LineChart data={analyticsData.subscriberHealth.growth}>
                                <YAxis domain={['dataMin - 100', 'dataMax + 100']} hide />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center gap-2">
                        <Sparkles className="text-primary"/>
                        <CardTitle>AI Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       {analyticsData.aiInsights.map((insight, index) => {
                            const Icon = insight.icon;
                            return (
                                <div key={index} className="flex items-start gap-4">
                                    <Icon className={`mt-1 h-5 w-5 ${insight.color}`} />
                                    <p className="text-xs text-muted-foreground">{insight.text}</p>
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
