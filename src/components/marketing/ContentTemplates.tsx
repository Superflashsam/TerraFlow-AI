"use client";

import React, { useState } from 'react';
import AppIcon from '@/components/contacts/app-icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const ContentTemplates = ({ selectedTemplate, onTemplateSelect }: { selectedTemplate: any, onTemplateSelect: (template: any) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templateCategories = [
    { id: 'all', name: 'All Templates', icon: 'Grid' },
    { id: 'marketing', name: 'Marketing Materials', icon: 'Megaphone' },
    { id: 'email', name: 'Email Campaigns', icon: 'Mail' },
    { id: 'legal', name: 'Legal Documents', icon: 'FileText' },
    { id: 'property', name: 'Property Descriptions', icon: 'Building' }
  ];

  const templates = [
    {
      id: 'property-listing',
      name: 'Property Listing',
      category: 'marketing',
      icon: 'Home',
      description: 'Compelling property descriptions for listings',
      tags: ['marketing', 'listing', 'description'],
      isRERACompliant: false
    },
    {
      id: 'welcome-email',
      name: 'Welcome Email',
      category: 'email',
      icon: 'UserCheck',
      description: 'Welcome new clients with personalized messages',
      tags: ['email', 'welcome', 'onboarding'],
      isRERACompliant: false
    },
    {
      id: 'sale-agreement',
      name: 'Sale Agreement',
      category: 'legal',
      icon: 'FileCheck',
      description: 'RERA-compliant property sale agreements',
      tags: ['legal', 'contract', 'sale'],
      isRERACompliant: true
    },
    {
      id: 'social-media-post',
      name: 'Social Media Post',
      category: 'marketing',
      icon: 'Share2',
      description: 'Engaging social media content for properties',
      tags: ['marketing', 'social', 'engagement'],
      isRERACompliant: false
    },
    {
      id: 'follow-up-email',
      name: 'Follow-up Email',
      category: 'email',
      icon: 'Clock',
      description: 'Professional follow-up sequences',
      tags: ['email', 'follow-up', 'nurture'],
      isRERACompliant: false
    },
    {
      id: 'rental-agreement',
      name: 'Rental Agreement',
      category: 'legal',
      icon: 'Key',
      description: 'Comprehensive rental agreements',
      tags: ['legal', 'rental', 'lease'],
      isRERACompliant: true
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Content Templates</h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <AppIcon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <Input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Categories */}
        <div className="space-y-1">
          {templateCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <AppIcon name={category.icon} size={16} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Templates List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => onTemplateSelect(template)}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:border-primary ${
                selectedTemplate?.id === template.id
                  ? 'border-primary bg-primary/5' :'border-border bg-card hover:bg-muted/50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  selectedTemplate?.id === template.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <AppIcon name={template.icon} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-foreground text-sm">{template.name}</h3>
                    {template.isRERACompliant && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                        <AppIcon name="Shield" size={12} className="mr-1" />
                        RERA
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{template.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-8">
            <AppIcon name="Search" size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No templates found matching your search</p>
          </div>
        )}
      </div>

      {/* Create Custom Template */}
      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
        >
          <AppIcon name="Plus" className="mr-2 h-4 w-4"/>
          Create Custom Template
        </Button>
      </div>
    </div>
  );
};
