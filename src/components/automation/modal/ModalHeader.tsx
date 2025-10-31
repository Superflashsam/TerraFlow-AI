import React from 'react';
import AppIcon from '@/components/contacts/app-icon';
import { Button } from '@/components/ui/button';

const ModalHeader = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex items-center justify-between p-8 border-b border-border bg-gradient-to-r from-card to-muted/20">
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl shadow-lg">
          <AppIcon name="Zap" size={24} color="white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-1">
            Choose Your Creation Method
          </h2>
          <p className="text-muted-foreground text-lg">
            Select how you'd like to build your workflow automation
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        iconName="X"
        iconSize={24}
        onClick={onClose}
        className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
      />
    </div>
  );
};

export { ModalHeader };
