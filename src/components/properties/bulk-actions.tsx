"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown, Mail, Edit, Users, Target, Download, CheckSquare, Archive, Trash2, Info, X, Eye, Copy, ToggleLeft, MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const BulkActions = ({ selectedCount, onClearSelection }: { selectedCount: number, onClearSelection: () => void }) => {
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const actions = [
    {
      id: 'status',
      label: 'Change Status',
      icon: ToggleLeft,
      submenu: [
        { label: 'Mark as Active', action: 'activate' },
        { label: 'Mark as Under Contract', action: 'pending' },
        { label: 'Mark as Sold', action: 'sold' },
        { label: 'Mark as Draft', action: 'draft' }
      ]
    },
    {
      id: 'assign',
      label: 'Assign Agent',
      icon: Users,
      action: 'assign-agent'
    },
    {
      id: 'export',
      label: 'Export Selected',
      icon: Download,
      action: 'export'
    },
    {
      id: 'duplicate',
      label: 'Duplicate Properties',
      icon: Copy,
      action: 'duplicate'
    },
    {
      id: 'delete',
      label: 'Delete Selected',
      icon: Trash2,
      action: 'delete',
      danger: true
    }
  ];

  const handleAction = (action: string) => {
    console.log('Bulk action:', action, 'for', selectedCount, 'properties');
    setShowMenu(false);
  };

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-primary">
            <CheckSquare size={20} />
            <span className="font-medium">
              {selectedCount} {selectedCount === 1 ? 'property' : 'properties'} selected
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAction('activate')}
            className="text-green-600 border-green-600 hover:bg-green-600/10"
          >
            <Eye size={14} className="mr-1" />
            Activate
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAction('export')}
          >
            <Download size={14} className="mr-1" />
            Export
          </Button>

          <div className="relative" ref={dropdownRef}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreHorizontal size={14} className="mr-1" />
              More
              <ChevronDown size={14} className="ml-1" />
            </Button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-10">
                <div className="py-2">
                  {actions?.map((action) => (
                    <div key={action.id}>
                      {action.submenu ? (
                        <div className="px-4 py-2 text-sm font-medium text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <action.icon size={14} />
                            <span>{action.label}</span>
                          </div>
                          <div className="ml-6 mt-1 space-y-1">
                            {action.submenu.map((subItem) => (
                              <button
                                key={subItem.action}
                                onClick={() => handleAction(subItem.action)}
                                className="block w-full text-left text-sm text-foreground hover:bg-muted px-2 py-1 rounded"
                              >
                                {subItem.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAction(action.action)}
                          className={`flex items-center space-x-2 w-full px-4 py-2 text-sm hover:bg-muted ${
                            action.danger ? 'text-destructive' : 'text-foreground'
                          }`}
                        >
                          <action.icon size={14} />
                          <span>{action.label}</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onClearSelection}
            className="text-muted-foreground"
          >
            <X size={14} className="mr-1" />
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};
