"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { Lightbulb, TrendingUp, ThumbsDown } from 'lucide-react';

const intentData = [
  { name: 'Purchase Intent', value: 42, color: 'hsl(var(--primary))' },
  { name: 'Information Seeking', value: 31, color: 'hsl(var(--chart-2))' },
  { name: 'Price Negotiation', value: 18, color: 'hsl(var(--chart-3))' },
  { name: 'Not Interested', value: 9, color: 'hsl(var(--muted))' },
];

const sentimentData = [
    { name: 'Week 1', positive: 75, neutral: 20, negative: 5 },
    { name: 'Week 2', positive: 78, neutral: 18, negative: 4 },
    { name: 'Week 3', positive: 82, neutral: 15, negative: 3 },
    { name: 'Week 4', positive: 85, neutral: 12, negative: 3 },
];

const qualificationData = [
    { name: "Accurate", value: 87.4, color: 'hsl(var(--primary))' },
    { name: "Over-qualified", value: 8.2, color: 'hsl(var(--chart-4))' },
    { name: "Under-qualified", value: 4.4, color: 'hsl(var(--chart-5))' },
];

const commonQuestions = [ "Price?", "Location?", "Amenities?", "RERA approved?", "Discount?", "Loan options?", "Availability?" ];

const behaviorPatterns = [
    "Leads from 99acres ask about price first (82%)",
    "WhatsApp leads respond 3x faster than email",
    "Leads asking about RERA close 2.4x more often",
    "Best response time: Within 2 minutes of inquiry"
];

const objectionData = [
    { objection: "Price too high", count: 47, response: "Offer flexible payment plans." },
    { objection: "Location not preferred", count: 34, response: "Suggest alternative locations." },
    { objection: "Need more time", count: 28, response: "Schedule a follow-up in 7 days." },
];

const GaugeChart = ({ score, trend }: { score: number, trend: number }) => {
    const percentage = score * 10;
    const rotation = -90 + (percentage * 1.8);
    const trendIcon = trend > 0 ? <TrendingUp className="text-green-500" size={14} /> : <ThumbsDown className="text-destructive" size={14} />;
    
    return (
        <div className="relative flex flex-col items-center">
            <svg width="150" height="75" viewBox="0 0 150 75">
                <path d="M 10 70 A 65 65 0 0 1 140 70" stroke="hsl(var(--muted))" strokeWidth="15" fill="none" />
                <path d="M 10 70 A 65 65 0 0 1 140 70" stroke="hsl(var(--primary))" strokeWidth="15" fill="none" strokeDasharray="204.2" strokeDashoffset={204.2 * (1 - percentage / 100)} />
            </svg>
            <div className="absolute bottom-0 text-center">
                <div className="text-3xl font-bold">{score.toFixed(1)}/10</div>
                 <div className="flex items-center justify-center text-xs text-muted-foreground">
                    {trendIcon}
                    <span className={trend > 0 ? "text-green-500" : "text-destructive"}>{trend > 0 ? `+${trend}` : trend} vs last week</span>
                </div>
            </div>
        </div>
    );
};

export const InsightsTab = () => {
  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
                <CardHeader><CardTitle>Conversation Quality</CardTitle></CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                    <GaugeChart score={8.7} trend={0.4} />
                    <p className="text-xs text-muted-foreground mt-2">Factors: Response relevance, engagement, qualification accuracy</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle>Lead Intent Distribution</CardTitle></CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={intentData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={5}>
                                {intentData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                            </Pie>
                            <Tooltip />
                            <Legend wrapperStyle={{fontSize: '12px'}}/>
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle>Common Questions</CardTitle></CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {commonQuestions.map((q, i) => (
                        <span key={i} className="bg-muted px-3 py-1 rounded-full text-sm" style={{ fontSize: `${20 - i*1.5}px` }}>{q}</span>
                    ))}
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <Card>
                <CardHeader><CardTitle>Customer Sentiment Trend</CardTitle></CardHeader>
                <CardContent>
                     <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={sentimentData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" fontSize={12} />
                            <YAxis fontSize={12} unit="%"/>
                            <Tooltip />
                            <Legend wrapperStyle={{fontSize: '12px'}}/>
                            <Line type="monotone" dataKey="positive" name="Positive 😊" stroke="#22c55e" />
                            <Line type="monotone" dataKey="neutral" name="Neutral 😐" stroke="#f59e0b" />
                            <Line type="monotone" dataKey="negative" name="Negative 😞" stroke="#ef4444" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle>Qualification Accuracy</CardTitle></CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={qualificationData} layout="vertical">
                             <CartesianGrid strokeDasharray="3 3" horizontal={false}/>
                             <XAxis type="number" unit="%" fontSize={12}/>
                             <YAxis type="category" dataKey="name" width={100} fontSize={12} />
                             <Tooltip />
                             <Bar dataKey="value" name="Accuracy" radius={[0, 4, 4, 0]}>
                                 {qualificationData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                             </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <Card>
                <CardHeader><CardTitle>Lead Behavior Patterns</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                    {behaviorPatterns.map((pattern, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <Lightbulb className="h-4 w-4 text-primary mt-1 shrink-0"/>
                            <p className="text-sm text-muted-foreground">{pattern}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle>Objection Analysis</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                     {objectionData.map((item, index) => (
                         <div key={index}>
                            <p className="font-medium text-sm">{item.objection} <span className="text-muted-foreground">({item.count} occurrences)</span></p>
                            <p className="text-xs text-primary">Suggested Response: "{item.response}"</p>
                         </div>
                     ))}
                </CardContent>
            </Card>
        </div>
    </div>
  );
};
