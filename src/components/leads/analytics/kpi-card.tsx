
"use client";
import React from 'react';
import { TrendingUp, TrendingDown, Minus, Users, DollarSign, Clock, Star, Target } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

const iconMap: { [key: string]: LucideIcon } = {
    Users,
    TrendingUp,
    DollarSign,
    Clock,
    Target,
    Star,
    Minus,
    TrendingDown,
};


type KPICardProps = {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: keyof typeof iconMap;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'indigo' | 'pink';
};


export const KPICard = ({ title, value, change, changeType, icon, color = 'blue' }: KPICardProps) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-green-600';
    if (changeType === 'negative') return 'text-red-600';
    return 'text-gray-600';
  };

  const ChangeIcon = changeType === 'positive' ? TrendingUp : TrendingDown;
  const Icon = iconMap[icon];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    pink: 'bg-pink-100 text-pink-600'
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
        <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
          <ChangeIcon size={16} />
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
};
