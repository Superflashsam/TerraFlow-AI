
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import AppIcon from '../../../components/contacts/app-icon';

const MarketTrendChart = () => {
  const [chartType, setChartType] = useState('price'); // 'price', 'volume', 'combined'

  const trendData = [
    {
      month: 'Jan 2024',
      avgPrice: 11500,
      volume: 1250,
      priceChange: 2.1,
      volumeChange: 8.5,
      inventory: 4200
    },
    {
      month: 'Feb 2024',
      avgPrice: 11650,
      volume: 1180,
      priceChange: 1.3,
      volumeChange: -5.6,
      inventory: 4350
    },
    {
      month: 'Mar 2024',
      avgPrice: 11800,
      volume: 1420,
      priceChange: 1.3,
      volumeChange: 20.3,
      inventory: 4100
    },
    {
      month: 'Apr 2024',
      avgPrice: 12100,
      volume: 1380,
      priceChange: 2.5,
      volumeChange: -2.8,
      inventory: 3950
    },
    {
      month: 'May 2024',
      avgPrice: 12250,
      volume: 1520,
      priceChange: 1.2,
      volumeChange: 10.1,
      inventory: 3800
    },
    {
      month: 'Jun 2024',
      avgPrice: 12400,
      volume: 1650,
      priceChange: 1.2,
      volumeChange: 8.6,
      inventory: 3650
    },
    {
      month: 'Jul 2024',
      avgPrice: 12550,
      volume: 1580,
      priceChange: 1.2,
      volumeChange: -4.2,
      inventory: 3720
    },
    {
      month: 'Aug 2024',
      avgPrice: 12700,
      volume: 1720,
      priceChange: 1.2,
      volumeChange: 8.9,
      inventory: 3580
    },
    {
      month: 'Sep 2024',
      avgPrice: 12850,
      volume: 1680,
      priceChange: 1.2,
      volumeChange: -2.3,
      inventory: 3620
    },
    {
      month: 'Oct 2024',
      avgPrice: 13000,
      volume: 1750,
      priceChange: 1.2,
      volumeChange: 4.2,
      inventory: 3500
    }
  ];

  const seasonalPatterns = [
    { season: 'Q1', historical: 85, current: 92, forecast: 88 },
    { season: 'Q2', historical: 78, current: 85, forecast: 82 },
    { season: 'Q3', historical: 72, current: 78, forecast: 75 },
    { season: 'Q4', historical: 95, current: 98, forecast: 96 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.name?.includes('Price') ? `₹${entry?.value?.toLocaleString()}` : entry?.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Market Trend Analysis</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setChartType('price')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                chartType === 'price' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Price Trends
            </button>
            <button
              onClick={() => setChartType('volume')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                chartType === 'volume' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Transaction Volume
            </button>
            <button
              onClick={() => setChartType('combined')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                chartType === 'combined' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Combined View
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Main Chart */}
        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'price' ? (
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={(value) => `₹${((value as number) / 1000)?.toFixed(0)}K`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="avgPrice" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3}
                  name="Average Price"
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            ) : chartType === 'volume' ? (
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="volume" 
                  fill="var(--color-accent)" 
                  name="Transaction Volume"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            ) : (
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  yAxisId="price"
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={(value) => `₹${((value as number) / 1000)?.toFixed(0)}K`}
                />
                <YAxis 
                  yAxisId="volume"
                  orientation="right"
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  yAxisId="price"
                  type="monotone" 
                  dataKey="avgPrice" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3}
                  name="Average Price"
                />
                <Line 
                  yAxisId="volume"
                  type="monotone" 
                  dataKey="volume" 
                  stroke="var(--color-accent)" 
                  strokeWidth={3}
                  name="Transaction Volume"
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Seasonal Patterns */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-semibold text-foreground">Seasonal Market Patterns</h4>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <AppIcon name="Info" size={16} />
              <span>Market activity index (0-100)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {seasonalPatterns?.map((pattern, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <h5 className="text-sm font-medium text-foreground mb-3">{pattern?.season}</h5>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Historical</span>
                    <span className="font-medium">{pattern?.historical}</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-1.5">
                    <div
                      className="bg-secondary h-1.5 rounded-full"
                      style={{ width: `${pattern?.historical}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Current</span>
                    <span className="font-medium text-primary">{pattern?.current}</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-1.5">
                    <div
                      className="bg-primary h-1.5 rounded-full"
                      style={{ width: `${pattern?.current}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Forecast</span>
                    <span className="font-medium text-accent">{pattern?.forecast}</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-1.5">
                    <div
                      className="bg-accent h-1.5 rounded-full"
                      style={{ width: `${pattern?.forecast}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketTrendChart;
