
"use client";
import React from 'react';
import { Facebook, Globe, Linkedin, Mail, Search, TrendingDown, TrendingUp, Users } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const iconMap: { [key: string]: LucideIcon } = {
    Search,
    Facebook,
    Globe,
    Users,
    Mail,
    Linkedin,
    TrendingUp,
    TrendingDown,
};

export const TopSourcesRanking = () => {
  const sourceData = [
    {
      id: 1,
      name: 'Google Ads',
      leads: 847,
      conversion: 12.5,
      cost: 45200,
      trend: 'up' as const,
      icon: 'Search' as keyof typeof iconMap,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Facebook Ads',
      leads: 623,
      conversion: 8.7,
      cost: 32100,
      trend: 'up' as const,
      icon: 'Facebook' as keyof typeof iconMap,
      color: 'bg-blue-600'
    },
    {
      id: 3,
      name: 'Website Organic',
      leads: 456,
      conversion: 15.2,
      cost: 0,
      trend: 'up' as const,
      icon: 'Globe' as keyof typeof iconMap,
      color: 'bg-green-500'
    },
    {
      id: 4,
      name: 'Referrals',
      leads: 234,
      conversion: 22.8,
      cost: 5600,
      trend: 'up' as const,
      icon: 'Users' as keyof typeof iconMap,
      color: 'bg-purple-500'
    },
    {
      id: 5,
      name: 'Email Campaign',
      leads: 189,
      conversion: 6.3,
      cost: 12400,
      trend: 'down' as const,
      icon: 'Mail' as keyof typeof iconMap,
      color: 'bg-orange-500'
    },
    {
      id: 6,
      name: 'LinkedIn Ads',
      leads: 156,
      conversion: 18.9,
      cost: 28900,
      trend: 'up' as const,
      icon: 'Linkedin' as keyof typeof iconMap,
      color: 'bg-blue-700'
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend: 'up' | 'down') => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Lead Sources</CardTitle>
        <div className="flex items-center justify-between">
            <CardDescription>Performance ranking of lead channels.</CardDescription>
            <Button variant="link" size="sm">
                View All Sources
            </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {sourceData.map((source, index) => {
            const TrendIcon = getTrendIcon(source.trend);
            const Icon = iconMap[source.icon];
            return (
                <div key={source.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                    <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-muted-foreground w-6">
                        #{index + 1}
                        </span>
                        <div className={`p-2 rounded-lg ${source.color}`}>
                            <Icon size={16} className="text-white" />
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="font-medium text-foreground">{source.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span>{source.leads} leads</span>
                        <span>•</span>
                        <span>{source.conversion}% conversion</span>
                        {source.cost > 0 && (
                            <>
                            <span>•</span>
                            <span>₹{source.cost.toLocaleString()}</span>
                            </>
                        )}
                        </div>
                    </div>
                    </div>

                    <div className="flex items-center space-x-2">
                    <div className={`flex items-center space-x-1 ${getTrendColor(source.trend)}`}>
                        <TrendIcon size={16} />
                        <span className="text-sm font-medium">
                        {source.trend === 'up' ? '+' : '-'}
                        {Math.floor(Math.random() * 15 + 5)}%
                        </span>
                    </div>
                    </div>
                </div>
            )
        })}
        <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <h4 className="text-sm font-medium text-primary mb-2">Performance Insights</h4>
            <div className="space-y-1 text-sm text-primary/80">
            <p>• Referrals show highest conversion at 22.8%</p>
            <p>• Google Ads generates most volume with 847 leads</p>
            <p>• Organic traffic provides best ROI (zero cost)</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};
