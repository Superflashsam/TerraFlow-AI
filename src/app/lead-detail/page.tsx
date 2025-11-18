"use client";
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Clock,
  Home,
  FileText,
  ArrowLeft,
  UserPlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LeadSummaryCard } from '@/components/leads/lead-summary-card';
import { ActivityTimeline } from '@/components/leads/activity-timeline';
import { PropertiesOfInterest } from '@/components/leads/properties-of-interest';
import { DocumentsSection } from '@/components/leads/documents-section';
import { NextBestActions } from '@/components/leads/next-best-actions';
import { Skeleton } from '@/components/ui/skeleton';

const LeadDetail = () => {
  const router = useRouter();
  const [leadId, setLeadId] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search)
      setLeadId(sp.get('leadId'))
    }
  }, [])
  const [activeTab, setActiveTab] = useState('overview');
  const [lead, setLead] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    // MOCK DATA FETCHING
    const mockLead = {
      id: 'LD-2024-001',
      name: 'Sarah Mitchell',
      email: 'sarah.mitchell@email.com',
      phone: '+1 (555) 123-4567',
      location: 'Manhattan, NY',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      status: 'Hot',
      score: 87,
      scoreReason: 'High engagement, qualified budget, active property search',
      budget: '$2.5M - $3.5M',
      source: 'Website Inquiry',
      lastContact: new Date(Date.now() - 86400000 * 2),
      createdAt: new Date(Date.now() - 86400000 * 14),
      assignedTo: 'Sarah Johnson',
      isOnline: true,
    };

    const mockActivities = [
      {
        id: 1,
        type: 'email',
        title: 'Email Sent: Property Recommendations',
        summary: 'Sent curated list of 5 luxury condos matching budget and preferences',
        content: `Hi Sarah, ...`,
        timestamp: new Date(Date.now() - 3600000 * 4),
        user: 'Sarah Johnson',
        tags: ['property-recommendations', 'follow-up'],
      },
      {
        id: 2,
        type: 'call',
        title: 'Phone Call: Initial Consultation',
        summary: '45-minute consultation discussing budget, preferences, and timeline',
        content: `Call Duration: 45 minutes...`,
        timestamp: new Date(Date.now() - 86400000 * 1),
        user: 'Sarah Johnson',
        tags: ['consultation', 'qualification'],
      },
    ];

     const mockProperties = [
      {
        id: 1,
        title: "Luxury Penthouse at 432 Park Avenue",
        address: "432 Park Avenue, Midtown East, NY",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
        price: 3200000,
        pricePerSqft: 2400,
        bedrooms: 3,
        bathrooms: 3,
        sqft: 1333,
        matchScore: 95,
        interestLevel: 5,
        notes: "Perfect match - Central Park views, modern amenities",
        viewings: [
          {
            date: new Date(Date.now() + 86400000),
            status: "scheduled",
            feedback: null
          }
        ]
      },
    ];

    const mockDocuments = [
       {
        id: 1,
        name: "Pre-approval_Letter_Chase.pdf",
        type: "pdf",
        size: 245760,
        category: "financial",
        uploadedAt: new Date(Date.now() - 86400000 * 5),
        description: "Pre-approval letter from Chase Private Client",
        tags: ["financing", "pre-approval"],
        isSecure: true,
        url: "#"
      },
    ];

    const mockRecommendations = [
      {
        id: 1,
        type: "email",
        priority: "high",
        title: "Send Market Update Email",
        description: "Share latest market trends and new listings that match client preferences",
        reasoning: "Client hasn't received communication in 4 days. Market update emails have 73% open rate with this lead segment.",
        estimatedTime: 15,
        successProbability: 85,
        expectedImpact: 12,
        suggestedContent: `...`,
        optimalTiming: { day: "Tuesday", time: "10:00 AM", timezone: "EST" }
      },
    ];
    
    setLead(mockLead);
    setActivities(mockActivities);
    setProperties(mockProperties);
    setDocuments(mockDocuments);
    setRecommendations(mockRecommendations);
  }, [leadId]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'timeline', label: 'Activity Timeline', icon: Clock },
    { id: 'properties', label: 'Properties of Interest', icon: Home },
    { id: 'documents', label: 'Documents', icon: FileText },
  ];

  const handleEditLead = (updatedLead: any) => {
    setLead(updatedLead);
  };
  const handleCall = () => console.log('Call');
  const handleEmail = () => console.log('Email');
  const handleScheduleMeeting = () => console.log('Schedule');
  const handleAddActivity = (activity: any) => setActivities([activity, ...activities]);
  const handleAddProperty = (query: string) => console.log('Add property:', query);
  const handleRemoveProperty = (id: number) => setProperties(properties.filter(p => p.id !== id));
  const handleScheduleViewing = (id: number) => console.log('Schedule viewing for:', id);
  const handleUploadDocument = (file: File) => console.log('Upload:', file.name);
  const handleDeleteDocument = (id: number) => setDocuments(documents.filter(d => d.id !== id));
  const handleDownloadDocument = (id: number) => console.log('Download:', id);
  const handleExecuteAction = (id: number) => setRecommendations(recommendations.filter(r => r.id !== id));
  const handleDismissAction = (id: number) => setRecommendations(recommendations.filter(r => r.id !== id));
  const handleGenerateContent = async (id: number, type: string): Promise<void> => { console.log('Generate:', type); await new Promise<void>(res => setTimeout(res, 1000)); };

  if (!lead) {
    return (
      <div className="p-6">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-3">
             <Skeleton className="h-[500px] w-full" />
          </div>
           <div className="xl:col-span-6">
             <Skeleton className="h-[700px] w-full" />
          </div>
           <div className="xl:col-span-3">
             <Skeleton className="h-[600px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div />}> 
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lead Detail</h1>
          <p className="text-muted-foreground">
            Complete 360-degree view of {lead.name}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => router.push('/leads')}>
            <ArrowLeft className="mr-2" />
            Back to Leads
          </Button>
          <Button>
            <UserPlus className="mr-2" />
            Convert to Client
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-3">
          <LeadSummaryCard
            lead={lead}
            onEdit={handleEditLead}
            onCall={handleCall}
            onEmail={handleEmail}
            onScheduleMeeting={handleScheduleMeeting}
          />
        </div>

        <div className="xl:col-span-6">
          <div className="bg-card border border-border rounded-lg shadow-sm">
            <div className="border-b border-border">
              <nav className="flex space-x-2 sm:space-x-4 px-4" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    <tab.icon size={16} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                   <h3 className="text-lg font-semibold text-foreground">Lead Overview</h3>
                   {/* Overview content here */}
                </div>
              )}
              {activeTab === 'timeline' && (
                <ActivityTimeline
                  activities={activities}
                  onAddActivity={handleAddActivity}
                />
              )}
              {activeTab === 'properties' && (
                <PropertiesOfInterest
                  properties={properties}
                  onAddProperty={handleAddProperty}
                  onRemoveProperty={handleRemoveProperty}
                  onScheduleViewing={handleScheduleViewing}
                />
              )}
              {activeTab === 'documents' && (
                <DocumentsSection
                  documents={documents}
                  onUploadDocument={handleUploadDocument}
                  onDeleteDocument={handleDeleteDocument}
                  onDownloadDocument={handleDownloadDocument}
                />
              )}
            </div>
          </div>
        </div>

        <div className="xl:col-span-3">
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <NextBestActions
              recommendations={recommendations}
              onExecuteAction={handleExecuteAction}
              onDismissAction={handleDismissAction}
              onGenerateContent={handleGenerateContent}
            />
          </div>
        </div>
      </div>
    </div>
    </Suspense>
  );
};

export default LeadDetail;
