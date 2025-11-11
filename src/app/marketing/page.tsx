"use client";

import React, { useState } from 'react';
import { Sparkles, Save, Bot, MessageCircle, Mail, BarChart, FileSignature, Settings } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContentGenerator } from '@/components/marketing/content-generator';
import { WhatsappHub } from '@/components/marketing/whatsapp/whatsapp-hub';

const MarketingPage = () => {
  const [activeTab, setActiveTab] = useState("whatsapp");

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Marketing Hub"
        description="Your central command for content creation, campaigns, and analytics."
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col mt-6">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Sparkles size={16} />
            Content Studio
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="flex items-center gap-2">
             <MessageCircle size={16} />
            WhatsApp
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail size={16} />
            Email
          </TabsTrigger>
           <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart size={16} />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="assistant" className="flex items-center gap-2">
            <Bot size={16} />
            AI Assistant
          </TabsTrigger>
           <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings size={16} />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="flex-1 mt-4">
          <ContentGenerator />
        </TabsContent>
        <TabsContent value="whatsapp" className="flex-1 mt-4">
          <WhatsappHub />
        </TabsContent>
        <TabsContent value="email" className="flex-1 mt-4">
           <div className="text-center py-16">
            <Mail size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">Email Marketing Studio</h3>
            <p className="text-muted-foreground">This feature is coming soon.</p>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="flex-1 mt-4">
          <div className="text-center py-16">
            <BarChart size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">Campaign Analytics</h3>
            <p className="text-muted-foreground">This feature is coming soon.</p>
          </div>
        </TabsContent>
        <TabsContent value="assistant" className="flex-1 mt-4">
          <div className="text-center py-16">
            <Bot size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">Marketing AI Assistant</h3>
            <p className="text-muted-foreground">This feature is coming soon.</p>
          </div>
        </TabsContent>
        <TabsContent value="settings" className="flex-1 mt-4">
          <div className="text-center py-16">
            <Settings size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">Marketing Settings</h3>
            <p className="text-muted-foreground">This feature is coming soon.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingPage;