
"use client";

import React from 'react';
import AppIcon from './app-icon';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

export const ContactsTable = ({ 
  contacts, 
  selectedContacts, 
  sortConfig, 
  onContactSelect, 
  onSelectAll,
  onContactClick, 
  onSortChange 
}: { 
  contacts: any[], 
  selectedContacts: string[], 
  sortConfig: any, 
  onContactSelect: (id: string) => void, 
  onSelectAll: (checked: boolean) => void,
  onContactClick: (contact: any) => void, 
  onSortChange: (key: string) => void 
}) => {
  const getStatusBadge = (status: string) => {
    const statusConfig: {[key: string]: { bg: string, text: string, label: string }} = {
      hot_lead: { bg: 'bg-red-100', text: 'text-red-800', label: 'Hot Lead' },
      warm_lead: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Warm Lead' },
      cold_lead: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Cold Lead' },
      client: { bg: 'bg-green-100', text: 'text-green-800', label: 'Active Client' },
      inactive: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Inactive' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.inactive;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
        {config?.label}
      </span>
    );
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: {[key: string]: string} = {
      buyer: 'Home',
      seller: 'Tag',
      investor: 'TrendingUp',
      tenant: 'Key',
      landlord: 'Building'
    };
    return iconMap?.[category] || 'User';
  };

  const getRelationshipStrengthColor = (strength: number) => {
    if (strength >= 80) return 'bg-green-500';
    if (strength >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleSort = (key: string) => {
    onSortChange?.(key);
  };

  const getSortIcon = (key: string) => {
    if (sortConfig?.key !== key) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const isAllSelected = contacts.length > 0 && selectedContacts.length === contacts.length;

  return (
    <div className="flex-1 overflow-hidden">
      <div className="overflow-auto h-full">
        <table className="w-full border-collapse">
          <thead className="bg-muted/50 sticky top-0 z-10">
            <tr>
              <th className="w-12 p-4">
                <Checkbox 
                  checked={isAllSelected}
                  onCheckedChange={(checked) => onSelectAll(!!checked)}
                />
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button 
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <span>Contact</span>
                  <AppIcon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button 
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                  onClick={() => handleSort('category')}
                >
                  <span>Category</span>
                  <AppIcon name={getSortIcon('category')} size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button 
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                  onClick={() => handleSort('status')}
                >
                  <span>Status</span>
                  <AppIcon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button 
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                  onClick={() => handleSort('lastInteraction')}
                >
                  <span>Last Interaction</span>
                  <AppIcon name={getSortIcon('lastInteraction')} size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                Relationship
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button 
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                  onClick={() => handleSort('dealValue')}
                >
                  <span>Deal Value</span>
                  <AppIcon name={getSortIcon('dealValue')} size={14} />
                </button>
              </th>
              <th className="text-center p-4 font-medium text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts?.map((contact) => (
              <tr 
                key={contact?.id}
                className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => onContactClick?.(contact)}
              >
                <td className="p-4">
                  <Checkbox
                    checked={selectedContacts?.includes(contact?.id)}
                    onCheckedChange={() => onContactSelect?.(contact?.id)}
                    onClick={(e) => e?.stopPropagation()}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Image 
                        src={contact?.profileImage} 
                        alt={contact?.alt}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        contact?.status === 'hot_lead' ? 'bg-red-500' :
                        contact?.status === 'warm_lead' ? 'bg-orange-500' :
                        contact?.status === 'client' ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{contact?.name}</div>
                      <div className="text-sm text-muted-foreground">{contact?.email}</div>
                      <div className="text-sm text-muted-foreground">{contact?.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <AppIcon name={getCategoryIcon(contact?.category)} size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground capitalize">{contact?.category}</span>
                  </div>
                </td>
                <td className="p-4">
                  {getStatusBadge(contact?.status)}
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">
                    {new Date(contact?.lastInteraction)?.toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {contact?.interactionCount} interactions
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div 
                        className={`h-full rounded-full ${getRelationshipStrengthColor(contact?.relationshipStrength)}`}
                        style={{ width: `${contact?.relationshipStrength}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground">{contact?.relationshipStrength}%</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-foreground">{contact?.dealValue}</div>
                  <div className="text-xs text-muted-foreground">
                    {contact?.properties?.length} properties
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center space-x-1">
                    <button 
                      className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      title="Call"
                      onClick={(e) => e?.stopPropagation()}
                    >
                      <AppIcon name="Phone" size={16} />
                    </button>
                    <button 
                      className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      title="Email"
                      onClick={(e) => e?.stopPropagation()}
                    >
                      <AppIcon name="Mail" size={16} />
                    </button>
                    <button 
                      className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      title="Schedule"
                      onClick={(e) => e?.stopPropagation()}
                    >
                      <AppIcon name="Calendar" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {contacts?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <AppIcon name="Users" size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No contacts found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Try adjusting your search criteria or filters to find the contacts you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
