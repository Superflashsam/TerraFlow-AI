"use client";

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, TrendingUp, TrendingDown, Eye, MessageCircle, Calendar, Clock, AlertTriangle, Lightbulb } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const PerformanceDashboard = ({ properties }: { properties: any[] }) => {
  const [timeFrame, setTimeFrame] = useState('30days');

  const viewsData = [
    { date: '2025-10-01', views: 45, inquiries: 3, showings: 1 },
    { date: '2025-10-03', views: 52, inquiries: 5, showings: 2 },
    { date: '2025-10-05', views: 38, inquiries: 2, showings: 1 },
    { date: '2025-10-07', views: 67, inquiries: 8, showings: 4 },
    { date: '2025-10-09', views: 74, inquiries: 6, showings: 3 },
    { date: '2025-10-11', views: 59, inquiries: 7, showings: 5 },
    { date: '2025-10-13', views: 83, inquiries: 9, showings: 6 }
  ];

  const propertyPerformance = [
    { name: '3BHK Luxury Apartment', views: 245, inquiries: 12, conversion: 4.9 },
    { name: 'Premium Villa', views: 189, inquiries: 22, conversion: 11.6 },
    { name: '2BHK Modern Flat', views: 328, inquiries: 28, conversion: 8.5 },
    { name: 'Luxury Penthouse', views: 156, inquiries: 9, conversion: 5.8 }
  ];

  const sourceData = [
    { name: 'Website', value: 45, color: '#8884d8' },
    { name: 'Social Media', value: 25, color: '#82ca9d' },
    { name: 'Real Estate Portals', value: 20, color: '#ffc658' },
    { name: 'Referrals', value: 10, color: '#ff7300' }
  ];

  const marketComparison = [
    { metric: 'Avg Views per Listing', yourValue: 218, marketAvg: 165 },
    { metric: 'Conversion Rate', yourValue: 7.7, marketAvg: 5.2 },
    { metric: 'Days on Market', yourValue: 38, marketAvg: 45 },
    { metric: 'Price per Sq Ft', yourValue: 6250, marketAvg: 5890 }
  ];

  const kpiCards = [
    {
      title: 'Total Views (30d)',
      value: '1,247',
      change: '+18.5%',
      trend: 'up',
      icon: Eye,
      color: 'bg-primary'
    },
    {
      title: 'Total Inquiries',
      value: '89',
      change: '+12.3%', 
      trend: 'up',
      icon: MessageCircle,
      color: 'bg-green-500'
    },
    {
      title: 'Showings Scheduled',
      value: '34',
      change: '+8.7%',
      trend: 'up', 
      icon: Calendar,
      color: 'bg-yellow-500'
    },
    {
      title: 'Avg Response Time',
      value: '2.4h',
      change: '-15min',
      trend: 'up',
      icon: Clock,
      color: 'bg-accent'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Performance Dashboard</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Track listing performance, market insights, and competitive analysis
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            className="border border-border rounded-md px-3 py-2 text-sm bg-background"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="1year">Last year</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${kpi.color}`}>
                <kpi.icon size={20} color="white" />
              </div>
              <div className={`flex items-center space-x-1 ${
                kpi.trend === 'up' ? 'text-green-500' : 'text-destructive'
              }`}>
                {kpi.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14}/>}
                <span className="text-sm font-medium">{kpi.change}</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-2xl font-semibold text-foreground">{kpi.value}</div>
              <div className="text-sm text-muted-foreground">{kpi.title}</div>
            </div>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardTitle className="mb-4">Views & Inquiries Trend</CardTitle>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="inquiries" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <CardTitle className="mb-4">Traffic Sources</CardTitle>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <Card className="p-6">
        <CardTitle className="mb-4">Property Performance Ranking</CardTitle>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-sm font-medium text-muted-foreground">Property</th>
                <th className="text-right py-3 text-sm font-medium text-muted-foreground">Views</th>
                <th className="text-right py-3 text-sm font-medium text-muted-foreground">Inquiries</th>
                <th className="text-right py-3 text-sm font-medium text-muted-foreground">Conversion Rate</th>
                <th className="text-right py-3 text-sm font-medium text-muted-foreground">Ranking</th>
              </tr>
            </thead>
            <tbody>
              {propertyPerformance.map((property, index) => (
                <tr key={index} className="border-b border-border/50">
                  <td className="py-3 text-sm text-foreground">{property.name}</td>
                  <td className="py-3 text-sm text-foreground text-right">{property.views}</td>
                  <td className="py-3 text-sm text-foreground text-right">{property.inquiries}</td>
                  <td className="py-3 text-sm text-foreground text-right">
                    <span className={`font-medium ${
                      property.conversion >= 8 ? 'text-green-500' : 
                      property.conversion >= 5 ? 'text-yellow-500' : 'text-muted-foreground'
                    }`}>
                      {property.conversion}%
                    </span>
                  </td>
                  <td className="py-3 text-sm text-right">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                      #{index + 1}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card className="p-6">
        <CardTitle className="mb-4">Market Comparison</CardTitle>
        <div className="space-y-4">
          {marketComparison.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="font-medium text-foreground">{item.metric}</div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Your Performance</div>
                  <div className="font-semibold text-foreground">{item.yourValue.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Market Average</div>
                  <div className="font-medium text-muted-foreground">{item.marketAvg.toLocaleString()}</div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  item.yourValue > item.marketAvg ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                }`}>
                  {item.yourValue > item.marketAvg ? 
                    `+${(((item.yourValue - item.marketAvg) / item.marketAvg) * 100).toFixed(1)}%` :
                    `${(((item.yourValue - item.marketAvg) / item.marketAvg) * 100).toFixed(1)}%`
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-6">
        <CardTitle className="mb-4">AI-Powered Insights</CardTitle>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <TrendingUp size={20} className="text-primary mt-0.5" />
            <div>
              <div className="font-medium text-foreground">Strong Performance Detected</div>
              <div className="text-sm text-muted-foreground">
                Your luxury penthouse listing is performing 18% above market average for similar properties.
                Consider increasing the asking price by 5-8%.
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <AlertTriangle size={20} className="text-yellow-500 mt-0.5" />
            <div>
              <div className="font-medium text-foreground">Optimization Opportunity</div>
              <div className="text-sm text-muted-foreground">
                Your 2BHK flat has high views but low conversion. Consider updating photos and 
                revising the property description to highlight unique features.
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <Lightbulb size={20} className="text-blue-500 mt-0.5" />
            <div>
              <div className="font-medium text-foreground">Market Trend Alert</div>
              <div className="text-sm text-muted-foreground">
                Similar properties in Baner area have seen 12% price increase this month. 
                Good time to list new properties or adjust current pricing.
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
