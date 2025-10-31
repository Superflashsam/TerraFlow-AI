"use client";
import React, { useState } from 'react';
import AppIcon from '@/components/contacts/app-icon';
import { Button } from '@/components/ui/button';

const WorkflowTemplates = ({ onSelectTemplate, onCreateFromScratch }: { onSelectTemplate: (template: any) => void; onCreateFromScratch: () => void; }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templateCategories = [
    { id: 'all', name: 'All Templates', icon: 'Grid' },
    { id: 'lead_nurturing', name: 'Lead Nurturing', icon: 'Users' },
    { id: 'follow_up', name: 'Follow-up', icon: 'MessageSquare' },
    { id: 'onboarding', name: 'Client Onboarding', icon: 'UserCheck' },
    { id: 'marketing', name: 'Marketing', icon: 'Megaphone' }
  ];

  const workflowTemplates = [
    {
      id: 1,
      name: 'New Lead Welcome Series',
      description: 'Automated welcome sequence for new leads with personalized content and follow-up tasks',
      category: 'lead_nurturing',
      icon: 'UserPlus',
      complexity: 'Beginner',
      estimatedTime: '15 min',
      steps: 5,
      tags: ['Email', 'Tasks', 'Welcome'],
      preview: {
        trigger: 'New lead created',
        actions: ['Send welcome email', 'Create follow-up task', 'Add to nurture sequence']
      }
    },
    {
      id: 2,
      name: 'Property Inquiry Response',
      description: 'Instant response system for property inquiries with automated information delivery',
      category: 'follow_up',
      icon: 'Building',
      complexity: 'Intermediate',
      estimatedTime: '20 min',
      steps: 7,
      tags: ['Email', 'SMS', 'Property Info'],
      preview: {
        trigger: 'Property inquiry received',
        actions: ['Send property details', 'Schedule viewing', 'Notify agent']
      }
    },
    {
      id: 3,
      name: 'Client Onboarding Journey',
      description: 'Complete onboarding workflow for new clients with document collection and setup',
      category: 'onboarding',
      icon: 'UserCheck',
      complexity: 'Advanced',
      estimatedTime: '45 min',
      steps: 12,
      tags: ['Documents', 'Tasks', 'Compliance'],
      preview: {
        trigger: 'Client contract signed',
        actions: ['Send welcome package', 'Request documents', 'Setup client portal']
      }
    },
    {
      id: 4,
      name: 'Lead Scoring & Qualification',
      description: 'Automated lead scoring system with qualification criteria and routing',
      category: 'lead_nurturing',
      icon: 'TrendingUp',
      complexity: 'Advanced',
      estimatedTime: '30 min',
      steps: 8,
      tags: ['Scoring', 'Routing', 'Qualification'],
      preview: {
        trigger: 'Lead activity detected',
        actions: ['Calculate score', 'Update qualification', 'Route to agent']
      }
    },
    {
      id: 5,
      name: 'Market Update Campaign',
      description: 'Regular market updates and property recommendations for active clients',
      category: 'marketing',
      icon: 'TrendingUp',
      complexity: 'Intermediate',
      estimatedTime: '25 min',
      steps: 6,
      tags: ['Newsletter', 'Market Data', 'Recommendations'],
      preview: {
        trigger: 'Weekly schedule',
        actions: ['Generate market report', 'Send newsletter', 'Update client preferences']
      }
    },
    {
      id: 6,
      name: 'Abandoned Inquiry Follow-up',
      description: 'Re-engagement sequence for leads who started but didn\'t complete inquiries',
      category: 'follow_up',
      icon: 'RotateCcw',
      complexity: 'Beginner',
      estimatedTime: '10 min',
      steps: 4,
      tags: ['Re-engagement', 'Email', 'Reminders'],
      preview: {
        trigger: 'Inquiry abandoned',
        actions: ['Send reminder email', 'Offer assistance', 'Create follow-up task']
      }
    }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? workflowTemplates 
    : workflowTemplates.filter(template => template.category === selectedCategory);

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Beginner':
        return 'text-green-500 bg-green-500/10';
      case 'Intermediate':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'Advanced':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Workflow Templates</h2>
            <p className="text-muted-foreground">Choose from pre-built templates or start from scratch</p>
          </div>
          <Button
            variant="default"
            onClick={onCreateFromScratch}
            iconName="Plus"
            iconPosition="left"
          >
            Create from Scratch
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          {templateCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              <AppIcon name={category.icon} size={16} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
              onClick={() => onSelectTemplate(template)}
            >
              {/* Template Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <AppIcon name={template.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                      {template.name}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getComplexityColor(template.complexity)}`}>
                      {template.complexity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {template.description}
              </p>

              {/* Metadata */}
              <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <AppIcon name="Clock" size={12} />
                    <span>{template.estimatedTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <AppIcon name="Layers" size={12} />
                    <span>{template.steps} steps</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {template.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Preview */}
              <div className="border-t border-border pt-4">
                <div className="text-xs font-medium text-foreground mb-2">Quick Preview:</div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <AppIcon name="Zap" size={12} className="text-primary" />
                    <span className="text-muted-foreground">{template.preview.trigger}</span>
                  </div>
                  {template.preview.actions.slice(0, 2).map((action, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs">
                      <AppIcon name="ArrowRight" size={12} className="text-muted-foreground" />
                      <span className="text-muted-foreground">{action}</span>
                    </div>
                  ))}
                  {template.preview.actions.length > 2 && (
                    <div className="text-xs text-muted-foreground ml-4">
                      +{template.preview.actions.length - 2} more actions
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Play"
                  iconPosition="left"
                  fullWidth
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200"
                >
                  Use This Template
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <AppIcon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No templates found</h3>
            <p className="text-muted-foreground mb-4">
              No templates match the selected category. Try a different filter or create from scratch.
            </p>
            <Button
              variant="outline"
              onClick={() => setSelectedCategory('all')}
            >
              View All Templates
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowTemplates;
