
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
        color: 'bg-blue-500/10 text-blue-600',
        icon: 'Plus',
      },
      contacted: {
        label: 'Contacted',
        color: 'bg-cyan-500/10 text-cyan-600',
        icon: 'Phone',
      },
      qualified: {
        label: 'Qualified',
        color: 'bg-yellow-500/10 text-yellow-600',
        icon: 'CheckCircle',
      },
      proposal_sent: {
        label: 'Proposal Sent',
        color: 'bg-purple-500/10 text-purple-600',
        icon: 'FileText',
      },
      negotiation: {
        label: 'Negotiation',
        color: 'bg-orange-500/10 text-orange-600',
        icon: 'MessageSquare',
      },
      closed_won: {
        label: 'Closed Won',
        color: 'bg-green-500/10 text-green-600',
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
    sm: 14,
    default: 16,
    lg: 18,
  };

  const Icon = iconMap[config.icon];

  return (
    <div
      className={`inline-flex items-center space-x-1.5 rounded-full font-semibold ${config.color} ${sizeClasses[size]}`}
    >
      <Icon size={iconSizes[size]} />
      <span>{config.label}</span>
    </div>
  );
};

export { LeadStatusBadge };
