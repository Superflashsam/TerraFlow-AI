import React from 'react';
import AppIcon from '@/components/contacts/app-icon';
import { Button } from '@/components/ui/button';

const ModalFooter = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex items-center justify-between p-8 border-t border-border bg-gradient-to-r from-muted/20 to-card">
      <div className="flex items-center space-x-3 text-muted-foreground">
        <AppIcon name="Info" size={18} />
        <span className="text-sm font-medium">
          You can switch between methods anytime during workflow creation
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          onClick={onClose}
          iconName="ArrowLeft"
          iconPosition="left"
          className="text-muted-foreground hover:text-foreground"
        >
          Go Back
        </Button>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <AppIcon name="Keyboard" size={16} />
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};

export { ModalFooter };
