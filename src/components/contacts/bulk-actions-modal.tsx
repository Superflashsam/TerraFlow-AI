
"use client";

import React from 'react';
import AppIcon from './app-icon';
import { Button } from '@/components/ui/button';

export const BulkActionsModal = ({ selectedCount, onAction, onClose }: { selectedCount: number, onAction: (action: string) => void, onClose: () => void }) => {
  const actions = [
    {
      id: 'email',
      label: 'Send Email Campaign',
      description: 'Send targeted email to selected contacts',
      icon: 'Mail',
      color: 'text-blue-600'
    },
    {
      id: 'tag',
      label: 'Add Tags',
      description: 'Assign tags to organize contacts',
      icon: 'Tag',
      color: 'text-green-600'
    },
    {
      id: 'status',
      label: 'Update Status',
      description: 'Change lead status for selected contacts',
      icon: 'Target',
      color: 'text-orange-600'
    },
    {
      id: 'export',
      label: 'Export Data',
      description: 'Download contact information as CSV',
      icon: 'Download',
      color: 'text-purple-600'
    },
    {
      id: 'delete',
      label: 'Delete Contacts',
      description: 'Permanently remove selected contacts',
      icon: 'Trash2',
      color: 'text-red-600'
    }
  ];

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e?.target === e?.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-lg border border-border shadow-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Bulk Actions</h2>
            <p className="text-sm text-muted-foreground">
              {selectedCount} contact{selectedCount !== 1 ? 's' : ''} selected
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <AppIcon name="X" size={20} />
          </button>
        </div>

        {/* Actions List */}
        <div className="p-6 space-y-2">
          {actions?.map((action) => (
            <button
              key={action?.id}
              onClick={() => onAction?.(action?.id)}
              className="w-full flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-muted transition-colors group"
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-muted group-hover:bg-card ${action?.color}`}>
                <AppIcon name={action?.icon} size={20} />
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">{action?.label}</div>
                <div className="text-sm text-muted-foreground">{action?.description}</div>
              </div>
              <AppIcon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
