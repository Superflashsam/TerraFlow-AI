"use client";

import React, { useState } from 'react';
import { Sparkles, Save, Bot, MessageCircle, Mail, BarChart, FileSignature, Settings, Map, Compass, PenTool } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContentGenerator } from '@/components/marketing/content-generator';
import { WhatsappHub } from '@/components/marketing/whatsapp/whatsapp-hub';
import { EmailMarketingHub } from '@/components/marketing/email/email-hub';
import { OfflineHub } from '@/components/marketing/offline/offline-hub';
import { AiAssistantHub } from '@/components/marketing/ai-assistant/ai-assistant-hub';

const MarketingPage = () => {
  const [activeTab, setActiveTab] = useState("whatsapp");

  const navItems = [
    { id: 'content-generator', label: 'AI Content Generator', icon: PenTool },
    { id: 'whatsapp', label: 'WhatsApp Campaigns', icon: MessageCircle },
    { id: 'email', label: 'Email Marketing', icon: Mail },
    { id: 'offline', label: 'Offline Tracking', icon: Map },
    { id: 'assistant', label: 'AI Assistant', icon: Bot },
    { id: 'content-templates', label: 'Content Templates', icon: FileSignature },
  ];

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Marketing Hub"
        description="Manage campaigns, automate workflows, and track performance."
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col mt-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {navItems.map((item) => (
            <TabsTrigger key={item.id} value={item.id} className="flex items-center gap-2">
              <item.icon size={16} />
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="content-generator" className="flex-1 mt-4">
           <ContentGenerator />
        </TabsContent>
        <TabsContent value="whatsapp" className="flex-1 mt-4">
          <WhatsappHub />
        </TabsContent>
        <TabsContent value="email" className="flex-1 mt-4">
           <EmailMarketingHub />
        </TabsContent>
        <TabsContent value="offline" className="flex-1 mt-4">
          <OfflineHub />
        </TabsContent>
        <TabsContent value="assistant" className="flex-1 mt-4">
          <AiAssistantHub />
        </TabsContent>
         <TabsContent value="content-templates" className="flex-1 mt-4">
          <div className="text-center py-16">
            <FileSignature size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">Content Templates</h3>
            <p className="text-muted-foreground">This feature is coming soon.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingPage;
