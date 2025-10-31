import React from 'react';
import { Button } from '@/components/ui/button';
import AppIcon from '@/components/contacts/app-icon';

const BulkActionsToolbar = ({ 
  selectedCount, 
  onSelectAll, 
  onDeselectAll, 
  onBulkActivate, 
  onBulkPause, 
  onBulkDuplicate, 
  onBulkDelete,
  totalCount 
}: {
    selectedCount: number;
    onSelectAll: () => void;
    onDeselectAll: () => void;
    onBulkActivate: () => void;
    onBulkPause: () => void;
    onBulkDuplicate: () => void;
    onBulkDelete: () => void;
    totalCount: number;
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg mb-6">
      {/* Selection Info */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <AppIcon name="CheckSquare" size={20} className="text-primary" />
          <span className="text-sm font-medium text-foreground">
            {selectedCount} workflow{selectedCount !== 1 ? 's' : ''} selected
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSelectAll}
            className="text-primary hover:text-primary"
          >
            Select All ({totalCount})
          </Button>
          <span className="text-muted-foreground">•</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDeselectAll}
            className="text-muted-foreground hover:text-foreground"
          >
            Deselect All
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Play"
          iconPosition="left"
          iconSize={16}
          onClick={onBulkActivate}
          className="text-green-500 hover:text-green-500 border-green-500/20 hover:border-green-500"
        >
          Activate
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Pause"
          iconPosition="left"
          iconSize={16}
          onClick={onBulkPause}
          className="text-yellow-500 hover:text-yellow-500 border-yellow-500/20 hover:border-yellow-500"
        >
          Pause
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Copy"
          iconPosition="left"
          iconSize={16}
          onClick={onBulkDuplicate}
        >
          Duplicate
        </Button>
        
        <div className="w-px h-6 bg-border mx-2" />
        
        <Button
          variant="outline"
          size="sm"
          iconName="Trash2"
          iconPosition="left"
          iconSize={16}
          onClick={onBulkDelete}
          className="text-destructive hover:text-destructive border-destructive/20 hover:border-destructive"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export { BulkActionsToolbar };
