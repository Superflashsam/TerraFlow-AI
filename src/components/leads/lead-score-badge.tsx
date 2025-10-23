"use client";

import React from 'react';
import { Flame, TrendingUp, Minus, TrendingDown, Snowflake } from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  Flame,
  TrendingUp,
  Minus,
  TrendingDown,
  Snowflake,
};

const LeadScoreBadge = ({
  score,
  size = 'default',
  showLabel = true,
}: {
  score: number;
  size?: 'sm' | 'default' | 'lg';
  showLabel?: boolean;
}) => {
  const getScoreConfig = (score: number) => {
    if (score >= 90) {
      return {
        label: 'Hot',
        color: 'bg-destructive text-destructive-foreground',
        progressColor: 'bg-destructive',
        icon: 'Flame',
      };
    } else if (score >= 70) {
      return {
        label: 'Warm',
        color: 'bg-yellow-500 text-white',
        progressColor: 'bg-yellow-500',
        icon: 'TrendingUp',
      };
    } else if (score >= 50) {
      return {
        label: 'Moderate',
        color: 'bg-accent text-accent-foreground',
        progressColor: 'bg-accent',
        icon: 'Minus',
      };
    } else if (score >= 30) {
      return {
        label: 'Cool',
        color: 'bg-secondary text-secondary-foreground',
        progressColor: 'bg-secondary',
        icon: 'TrendingDown',
      };
    } else {
      return {
        label: 'Cold',
        color: 'bg-muted text-muted-foreground',
        progressColor: 'bg-muted-foreground',
        icon: 'Snowflake',
      };
    }
  };

  const config = getScoreConfig(score);
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    default: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  const iconSizes = {
    sm: 12,
    default: 14,
    lg: 16,
  };

  const Icon = iconMap[config.icon];

  return (
    <div className="flex items-center space-x-2">
      <div
        className={`inline-flex items-center space-x-1.5 rounded-full font-medium ${config.color} ${sizeClasses[size]}`}
      >
        <Icon size={iconSizes[size]} />
        <span>{score}</span>
        {showLabel && size !== 'sm' && (
          <span className="hidden sm:inline">({config.label})</span>
        )}
      </div>

      {size !== 'sm' && (
        <div className="flex-1 max-w-20">
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${config.progressColor}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export { LeadScoreBadge };