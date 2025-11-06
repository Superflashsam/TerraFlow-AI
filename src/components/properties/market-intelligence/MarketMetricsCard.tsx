
import React from 'react';
import AppIcon from '../../../components/contacts/app-icon';

const MarketMetricsCard = ({ title, value, change, trend, icon, unit = "" }: { title: string, value: string, change: number, trend: number[], icon: string, unit?: string }) => {
  const isPositive = change >= 0;
  const trendColor = isPositive ? 'text-accent' : 'text-destructive';
  const trendIcon = isPositive ? 'TrendingUp' : 'TrendingDown';

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <AppIcon name={icon} size={20} className="text-primary" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        <div className={`flex items-center space-x-1 ${trendColor}`}>
          <AppIcon name={trendIcon} size={16} />
          <span className="text-sm font-medium">{Math.abs(change)}%</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-2xl font-semibold text-foreground">
          {unit}{value}
        </div>
        
        {/* Trend Sparkline */}
        <div className="flex items-center space-x-1">
          {trend?.map((point, index) => (
            <div
              key={index}
              className={`w-1 rounded-full ${
                point > 50 ? 'bg-accent' : 'bg-muted'
              }`}
              style={{ height: `${Math.max(point / 2, 8)}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketMetricsCard;
