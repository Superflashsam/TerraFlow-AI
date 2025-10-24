
"use client";
import React from 'react';
import { Home, AlertTriangle, Clock, CheckCircle, Circle, Target, User, Timer, Phone, Mail, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

export const LeadCard = ({ lead, onClick }: { lead: any, onClick: (lead: any) => void }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', lead.id.toString());
  };

  const getPriorityClasses = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-destructive bg-destructive/10';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10';
      case 'low': return 'border-green-500 bg-green-500/10';
      default: return 'border-border bg-card';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle size={14} className="text-destructive"/>;
      case 'medium': return <Clock size={14} className="text-yellow-500"/>;
      case 'low': return <CheckCircle size={14} className="text-green-500"/>;
      default: return <Circle size={14} />;
    }
  };

  const getLeadScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400 bg-green-500/10';
    if (score >= 60) return 'text-yellow-400 bg-yellow-500/10';
    return 'text-red-400 bg-red-500/10';
  };

  const formatDealValue = (value: string) => {
    return value?.replace(/₹|Cr/g, '')?.trim();
  };

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      onClick={() => onClick(lead)}
      className={`p-4 cursor-pointer hover:shadow-md transition-all duration-200 ${getPriorityClasses(lead.priority)}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Image 
            src={lead.profileImage} 
            alt={lead.alt}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <h4 className="font-medium text-foreground text-sm">{lead.name}</h4>
            <p className="text-xs text-muted-foreground">{lead.company}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {getPriorityIcon(lead.priority)}
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getLeadScoreColor(lead.leadScore)}`}>
            {lead.leadScore}
          </span>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center space-x-1 mb-1">
          <Home size={12} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Property Interest</span>
        </div>
        <p className="text-sm text-foreground font-medium">{lead.propertyInterest}</p>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs text-muted-foreground">Deal Value</div>
          <div className="text-sm font-semibold text-primary">₹{formatDealValue(lead.dealValue)}Cr</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Budget</div>
          <div className="text-sm text-foreground">{lead.budget}</div>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center space-x-2">
          <Clock size={12} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Timeline: {lead.timeline}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Target size={12} className="text-muted-foreground" />
          <span className="text-xs text-foreground">{lead.nextAction}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-1">
          <Timer size={12} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {lead.timeInStage} day{lead.timeInStage !== 1 ? 's' : ''} in stage
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <User size={12} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{lead.assignee}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="text-xs text-muted-foreground">{lead.source}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {new Date(lead.lastActivity).toLocaleDateString('en-IN', { month: 'short', day: '2-digit' })}
        </div>
      </div>

      <div className="flex items-center justify-center space-x-1 mt-3 pt-2 border-t border-border/50">
        <button className="flex-1 flex items-center justify-center space-x-1 py-1.5 px-2 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" title="Call" onClick={(e) => { e.stopPropagation(); console.log('Call lead:', lead.id); }}>
          <Phone size={12} />
          <span>Call</span>
        </button>
        <button className="flex-1 flex items-center justify-center space-x-1 py-1.5 px-2 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" title="Email" onClick={(e) => { e.stopPropagation(); console.log('Email lead:', lead.id); }}>
          <Mail size={12} />
          <span>Email</span>
        </button>
        <button className="flex-1 flex items-center justify-center space-x-1 py-1.5 px-2 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" title="Schedule" onClick={(e) => { e.stopPropagation(); console.log('Schedule with lead:', lead.id); }}>
          <Calendar size={12} />
          <span>Schedule</span>
        </button>
      </div>
    </Card>
  );
};
