
"use client";
import React, { useState } from 'react';
import { X, User, Clock, FileText, CheckSquare, Mail, Phone, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import { LucideIcon } from 'lucide-react';

const iconMap: { [key: string]: LucideIcon } = {
    User, Clock, FileText, CheckSquare, Mail, Phone, Building
};

export const LeadDetailsPanel = ({ lead, stages, onClose, onStageChange }: { lead: any, stages: any[], onClose: () => void, onStageChange: (leadId: number, stageId: string) => void }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!lead) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' as keyof typeof iconMap },
    { id: 'activity', label: 'Activity', icon: 'Clock' as keyof typeof iconMap },
    { id: 'notes', label: 'Notes', icon: 'FileText' as keyof typeof iconMap },
    { id: 'tasks', label: 'Tasks', icon: 'CheckSquare' as keyof typeof iconMap }
  ];

  const stageOptions = stages.map(stage => ({ value: stage.id, label: stage.name }));

  const mockActivities = [
    { id: 1, type: 'call', title: 'Discovery call completed', description: 'Discussed property requirements and budget constraints', timestamp: '2025-01-15T10:30:00', user: 'Priya Sharma' },
    { id: 2, type: 'email', title: 'Property portfolio sent', description: 'Shared curated list of 5 properties matching criteria', timestamp: '2025-01-14T16:20:00', user: 'Priya Sharma' },
    { id: 3, type: 'note', title: 'Budget confirmed', description: 'Client confirmed budget range of ₹3-4 Cr for villa purchase', timestamp: '2025-01-13T14:45:00', user: 'Priya Sharma' }
  ];

  const mockNotes = [
    { id: 1, content: 'Client is looking for a luxury villa with modern amenities. Prefers Goa location but open to other coastal areas.', timestamp: '2025-01-15T11:00:00', user: 'Priya Sharma' },
    { id: 2, content: 'Has existing property in Mumbai that needs to be sold first. Timeline flexible based on sale completion.', timestamp: '2025-01-14T15:30:00', user: 'Priya Sharma' }
  ];

  const mockTasks = [
    { id: 1, title: 'Schedule property site visit', description: 'Arrange visit to top 3 shortlisted properties', dueDate: '2025-01-18', priority: 'high', completed: false },
    { id: 2, title: 'Prepare financial pre-approval docs', description: 'Help client gather documents for loan pre-approval', dueDate: '2025-01-20', priority: 'medium', completed: false },
    { id: 3, title: 'Send property comparison sheet', description: 'Create detailed comparison of shortlisted properties', dueDate: '2025-01-16', priority: 'medium', completed: true }
  ];

  const getActivityIcon = (type: string) => {
    const iconMap: { [key: string]: LucideIcon } = { call: Phone, email: Mail, meeting: Users, note: FileText, task: CheckSquare };
    return iconMap[type] || Circle;
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleStageChange = (newStage: string) => {
    onStageChange(lead.id, newStage);
  };

  return (
    <div className="w-96 bg-card border-l border-border h-full flex flex-col">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Lead Details</h2>
        <Button variant="ghost" size="icon" onClick={onClose}><X size={20} /></Button>
      </div>

      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-4 mb-4">
          <Image src={lead.profileImage} alt={lead.alt} width={64} height={64} className="w-16 h-16 rounded-full object-cover" />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-foreground">{lead.name}</h3>
            <p className="text-sm text-muted-foreground">{lead.company}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(lead.priority)}`}>
                Score: {lead.leadScore}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(lead.priority)}`}>
                {lead.priority} Priority
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <label className="text-sm font-medium text-foreground">Pipeline Stage</label>
          <Select value={lead.stage} onValueChange={handleStageChange}>
              <SelectTrigger><SelectValue/></SelectTrigger>
              <SelectContent>
                {stageOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
              </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="text-xs text-muted-foreground">Deal Value</div>
            <div className="font-semibold text-foreground">{lead.dealValue}</div>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="text-xs text-muted-foreground">Time in Stage</div>
            <div className="font-semibold text-foreground">{lead.timeInStage}d</div>
          </div>
        </div>
      </div>

      <div className="border-b border-border">
        <nav className="flex">
          {tabs.map((tab) => {
              const TabIcon = iconMap[tab.icon];
              return (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                >
                    <TabIcon size={14} />
                    <span>{tab.label}</span>
                </button>
              )
          })}
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {activeTab === 'overview' && (
            <div className="space-y-6">
                <OverviewSection title="Contact Information">
                    <InfoItem icon={Mail} value={lead.email}/>
                    <InfoItem icon={Phone} value={lead.phone}/>
                    <InfoItem icon={Building} value={lead.company}/>
                </OverviewSection>
                <OverviewSection title="Property Requirements">
                    <InfoItem label="Interest" value={lead.propertyInterest}/>
                    <InfoItem label="Budget" value={lead.budget}/>
                    <InfoItem label="Timeline" value={lead.timeline}/>
                </OverviewSection>
                 <OverviewSection title="Lead Information">
                    <InfoItem label="Source" value={lead.source}/>
                    <InfoItem label="Assignee" value={lead.assignee}/>
                    <InfoItem label="Created" value={new Date(lead.createdDate).toLocaleDateString('en-IN')}/>
                </OverviewSection>
            </div>
        )}
        {activeTab === 'activity' && (
            <div>
                 {mockActivities.map((activity) => {
                    const ActivityIcon = getActivityIcon(activity.type);
                    return (
                        <div key={activity.id} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full flex-shrink-0">
                                <ActivityIcon size={14} />
                            </div>
                            <div className="flex-1">
                                <h5 className="text-sm font-medium text-foreground">{activity.title}</h5>
                                <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>{activity.user}</span>
                                    <span>{new Date(activity.timestamp).toLocaleDateString('en-IN', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            </div>
                        </div>
                    )
                 })}
            </div>
        )}
        {activeTab === 'notes' && (
            <div>
                 {mockNotes.map((note) => (
                    <div key={note.id} className="p-3 bg-muted/50 rounded-lg mb-4">
                    <p className="text-sm text-foreground mb-2">{note.content}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{note.user}</span>
                      <span>{new Date(note.timestamp).toLocaleDateString('en-IN', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                 ))}
            </div>
        )}
        {activeTab === 'tasks' && (
            <div>
                {mockTasks.map((task) => (
                    <div key={task.id} className={`p-3 rounded-lg border mb-4 ${task.completed ? 'bg-green-50 border-green-200' : 'bg-muted/50 border-border'}`}>
                        <div className="flex items-start space-x-3">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                                {task.completed && <CheckSquare size={12} className="text-white" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h5 className={`text-sm font-medium ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                                    {task.title}
                                    </h5>
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                    <Calendar size={12} />
                                    <span>Due: {new Date(task.dueDate).toLocaleDateString('en-IN')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>

      <div className="p-6 border-t border-border">
        <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm"><Phone className="mr-2"/>Call</Button>
            <Button variant="outline" size="sm"><Mail className="mr-2"/>Email</Button>
            <Button variant="outline" size="sm"><Calendar className="mr-2"/>Schedule</Button>
        </div>
      </div>
    </div>
  );
};


const OverviewSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="space-y-4">
        <h4 className="font-medium text-foreground">{title}</h4>
        <div className="space-y-3">{children}</div>
    </div>
)

const InfoItem = ({ icon: Icon, value, label }: { icon?: LucideIcon, value: string, label?: string }) => (
    <div className="flex items-center justify-between text-sm">
        {Icon ? (
            <div className="flex items-center space-x-3">
                <Icon size={16} className="text-muted-foreground"/>
                <span className="text-foreground">{value}</span>
            </div>
        ) : (
            <>
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium text-foreground">{value}</span>
            </>
        )}
    </div>
)
