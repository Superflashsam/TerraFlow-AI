"use client";

import React, { useState } from 'react';
import { Sparkles, Save, PenTool } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { ContentTemplates } from '@/components/marketing/ContentTemplates';
import { AIEditor } from '@/components/marketing/AIEditor';
import { CustomizationPanel } from '@/components/marketing/CustomizationPanel';

export default function TerraScribeStudio() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [currentContent, setCurrentContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [editorMode, setEditorMode] = useState('create'); // create, edit, preview

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    setEditorMode('create');
    setCurrentContent('');
  };

  const handleContentGenerate = async (prompt: any, settings: any) => {
    setIsGenerating(true);
    try {
      // Simulate AI content generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      const generatedContent = `Generated content for ${selectedTemplate?.name} with the following prompt: "${prompt}"`;
      setCurrentContent(generatedContent);
      setEditorMode('edit');
    } catch (error) {
      console.error('Content generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = (format: string) => {
    console.log(`Exporting content in ${format} format:`, currentContent);
  };

  return (
    <div className="flex flex-col h-full">
        <PageHeader
            title="TerraScribe™ Studio"
            description="AI-powered content generation for marketing copy, emails, and RERA-compliant contracts"
        >
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                disabled={!currentContent}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button
                onClick={() => setEditorMode('create')}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                New Content
              </Button>
            </div>
        </PageHeader>
        
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 flex-1 mt-6">
        {/* Left Sidebar - Templates */}
        <div className="xl:col-span-3 h-full">
            <ContentTemplates
            selectedTemplate={selectedTemplate}
            onTemplateSelect={handleTemplateSelect}
            />
        </div>
        
        {/* Center - AI Editor */}
        <div className="xl:col-span-6 h-full">
            <AIEditor
            selectedTemplate={selectedTemplate}
            currentContent={currentContent}
            setCurrentContent={setCurrentContent}
            isGenerating={isGenerating}
            onGenerate={handleContentGenerate}
            mode={editorMode}
            setMode={setEditorMode}
            />
        </div>
        
        {/* Right Sidebar - Customization */}
        <div className="xl:col-span-3 h-full">
            <CustomizationPanel
            selectedTemplate={selectedTemplate}
            currentContent={currentContent}
            onExport={handleExport}
            />
        </div>
        </div>
    </div>
  );
};
