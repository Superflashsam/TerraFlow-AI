"use client";

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Calendar,
  Eye,
  FileText,
  Paperclip,
  Settings,
  Circle,
  Plus,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const iconMap: { [key: string]: React.ElementType } = {
  Phone,
  Mail,
  Calendar,
  Eye,
  FileText,
  Paperclip,
  Settings,
  Circle,
  Plus,
  ChevronDown,
  ChevronUp,
};

const ActivityTimeline = ({
  activities,
  onAddActivity,
}: {
  activities: any[];
  onAddActivity: (activity: any) => void;
}) => {
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [newActivity, setNewActivity] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleAddActivity = () => {
    if (newActivity.trim()) {
      onAddActivity({
        id: Date.now(),
        type: 'note',
        title: 'Manual Note',
        content: newActivity,
        timestamp: new Date(),
        user: 'You',
      });
      setNewActivity('');
      setShowAddForm(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return 'Phone';
      case 'email': return 'Mail';
      case 'meeting': return 'Calendar';
      case 'property_view': return 'Eye';
      case 'note': return 'FileText';
      case 'document': return 'Paperclip';
      case 'system': return 'Settings';
      default: return 'Circle';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'call': return 'text-green-500';
      case 'email': return 'text-primary';
      case 'meeting': return 'text-accent-foreground';
      case 'property_view': return 'text-secondary';
      case 'note': return 'text-muted-foreground';
      case 'document': return 'text-yellow-500';
      case 'system': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp: string | Date) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Activity Timeline</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus className="mr-2" />
          Add Note
        </Button>
      </div>

      {showAddForm && (
        <div className="bg-muted rounded-lg p-4 border border-border">
          <textarea
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
            placeholder="Add a note about this lead..."
            className="w-full p-3 bg-card border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={3}
          />
          <div className="flex justify-end space-x-2 mt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowAddForm(false);
                setNewActivity('');
              }}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleAddActivity}
              disabled={!newActivity.trim()}
            >
              Add Note
            </Button>
          </div>
        </div>
      )}

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border"></div>
        <div className="space-y-6">
          {activities.map((activity) => {
              const Icon = iconMap[getActivityIcon(activity.type)];
              const ExpandedIcon = expandedItems.has(activity.id) ? ChevronUp : ChevronDown;
              return (
                <div key={activity.id} className="relative flex items-start space-x-4">
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-card border-2 border-border rounded-full">
                    <Icon
                      size={16}
                      className={getActivityColor(activity.type)}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-foreground">{activity.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-muted-foreground">{activity.user}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">
                              {formatTimestamp(activity.timestamp)}
                            </span>
                          </div>
                        </div>
                        {activity.content && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpanded(activity.id)}
                          >
                            <ExpandedIcon/>
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{activity.summary}</p>
                      {activity.content && expandedItems.has(activity.id) && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <div className="text-sm text-foreground whitespace-pre-wrap">
                            {activity.content}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
        </div>

        {activities.length > 0 && (
          <div className="text-center mt-6">
            <Button variant="ghost" size="sm">
              Load Earlier Activities
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export { ActivityTimeline };