import React from 'react';
import AppIcon from '@/components/contacts/app-icon';
import { Button } from '@/components/ui/button';

const EmptyState = ({ onCreateWorkflow, hasFilters, onClearFilters }: { onCreateWorkflow: () => void, hasFilters: boolean, onClearFilters: () => void }) => {
  if (hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <AppIcon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No workflows found
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          No workflows match your current filters. Try adjusting your search criteria or clearing filters.
        </p>
        <Button
          variant="outline"
          iconName="X"
          iconPosition="left"
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-6">
        <AppIcon name="Workflow" size={40} className="text-primary" />
      </div>
      <h3 className="text-2xl font-semibold text-foreground mb-2">
        Welcome to SmartFlow Studio
      </h3>
      <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
        Start building powerful automation workflows with our visual canvas builder or conversational AI assistant. Create your first workflow to get started.
      </p>
      <div className="space-y-4">
        <Button
          variant="default"
          size="lg"
          iconName="Plus"
          iconPosition="left"
          onClick={onCreateWorkflow}
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold px-8 py-3"
        >
          Create Your First Workflow
        </Button>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <AppIcon name="Zap" size={16} />
            <span>Visual Builder</span>
          </div>
          <div className="w-1 h-1 bg-muted-foreground rounded-full" />
          <div className="flex items-center space-x-1">
            <AppIcon name="MessageSquare" size={16} />
            <span>AI Assistant</span>
          </div>
          <div className="w-1 h-1 bg-muted-foreground rounded-full" />
          <div className="flex items-center space-x-1">
            <AppIcon name="FileText" size={16} />
            <span>Templates</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EmptyState };
