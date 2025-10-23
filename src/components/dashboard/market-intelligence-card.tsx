"use client";
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type IntelligenceItem = {
    icon: React.ElementType;
    title: string;
    description: string;
    time: string;
    level: 'high' | 'medium' | 'low';
};

const intelligenceData: IntelligenceItem[] = [
    {
        icon: TrendingUp,
        title: 'Market Opportunity',
        description: 'Luxury segment showing 15% growth in Mumbai region with high-value leads increasing.',
        time: '2 hours ago',
        level: 'high',
    },
    {
        icon: AlertTriangle,
        title: 'Competitor Alert',
        description: 'Major competitor launched aggressive pricing strategy in Pune market.',
        time: '4 hours ago',
        level: 'medium',
    },
    {
        icon: CheckCircle2,
        title: 'Performance Milestone',
        description: 'Q3 targets exceeded by 12% with strong performance in residential sector.',
        time: '1 day ago',
        level: 'low',
    },
];

const getLevelVariant = (level: 'high' | 'medium' | 'low'): 'destructive' | 'secondary' | 'default' => {
    switch (level) {
        case 'high':
            return 'destructive';
        case 'medium':
            return 'secondary';
        case 'low':
            return 'default';
        default:
            return 'default';
    }
};

const getLevelIconColor = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
        case 'high':
            return 'text-destructive';
        case 'medium':
            return 'text-yellow-500';
        case 'low':
            return 'text-green-500';
    }
}

function IntelligenceCardItem({ item }: { item: IntelligenceItem }) {
    const Icon = item.icon;

    return (
        <div className="flex items-start gap-4">
            <Icon className={`h-6 w-6 mt-1 ${getLevelIconColor(item.level)}`} />
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <p className="font-semibold">{item.title}</p>
                    <Badge variant={getLevelVariant(item.level)} className="capitalize">{item.level}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                <p className="text-xs text-muted-foreground mt-2">{item.time}</p>
            </div>
        </div>
    );
}

export function MarketIntelligenceCard() {
    return (
        <Card className="h-full">
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Market Intelligence</CardTitle>
                <Button variant="ghost" size="icon">
                    <Globe className="h-5 w-5" />
                </Button>
            </CardHeader>
            <CardContent className="space-y-6">
                {intelligenceData.map((item, index) => (
                    <IntelligenceCardItem key={index} item={item} />
                ))}
            </CardContent>
        </Card>
    );
}
