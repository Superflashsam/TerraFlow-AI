import React from 'react';
import { Button } from '@/components/ui/button';

const CreateWorkflowButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="relative">
      <Button
        variant="default"
        size="lg"
        iconName="Plus"
        iconPosition="left"
        iconSize={20}
        onClick={onClick}
        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-200"
      >
        Create New Workflow
      </Button>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-md blur-lg opacity-20 -z-10 scale-110" />
    </div>
  );
};

export { CreateWorkflowButton };
