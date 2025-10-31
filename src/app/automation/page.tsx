"use client";
import React, { useState, useEffect } from 'react';
import { PageHeader } from "@/components/shared/page-header";
import { CreateWorkflowButton } from '@/components/automation/dashboard/CreateWorkflowButton';
import { WorkflowStats } from '@/components/automation/dashboard/WorkflowStats';
import { WorkflowFilters } from '@/components/automation/dashboard/WorkflowFilters';
import { BulkActionsToolbar } from '@/components/automation/dashboard/BulkActionsToolbar';
import { WorkflowCard } from '@/components/automation/dashboard/WorkflowCard';
import { EmptyState } from '@/components/automation/dashboard/EmptyState';
import { WorkflowCreationMethodSelectionModal } from '@/components/automation/modal/WorkflowCreationMethodSelectionModal';
import VisualCanvasBuilder from './visual-canvas/page';
import WorkflowTemplates from '@/components/automation/WorkflowTemplates';

const MyWorkflowsDashboard = () => {
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'canvas', 'templates'
  const [selectedWorkflows, setSelectedWorkflows] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('lastModified');
  const [viewMode, setViewMode] = useState('grid');

  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: "Customer Onboarding Automation",
      description: "Automated workflow for new customer registration, email verification, and welcome sequence with personalized content delivery.",
      status: "active",
      lastModified: "2025-01-20T10:30:00Z",
      executions: 1247,
      tags: ["customer", "onboarding", "email"],
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Lead Qualification Pipeline",
      description: "Multi-step workflow that scores leads, assigns to sales reps, and triggers follow-up sequences based on engagement levels.",
      status: "active",
      lastModified: "2025-01-19T15:45:00Z",
      executions: 892,
      tags: ["sales", "leads", "crm"],
      thumbnail: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Invoice Processing System",
      description: "Automated invoice generation, approval workflow, and payment tracking with integration to accounting systems.",
      status: "paused",
      lastModified: "2025-01-18T09:15:00Z",
      executions: 2156,
      tags: ["finance", "invoicing", "accounting"],
      thumbnail: "https://images.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg?w=400&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Social Media Content Scheduler",
      description: "Cross-platform content publishing workflow with approval gates, scheduling optimization, and performance tracking.",
      status: "active",
      lastModified: "2025-01-17T14:20:00Z",
      executions: 634,
      tags: ["marketing", "social media", "content"],
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop"
    },
    {
      id: 5,
      name: "Employee Expense Approval",
      description: "Streamlined expense report submission, manager approval, and reimbursement processing with receipt validation.",
      status: "draft",
      lastModified: "2025-01-16T11:30:00Z",
      executions: 0,
      tags: ["hr", "expenses", "approval"],
      thumbnail: null
    },
    {
      id: 6,
      name: "Inventory Restocking Alert",
      description: "Automated monitoring of inventory levels with supplier notifications and purchase order generation when stock runs low.",
      status: "active",
      lastModified: "2025-01-15T16:45:00Z",
      executions: 423,
      tags: ["inventory", "supply chain", "alerts"],
      thumbnail: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?w=400&h=200&fit=crop"
    },
    {
      id: 7,
      name: "Customer Support Ticket Routing",
      description: "Intelligent ticket classification and routing system with priority assignment and escalation workflows.",
      status: "paused",
      lastModified: "2025-01-14T13:10:00Z",
      executions: 1789,
      tags: ["support", "tickets", "routing"],
      thumbnail: "https://images.pixabay.com/photo/2020/07/08/04/12/work-5382501_1280.jpg?w=400&h=200&fit=crop"
    },
    {
      id: 8,
      name: "Marketing Campaign Analytics",
      description: "Comprehensive campaign performance tracking with automated reporting and ROI calculations across multiple channels.",
      status: "active",
      lastModified: "2025-01-13T08:25:00Z",
      executions: 567,
      tags: ["marketing", "analytics", "reporting"],
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop"
    }
  ]);

  const filteredWorkflows = workflows
    .filter(workflow => {
      const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           workflow.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           workflow.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || workflow.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'executions':
          return b.executions - a.executions;
        case 'created':
          return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
        case 'lastModified':
        default:
          return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      }
    });

  const handleCreateWorkflow = () => {
    setIsCreationModalOpen(true);
  };

  const handleSelectWorkflow = (workflowId: string) => {
    setSelectedWorkflows(prev => 
      prev.includes(workflowId)
        ? prev.filter(id => id !== workflowId)
        : [...prev, workflowId]
    );
  };

  const handleSelectAll = () => {
    setSelectedWorkflows(filteredWorkflows.map(w => w.id.toString()));
  };

  const handleDeselectAll = () => {
    setSelectedWorkflows([]);
  };

  const handleEditWorkflow = (workflow: any) => {
    setCurrentView('canvas');
  };

  const handleDuplicateWorkflow = (workflow: any) => {
    const duplicatedWorkflow = {
      ...workflow,
      id: Date.now(),
      name: `${workflow.name} (Copy)`,
      status: 'draft',
      executions: 0,
      lastModified: new Date().toISOString()
    };
    setWorkflows(prev => [duplicatedWorkflow, ...prev]);
  };

  const handleDeleteWorkflow = (workflow: any) => {
    if (window.confirm(`Are you sure you want to delete "${workflow.name}"?`)) {
      setWorkflows(prev => prev.filter(w => w.id !== workflow.id));
      setSelectedWorkflows(prev => prev.filter(id => id !== workflow.id.toString()));
    }
  };

  const handleToggleStatus = (workflow: any) => {
    const newStatus = workflow.status === 'active' ? 'paused' : 'active';
    setWorkflows(prev => prev.map(w => 
      w.id === workflow.id 
        ? { ...w, status: newStatus, lastModified: new Date().toISOString() }
        : w
    ));
  };

  const handleViewAnalytics = (workflow: any) => {
    console.log('View analytics for:', workflow.name);
  };

  const handleBulkActivate = () => {
    setWorkflows(prev => prev.map(w => 
      selectedWorkflows.includes(w.id.toString())
        ? { ...w, status: 'active', lastModified: new Date().toISOString() }
        : w
    ));
    setSelectedWorkflows([]);
  };

  const handleBulkPause = () => {
    setWorkflows(prev => prev.map(w => 
      selectedWorkflows.includes(w.id.toString())
        ? { ...w, status: 'paused', lastModified: new Date().toISOString() }
        : w
    ));
    setSelectedWorkflows([]);
  };

  const handleBulkDuplicate = () => {
    const selectedWorkflowData = workflows.filter(w => selectedWorkflows.includes(w.id.toString()));
    const duplicatedWorkflows = selectedWorkflowData.map(workflow => ({
      ...workflow,
      id: Date.now() + Math.random(),
      name: `${workflow.name} (Copy)`,
      status: 'draft',
      executions: 0,
      lastModified: new Date().toISOString()
    }));
    setWorkflows(prev => [...duplicatedWorkflows, ...prev]);
    setSelectedWorkflows([]);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedWorkflows.length} workflow(s)?`)) {
      setWorkflows(prev => prev.filter(w => !selectedWorkflows.includes(w.id.toString())));
      setSelectedWorkflows([]);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
  };
  
  const handleSelectTemplate = (template: any) => {
    console.log('Selected template:', template);
    setCurrentView('canvas');
  }

  const hasFilters = searchQuery || statusFilter !== 'all';
  const showEmptyState = filteredWorkflows.length === 0;

  if (currentView === 'canvas') {
    return <VisualCanvasBuilder onBack={() => setCurrentView('dashboard')} />;
  }
  
  if (currentView === 'templates') {
    return <WorkflowTemplates onSelectTemplate={handleSelectTemplate} onCreateFromScratch={() => setCurrentView('canvas')} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-8">
        <PageHeader
            title="My Workflows"
            description="Manage and monitor your automation workflows"
        >
            <CreateWorkflowButton onClick={handleCreateWorkflow} />
        </PageHeader>
        <div className="mt-8">
            {!showEmptyState && (
                <>
                <WorkflowStats workflows={workflows} />
                <WorkflowFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    statusFilter={statusFilter}
                    onStatusFilterChange={setStatusFilter}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                />
                <BulkActionsToolbar
                    selectedCount={selectedWorkflows.length}
                    totalCount={filteredWorkflows.length}
                    onSelectAll={handleSelectAll}
                    onDeselectAll={handleDeselectAll}
                    onBulkActivate={handleBulkActivate}
                    onBulkPause={handleBulkPause}
                    onBulkDuplicate={handleBulkDuplicate}
                    onBulkDelete={handleBulkDelete}
                />
                </>
            )}
            {showEmptyState ? (
                <EmptyState
                onCreateWorkflow={handleCreateWorkflow}
                hasFilters={hasFilters}
                onClearFilters={handleClearFilters}
                />
            ) : (
                <div className={`
                ${viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' :'space-y-4'
                }
                `}>
                {filteredWorkflows.map((workflow) => (
                    <WorkflowCard
                    key={workflow.id}
                    workflow={workflow}
                    onEdit={handleEditWorkflow}
                    onDuplicate={handleDuplicateWorkflow}
                    onDelete={handleDeleteWorkflow}
                    onToggleStatus={handleToggleStatus}
                    onViewAnalytics={handleViewAnalytics}
                    isSelected={selectedWorkflows.includes(workflow.id.toString())}
                    onSelect={() => handleSelectWorkflow(workflow.id.toString())}
                    />
                ))}
                </div>
            )}
        </div>
      </main>

      {isCreationModalOpen && (
        <WorkflowCreationMethodSelectionModal
          isOpen={isCreationModalOpen}
          onClose={() => setIsCreationModalOpen(false)}
          onSelectMethod={(method) => {
            setIsCreationModalOpen(false);
            if (method === 'visual-canvas') {
                setCurrentView('canvas')
            } else if (method === 'templates') {
                setCurrentView('templates')
            }
          }}
        />
       )}
    </div>
  );
};

export default MyWorkflowsDashboard;
