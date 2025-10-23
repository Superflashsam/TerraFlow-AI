"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Mail,
  Calendar,
  Eye,
  Edit,
  Users,
  FileText,
  Archive,
  Trash2,
} from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  Phone,
  Mail,
  Calendar,
  Eye,
  Edit,
  Users,
  FileText,
  Archive,
  Trash2,
};

const LeadContextMenu = ({
  lead,
  position,
  onClose,
  onAction,
}: {
  lead: any;
  position: { x: number; y: number } | null;
  onClose: () => void;
  onAction: (action: string, lead: any) => void;
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState(position);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (menuRef.current && position) {
      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let adjustedX = position.x;
      let adjustedY = position.y;

      if (position.x + rect.width > viewportWidth) {
        adjustedX = position.x - rect.width;
      }

      if (position.y + rect.height > viewportHeight) {
        adjustedY = position.y - rect.height;
      }

      setMenuPosition({ x: adjustedX, y: adjustedY });
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose, position]);

  const menuItems = [
    {
      label: 'Call Lead',
      icon: 'Phone',
      action: 'call',
      color: 'text-foreground hover:text-primary',
    },
    {
      label: 'Send Email',
      icon: 'Mail',
      action: 'email',
      color: 'text-foreground hover:text-primary',
    },
    {
      label: 'Schedule Meeting',
      icon: 'Calendar',
      action: 'schedule',
      color: 'text-foreground hover:text-primary',
    },
    {
      label: 'View Details',
      icon: 'Eye',
      action: 'view',
      color: 'text-foreground hover:text-primary',
    },
    { type: 'divider' },
    {
      label: 'Update Status',
      icon: 'Edit',
      action: 'update_status',
      color: 'text-foreground hover:text-accent-foreground',
    },
    {
      label: 'Assign to Team',
      icon: 'Users',
      action: 'assign',
      color: 'text-foreground hover:text-accent-foreground',
    },
    {
      label: 'Add Note',
      icon: 'FileText',
      action: 'add_note',
      color: 'text-foreground hover:text-accent-foreground',
    },
    { type: 'divider' },
    {
      label: 'Archive Lead',
      icon: 'Archive',
      action: 'archive',
      color: 'text-foreground hover:text-yellow-500',
    },
    {
      label: 'Delete Lead',
      icon: 'Trash2',
      action: 'delete',
      color: 'text-destructive hover:text-destructive',
    },
  ];

  const handleItemClick = (action: string) => {
    onAction(action, lead);
    onClose();
  };

  if (!position || !menuPosition) return null;

  return (
    <div
      ref={menuRef}
      className="fixed bg-popover border border-border rounded-lg shadow-lg py-2 min-w-48 z-50"
      style={{
        left: menuPosition.x,
        top: menuPosition.y,
      }}
    >
      <div className="px-4 py-2 border-b border-border">
        <p className="font-medium text-sm text-popover-foreground truncate">
          {lead.name}
        </p>
        <p className="text-xs text-muted-foreground truncate">{lead.email}</p>
      </div>

      <div className="py-1">
        {menuItems.map((item, index) => {
          if (item.type === 'divider') {
            return (
              <div key={index} className="my-1 border-t border-border" />
            );
          }
          const Icon = iconMap[item.icon];
          return (
            <button
              key={index}
              onClick={() => handleItemClick(item.action)}
              className={`w-full px-4 py-2 text-left text-sm flex items-center space-x-3 hover:bg-muted transition-colors duration-200 ${item.color}`}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { LeadContextMenu };