
"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Mail,
  Edit,
  Users,
  Target,
  Download,
  CheckSquare,
  Archive,
  Trash2,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const iconMap: { [key: string]: React.ElementType } = {
  Mail,
  Edit,
  Users,
  Target,
  Download,
  CheckSquare,
  Archive,
  Trash2,
  Info,
  ChevronDown,
};

const BulkActionsDropdown = ({
  selectedCount,
  onAction,
}: {
  selectedCount: number;
  onAction: (action: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const bulkActions = [
    {
      label: 'Send Email Campaign',
      icon: 'Mail',
      action: 'email_campaign',
      description: 'Send targeted email to selected leads',
    },
    {
      label: 'Update Status',
      icon: 'Edit',
      action: 'update_status',
      description: 'Change status for all selected leads',
    },
    {
      label: 'Assign to Team Member',
      icon: 'Users',
      action: 'assign_team',
      description: 'Assign leads to a team member',
    },
    {
      label: 'Add to Campaign',
      icon: 'Target',
      action: 'add_campaign',
      description: 'Add leads to marketing campaign',
    },
    { type: 'divider' },
    {
      label: 'Export Selected',
      icon: 'Download',
      action: 'export',
      description: 'Export lead data to CSV/Excel',
    },
    {
      label: 'Create Task',
      icon: 'CheckSquare',
      action: 'create_task',
      description: 'Create follow-up tasks for leads',
    },
    { type: 'divider' },
    {
      label: 'Archive Leads',
      icon: 'Archive',
      action: 'archive',
      description: 'Move leads to archive',
      variant: 'warning' as const,
    },
    {
      label: 'Delete Leads',
      icon: 'Trash2',
      action: 'delete',
      description: 'Permanently delete selected leads',
      variant: 'destructive' as const,
    },
  ];

  const handleActionClick = (action: string) => {
    onAction(action);
    setIsOpen(false);
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="transition-all duration-200"
      >
        Bulk Actions ({selectedCount})
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-border">
            <h3 className="font-medium text-popover-foreground">
              Bulk Actions
            </h3>
            <p className="text-sm text-muted-foreground">
              {selectedCount} lead{selectedCount !== 1 ? 's' : ''} selected
            </p>
          </div>

          <div className="py-2 max-h-80 overflow-y-auto">
            {bulkActions.map((action, index) => {
              if (action.type === 'divider') {
                return (
                  <div key={index} className="my-2 border-t border-border" />
                );
              }
              const Icon = iconMap[action.icon as keyof typeof iconMap];

              const getTextColor = () => {
                if (action.variant === 'destructive')
                  return 'text-destructive hover:text-destructive';
                if (action.variant === 'warning')
                  return 'text-yellow-500 hover:text-yellow-500';
                return 'text-popover-foreground hover:text-primary';
              };

              return (
                <button
                  key={index}
                  onClick={() => handleActionClick(action.action)}
                  className={`w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-200 ${getTextColor()}`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon
                      size={16}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{action.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 border-t border-border bg-muted/50">
            <p className="text-xs text-muted-foreground flex items-start">
              <Info size={12} className="inline mr-1 mt-0.5 flex-shrink-0" />
              <span>Some actions cannot be undone. Please review your selection carefully.</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export { BulkActionsDropdown };
