
"use client";
import React, { useState, useEffect } from 'react';
import { PipelineHeader } from './pipeline-header';
import { PipelineBoard } from './pipeline-board';
import { PipelineStage } from './pipeline-stage';
import { LeadDetailsPanel } from './lead-details-panel';
import { StageMetrics } from './stage-metrics';
import { LeadCalendarView } from './lead-calendar-view';

export const LeadPipelineManager = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [viewMode, setViewMode] = useState('board'); // board, list, calendar
  const [filters, setFilters] = useState({
    search: '',
    assignee: 'all',
    source: 'all',
    priority: 'all'
  });

  const pipelineStages = [
    {
      id: 'new',
      name: 'New Leads',
      color: 'bg-blue-500',
      order: 1
    },
    {
      id: 'contacted',
      name: 'Contacted',
      color: 'bg-yellow-500',
      order: 2
    },
    {
      id: 'qualified',
      name: 'Qualified',
      color: 'bg-orange-500',
      order: 3
    },
    {
      id: 'proposal',
      name: 'Proposal Sent',
      color: 'bg-purple-500',
      order: 4
    },
    {
      id: 'negotiation',
      name: 'Negotiation',
      color: 'bg-red-500',
      order: 5
    },
    {
      id: 'closed',
      name: 'Closed Won',
      color: 'bg-green-500',
      order: 6
    }
  ];

  useEffect(() => {
    const mockLeads = [
        {
          id: 1,
          name: 'Arjun Mehta',
          email: 'arjun.mehta@email.com',
          phone: '+91 98765 43210',
          company: 'Tech Innovations',
          stage: 'new',
          priority: 'high',
          leadScore: 85,
          dealValue: '₹3.5 Cr',
          source: 'Website',
          assignee: 'Priya Sharma',
          createdDate: '2025-01-15',
          lastActivity: new Date().toISOString(),
          timeInStage: 2,
          nextAction: 'Initial consultation call',
          profileImage: "https://images.unsplash.com/photo-1714974528757-f63c72154a1b?w=150&h=150&fit=crop&crop=face",
          alt: 'Professional headshot of Arjun Mehta in business suit',
          propertyInterest: '4 BHK Villa in Goa',
          budget: '₹2-4 Cr',
          timeline: '3-6 months'
        },
        {
          id: 2,
          name: 'Kavya Iyer',
          email: 'kavya.iyer@email.com',
          phone: '+91 87654 32109',
          company: 'Design Studio',
          stage: 'contacted',
          priority: 'medium',
          leadScore: 72,
          dealValue: '₹2.8 Cr',
          source: 'Referral',
          assignee: 'Rajesh Kumar',
          createdDate: '2025-01-12',
          lastActivity: new Date(Date.now() - 86400000).toISOString(),
          timeInStage: 5,
          nextAction: 'Property site visit',
          profileImage: "https://images.unsplash.com/photo-1493882552576-fce827c6161e?w=150&h=150&fit=crop&crop=face",
          alt: 'Professional photo of Kavya Iyer in contemporary office setting',
          propertyInterest: '3 BHK Apartment in Mumbai',
          budget: '₹2-3 Cr',
          timeline: '2-4 months'
        },
        {
          id: 3,
          name: 'Vikram Singh',
          email: 'vikram.singh@email.com',
          phone: '+91 76543 21098',
          company: 'Investment Group',
          stage: 'qualified',
          priority: 'high',
          leadScore: 91,
          dealValue: '₹8.2 Cr',
          source: 'LinkedIn',
          assignee: 'Amit Patel',
          createdDate: '2025-01-08',
          lastActivity: new Date(Date.now() - 86400000 * 2).toISOString(),
          timeInStage: 8,
          nextAction: 'Financial pre-approval',
          profileImage: "https://images.unsplash.com/photo-1677670660596-dd0a35d781ac?w=150&h=150&fit=crop&crop=face",
          alt: 'Executive portrait of Vikram Singh in formal business attire',
          propertyInterest: 'Commercial Complex in Pune',
          budget: '₹7-10 Cr',
          timeline: '6-12 months'
        },
        {
          id: 4,
          name: 'Neha Gupta',
          email: 'neha.gupta@email.com',
          phone: '+91 65432 10987',
          company: 'Healthcare Solutions',
          stage: 'proposal',
          priority: 'medium',
          leadScore: 78,
          dealValue: '₹4.1 Cr',
          source: 'Google Ads',
          assignee: 'Sunita Reddy',
          createdDate: '2025-01-05',
          lastActivity: new Date().toISOString(),
          timeInStage: 12,
          nextAction: 'Review proposal feedback',
          profileImage: "https://images.unsplash.com/photo-1734178491612-098cd27712e4?w=150&h=150&fit=crop&crop=face",
          alt: 'Business headshot of Neha Gupta in professional healthcare industry setting',
          propertyInterest: 'Luxury Penthouse in Bangalore',
          budget: '₹3.5-5 Cr',
          timeline: '1-3 months'
        },
        {
          id: 5,
          name: 'Rohit Krishnan',
          email: 'rohit.krishnan@email.com',
          phone: '+91 54321 09876',
          company: 'Fintech Startup',
          stage: 'negotiation',
          priority: 'high',
          leadScore: 89,
          dealValue: '₹5.6 Cr',
          source: 'Facebook',
          assignee: 'Priya Sharma',
          createdDate: '2024-12-28',
          lastActivity: new Date(Date.now() - 86400000 * 3).toISOString(),
          timeInStage: 18,
          nextAction: 'Final price negotiation',
          profileImage: "https://images.unsplash.com/photo-1507071392570-6eceb7d172ab?w=150&h=150&fit=crop&crop=face",
          alt: 'Startup founder portrait of Rohit Krishnan in casual business environment',
          propertyInterest: 'Smart Home Villa in Chennai',
          budget: '₹5-7 Cr',
          timeline: '2-4 weeks'
        }
    ];
    setLeads(mockLeads);
  }, []);

  const handleLeadMove = (leadId: number, newStage: string) => {
    setLeads((prev) => prev.map((lead) =>
      lead.id === leadId ?
      { ...lead, stage: newStage, timeInStage: 0, lastActivity: new Date().toISOString() } :
      lead
    ));
  };

  const handleLeadClick = (lead: any) => {
    setSelectedLead(lead);
    setIsPanelOpen(true);
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const filteredLeads = React.useMemo(() => {
    return leads.filter((lead) => {
      if (filters.search && !lead.name.toLowerCase().includes(filters.search.toLowerCase()) && !lead.company.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.assignee !== 'all' && lead.assignee !== filters.assignee) return false;
      if (filters.source !== 'all' && lead.source !== filters.source) return false;
      if (filters.priority !== 'all' && lead.priority !== filters.priority) return false;
      return true;
    });
  }, [leads, filters]);

  const getLeadsByStage = (stageId: string) => {
    return filteredLeads.filter((lead) => lead.stage === stageId);
  };

  const getStageMetrics = (stageId: string) => {
    const stageLeads = filteredLeads.filter((lead) => lead.stage === stageId);
    const totalValue = stageLeads.reduce((sum, lead) => {
      const value = parseFloat(lead.dealValue.replace(/[₹,\s]/g, '').replace('Cr', ''));
      return sum + (isNaN(value) ? 0 : value);
    }, 0);

    const avgTimeInStage = stageLeads.length > 0 ?
      Math.round(stageLeads.reduce((sum, lead) => sum + lead.timeInStage, 0) / stageLeads.length) :
      0;

    return {
      count: stageLeads.length,
      totalValue: `₹${totalValue.toFixed(1)}Cr`,
      avgTime: avgTimeInStage
    };
  };

  return (
    <div className="flex flex-col h-full bg-card">
      <PipelineHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onFiltersChange={handleFiltersChange}
        totalLeads={filteredLeads.length}
      />
      <StageMetrics
        stages={pipelineStages}
        getStageMetrics={getStageMetrics}
      />
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-auto">
          {viewMode === 'board' &&
            <PipelineBoard>
              {pipelineStages.map((stage) =>
                <PipelineStage
                  key={stage.id}
                  stage={stage}
                  leads={getLeadsByStage(stage.id)}
                  onLeadMove={handleLeadMove}
                  onLeadClick={handleLeadClick}
                  metrics={getStageMetrics(stage.id)}
                />
              )}
            </PipelineBoard>
          }
           {viewMode === 'calendar' && 
             <LeadCalendarView leads={filteredLeads} onLeadClick={handleLeadClick} />
           }
           {viewMode === 'list' && <div className="p-8 text-center text-muted-foreground">This view is not yet available.</div>}
        </div>

        {isPanelOpen &&
          <LeadDetailsPanel
            lead={selectedLead}
            stages={pipelineStages}
            onClose={() => setIsPanelOpen(false)}
            onStageChange={handleLeadMove}
          />
        }
      </div>
    </div>
  );
};
