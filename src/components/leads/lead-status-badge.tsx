"use client";

import React from 'react';
import {
  Plus,
  Phone,
  CheckCircle,
  FileText,
  MessageSquare,
  Trophy,
  X,
} from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  Plus,
  Phone,
  CheckCircle,
  FileText,
  MessageSquare,
  Trophy,
  X,
};

const LeadStatusBadge = ({
  status,
  size = 'default',
}: {
  status: string;
  size?: 'sm' | 'default' | 'lg';
}) => {
  const getStatusConfig = (status: string) => {
    const configs: { [key: string]: { label: string; color: string; icon: string } } = {
      new: {
        label: 'New',
        color: 'bg-accent text-accent-foreground',
        icon: 'Plus',
      },
      contacted: {
        label: 'Contacted',
        color: 'bg-secondary text-secondary-foreground',
        icon: 'Phone',
      },
      qualified: {
        label: 'Qualified',
        color: 'bg-yellow-500 text-white',
        icon: 'CheckCircle',
      },
      proposal_sent: {
        label: 'Proposal Sent',
        color: 'bg-primary text-primary-foreground',
        icon: 'FileText',
      },
      negotiation: {
        label: 'Negotiation',
        color: 'bg-yellow-500 text-white',
        icon: 'MessageSquare',
      },
      closed_won: {
        label: 'Closed Won',
        color: 'bg-green-500 text-white',
        icon: 'Trophy',
      },
      closed_lost: {
        label: 'Closed Lost',
        color: 'bg-muted text-muted-foreground',
        icon: 'X',
      },
    };

    return configs[status] || configs.new;
  };

  const config = getStatusConfig(status);
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
    <div
      className={`inline-flex items-center space-x-1.5 rounded-full font-medium ${config.color} ${sizeClasses[size]}`}
    >
      <Icon size={iconSizes[size]} />
      <span>{config.label}</span>
    </div>
  );
};

export { LeadStatusBadge };