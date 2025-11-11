
"use client";

import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sparkles, TrendingUp, Scan, UserPlus } from 'lucide-react';
import Image from 'next/image';

const campaignPerformanceData = [
  { name: 'Times of India Ad', leads: 432, type: 'Print' },
  { name: 'Diwali Property Expo', leads: 680, type: 'Event' },
  { name: 'Deccan Herald Ad', leads: 234, type: 'Print' },
  { name: 'Brigade Road Hoarding', leads: 89, type: 'Billboard' },
];

const conversionFunnelData = [
  { name: 'QR Scans', value: 2847, color: '#8884d8' },
  { name: 'Form Started', value: 2145, color: '#83a6ed' },
  { name: 'Form Completed', value: 1680, color: '#8dd1e1' },
  { name: 'Leads Created', value: 1247, color: '#82ca9d' },
  { name: 'Walk-ins Scheduled', value: 89, color: '#a4de6c' },
];

const roiData = [
  { campaign: 'Times of India Ad', investment: '₹1,50,000', leads: 432, cpl: '₹347', deals: 3, revenue: '₹45L', roi: '2900%' },
  { campaign: 'Diwali Property Expo', investment: '₹2,50,000', leads: 680, cpl: '₹368', deals: 8, revenue: '₹2.1Cr', roi: '8300%' },
  { campaign: 'Brigade Road Hoarding', investment: '₹5,00,000', leads: 89, cpl: '₹5,618', deals: 0, revenue: '₹0', roi: '-100%' },
];

const timeData = [
    { time: '9 AM', scans: 150 }, { time: '12 PM', scans: 320 }, { time: '3 PM', scans: 280 },
    { time: '6 PM', scans: 450 }, { time: '9 PM', scans: 210 }
];

const sourceData = [
    { name: 'Print Media', value: 42, color: '#0088FE' },
    { name: 'Events', value: 31, color: '#00C49F' },
    { name: 'Hoardings', value: 18, color: '#FFBB28' },
    { name: 'Walk-ins', value: 9, color: '#FF8042' },
];

const aiInsights = [
    "Events generate highest quality leads (conversion: 8.2% vs avg 4.3%)",
    "Saturday events see 3x more scans than weekdays",
    "QR campaigns with logo customization scan 24% more",
    "Whitefield hoardings outperform KR Puram by 2.1x"
];

const CustomBarLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  return (
    <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`${value}`}</text>
  );
};

export const AnalyticsTab = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>Campaign Performance</CardTitle><CardDescription>Leads generated per campaign</CardDescription></CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={campaignPerformanceData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                <XAxis dataKey="name" tick={{fontSize: 12}} interval={0} angle={-30} textAnchor="end" height={80}/>
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="leads" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} label={<CustomBarLabel />} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle>Scan-to-Lead Conversion Funnel</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        {conversionFunnelData.map((stage, index) => (
                            <div key={stage.name} className="flex items-center gap-4">
                                <div className="w-32 text-right text-sm text-muted-foreground">{stage.name}</div>
                                <div className="flex-1 bg-muted rounded-full h-8">
                                    <div style={{width: `${(stage.value / conversionFunnelData[0].value) * 100}%`, backgroundColor: stage.color}} className="h-8 rounded-full flex items-center justify-between px-2 text-white text-xs font-medium">
                                        <span>{stage.value.toLocaleString()}</span>
                                        <span>({((stage.value / (conversionFunnelData[index-1]?.value || conversionFunnelData[0].value)) * 100).toFixed(1)}%)</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader><CardTitle>Campaign ROI Analysis</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Campaign</TableHead><TableHead>Investment</TableHead><TableHead>Leads</TableHead><TableHead>CPL</TableHead><TableHead>Deals</TableHead><TableHead>Revenue</TableHead><TableHead>ROI</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {roiData.map(row => (
                                <TableRow key={row.campaign}>
                                    <TableCell>{row.campaign}</TableCell>
                                    <TableCell>{row.investment}</TableCell>
                                    <TableCell>{row.leads}</TableCell>
                                    <TableCell>{row.cpl}</TableCell>
                                    <TableCell>{row.deals}</TableCell>
                                    <TableCell>{row.revenue}</TableCell>
                                    <TableCell className="font-semibold text-green-500">{row.roi}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <Card className="lg:col-span-3">
                    <CardHeader><CardTitle>Geographic Distribution</CardTitle><CardDescription>Heatmap of QR scans by area</CardDescription></CardHeader>
                    <CardContent>
                        <div className="relative w-full h-80 rounded-lg overflow-hidden bg-muted">
                             <Image
                                src="https://res.cloudinary.com/dvic0tda9/image/upload/v1721950485/map_z2v1m9.png"
                                alt="Map showing property location"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader><CardTitle>Time-Based Analysis</CardTitle><CardDescription>Peak scan times</CardDescription></CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={260}>
                            <LineChart data={timeData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                <XAxis dataKey="time" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip />
                                <Line type="monotone" dataKey="scans" stroke="hsl(var(--primary))" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <Card>
                    <CardHeader><CardTitle>Campaign Attribution</CardTitle><CardDescription>Lead source breakdown</CardDescription></CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                             <PieChart>
                                <Pie data={sourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                                    {sourceData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center gap-2">
                        <Sparkles className="text-primary"/>
                        <CardTitle>AI Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {aiInsights.map((insight, index) => (
                             <div key={index} className="flex items-start gap-3 text-sm">
                                <TrendingUp className="h-4 w-4 text-primary mt-1 shrink-0" />
                                <p className="text-muted-foreground">{insight}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
