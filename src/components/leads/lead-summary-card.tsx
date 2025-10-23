"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Edit2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const LeadSummaryCard = ({
  lead,
  onEdit,
  onCall,
  onEmail,
  onScheduleMeeting,
}: {
  lead: any;
  onEdit: (lead: any) => void;
  onCall: () => void;
  onEmail: () => void;
  onScheduleMeeting: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState(lead);

  const handleSave = () => {
    onEdit(editedLead);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedLead(lead);
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'hot': return 'bg-destructive text-destructive-foreground';
      case 'warm': return 'bg-yellow-500 text-white';
      case 'cold': return 'bg-secondary text-secondary-foreground';
      case 'qualified': return 'bg-green-500 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="w-16 h-16">
                <AvatarImage src={lead.avatar} alt={lead.name} />
                <AvatarFallback>{lead.name.split(' ').map((n:string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div
              className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card ${
                lead.isOnline ? 'bg-green-500' : 'bg-muted'
              }`}
            ></div>
          </div>
          <div>
            {isEditing ? (
              <input
                type="text"
                value={editedLead.name}
                onChange={(e) => setEditedLead({ ...editedLead, name: e.target.value })}
                className="text-xl font-semibold bg-transparent border-b border-border focus:outline-none focus:border-primary"
              />
            ) : (
              <h2 className="text-xl font-semibold text-foreground">{lead.name}</h2>
            )}
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                {lead.status}
              </span>
              <span className="text-sm text-muted-foreground">Lead #{lead.id}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={handleCancel}>Cancel</Button>
              <Button variant="default" size="sm" onClick={handleSave}>Save</Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
              <Edit2 className="mr-2" /> Edit
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-3">
          <Mail size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{lead.email}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Phone size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{lead.phone}</span>
        </div>
        <div className="flex items-center space-x-3">
          <MapPin size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{lead.location}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Calendar size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">
            Created: {new Date(lead.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">AI Lead Score</span>
          <span className="text-lg font-semibold text-primary">{lead.score}/100</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${lead.score}%` }}
          ></div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{lead.scoreReason}</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Button variant="outline" size="sm" onClick={onCall}><Phone className="mr-2"/>Call</Button>
        <Button variant="outline" size="sm" onClick={onEmail}><Mail className="mr-2"/>Email</Button>
        <Button variant="outline" size="sm" onClick={onScheduleMeeting}><Calendar className="mr-2"/>Meet</Button>
      </div>
    </div>
  );
};

export { LeadSummaryCard };