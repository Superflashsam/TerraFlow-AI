
"use client";

import React, { useState } from 'react';
import AppIcon from './app-icon';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { LucideIcon, Users, CheckSquare } from 'lucide-react';

export const ContactDetailsPanel = ({ contact, onClose }: { contact: any, onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState('profile');

  if (!contact) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'interactions', label: 'History', icon: 'Clock' },
    { id: 'properties', label: 'Properties', icon: 'Home' },
    { id: 'documents', label: 'Documents', icon: 'FileText' }
  ];

  const mockInteractions = [
    {
      id: 1,
      type: 'call',
      title: 'Phone call regarding 3BHK property',
      date: '2025-01-15T10:30:00',
      duration: '15 mins',
      notes: 'Discussed property specifications and pricing. Client very interested.'
    },
    {
      id: 2,
      type: 'email',
      title: 'Property brochure sent',
      date: '2025-01-12T14:20:00',
      notes: 'Sent detailed brochure for Andheri West properties.'
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Site visit scheduled',
      date: '2025-01-10T11:00:00',
      duration: '2 hours',
      notes: 'Showed 3 properties in Bandra area. Client preferred the second one.'
    }
  ];

  const mockDocuments = [
    { id: 1, name: 'Property Agreement Draft.pdf', type: 'PDF', size: '2.4 MB', date: '2025-01-14' },
    { id: 2, name: 'ID Verification.jpg', type: 'Image', size: '1.2 MB', date: '2025-01-12' },
    { id: 3, name: 'Financial Documents.zip', type: 'Archive', size: '5.6 MB', date: '2025-01-10' }
  ];

  const getInteractionIcon = (type: string) => {
    const iconMap: { [key: string]: string } = {
      call: 'Phone',
      email: 'Mail',
      meeting: 'Users',
      note: 'FileText'
    };
    return iconMap?.[type] || 'Circle';
  };

  return (
    <div className="w-96 bg-card border-l border-border h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Contact Details</h2>
        <button 
          onClick={onClose}
          className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <AppIcon name="X" size={20} />
        </button>
      </div>

      {/* Contact Summary */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <Image 
              src={contact?.profileImage} 
              alt={contact?.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              contact?.status === 'hot_lead' ? 'bg-red-500' :
              contact?.status === 'warm_lead' ? 'bg-orange-500' :
              contact?.status === 'client' ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-foreground">{contact?.name}</h3>
            <p className="text-sm text-muted-foreground">{contact?.company}</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-12 h-2 bg-gray-200 rounded-full">
                <div 
                  className={`h-full rounded-full ${
                    contact?.relationshipStrength >= 80 ? 'bg-green-500' :
                    contact?.relationshipStrength >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${contact?.relationshipStrength}%` }}
                ></div>
              </div>
              <span className="text-xs text-muted-foreground">{contact?.relationshipStrength}%</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="sm" className="flex items-center justify-center space-x-1">
            <AppIcon name="Phone" size={14} />
            <span>Call</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center justify-center space-x-1">
            <AppIcon name="Mail" size={14} />
            <span>Email</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center justify-center space-x-1">
            <AppIcon name="Calendar" size={14} />
            <span>Schedule</span>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <AppIcon name={tab?.icon} size={14} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'profile' && (
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Contact Information</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <AppIcon name="Mail" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{contact?.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <AppIcon name="Phone" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{contact?.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <AppIcon name="Building" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{contact?.company}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Deal Information</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Deal Value:</span>
                  <span className="text-sm font-medium text-foreground">{contact?.dealValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Category:</span>
                  <span className="text-sm text-foreground capitalize">{contact?.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <span className="text-sm text-foreground capitalize">{contact?.status?.replace('_', ' ')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {contact?.tags?.map((tag: string) => (
                  <span 
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'interactions' && (
          <div className="p-6 space-y-4">
            <h4 className="font-medium text-foreground">Interaction Timeline</h4>
            <div className="space-y-4">
              {mockInteractions?.map((interaction) => (
                <div key={interaction?.id} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full flex-shrink-0">
                    <AppIcon name={getInteractionIcon(interaction?.type)} size={14} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="text-sm font-medium text-foreground">{interaction?.title}</h5>
                      {interaction?.duration && (
                        <span className="text-xs text-muted-foreground">{interaction?.duration}</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {new Date(interaction?.date)?.toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    <p className="text-sm text-foreground">{interaction?.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="p-6 space-y-4">
            <h4 className="font-medium text-foreground">Associated Properties</h4>
            <div className="space-y-3">
              {contact?.properties?.map((property: string, index: number) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AppIcon name="Home" size={16} className="text-primary" />
                      <span className="text-sm font-medium text-foreground">{property}</span>
                    </div>
                    <button className="text-xs text-primary hover:underline">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Documents</h4>
              <Button variant="outline" size="sm" className="flex items-center space-x-1">
                <AppIcon name="Plus" size={14} />
                <span>Add</span>
              </Button>
            </div>
            <div className="space-y-3">
              {mockDocuments?.map((document) => (
                <div key={document?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
                      <AppIcon name="FileText" size={16} className="text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{document?.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {document?.size} • {new Date(document?.date)?.toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </div>
                  <button className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <AppIcon name="Download" size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
