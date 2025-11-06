"use client";

import React, { useState } from 'react';
import AppIcon from '@/components/contacts/app-icon';
import { Button } from '@/components/ui/button';

export const AIEditor = ({ selectedTemplate, currentContent, setCurrentContent, isGenerating, onGenerate, mode, setMode }: { selectedTemplate: any, currentContent: string, setCurrentContent: (content: string) => void, isGenerating: boolean, onGenerate: (prompt: string, settings: any) => void, mode: string, setMode: (mode: string) => void }) => {
  const [prompt, setPrompt] = useState('');
  const [aiSettings, setAiSettings] = useState({
    tone: 'professional',
    audience: 'buyers',
    length: 'medium'
  });

  const handleGenerate = () => {
    if (!selectedTemplate) {
      alert('Please select a template first');
      return;
    }
    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }
    onGenerate(prompt, aiSettings);
  };

  const handlePromptPreset = (presetPrompt: string) => {
    setPrompt(presetPrompt);
  };

  const promptPresets = [
    'Create compelling copy that highlights unique features',
    'Write professional email content for lead nurturing',
    'Generate RERA-compliant legal document sections',
    'Craft engaging social media captions'
  ];

  const toneOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'persuasive', label: 'Persuasive' },
    { value: 'formal', label: 'Formal' }
  ];

  const audienceOptions = [
    { value: 'buyers', label: 'Buyers' },
    { value: 'sellers', label: 'Sellers' },
    { value: 'investors', label: 'Investors' },
    { value: 'tenants', label: 'Tenants' }
  ];

  const lengthOptions = [
    { value: 'short', label: 'Short' },
    { value: 'medium', label: 'Medium' },
    { value: 'long', label: 'Long' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <AppIcon name="Sparkles" size={20} className="text-primary" />
            <span>AI Content Editor</span>
          </h2>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={mode === 'create' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setMode('create')}
            >
              Create
            </Button>
            <Button
              variant={mode === 'edit' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setMode('edit')}
              disabled={!currentContent}
            >
              Edit
            </Button>
            <Button
              variant={mode === 'preview' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setMode('preview')}
              disabled={!currentContent}
            >
              Preview
            </Button>
          </div>
        </div>

        {selectedTemplate && (
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <AppIcon name={selectedTemplate.icon} size={20} className="text-primary" />
            <div>
              <h3 className="font-medium text-foreground">{selectedTemplate.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {mode === 'create' && (
          <div className="p-4 h-full flex flex-col">
            {/* AI Prompt Section */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Content Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={selectedTemplate ? 
                    `Describe what you want to create for ${selectedTemplate.name}...` : 
                    'Select a template first, then describe your content requirements...'
                  }
                  className="w-full h-24 px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  disabled={!selectedTemplate}
                />
              </div>

              {/* Prompt Presets */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Quick Prompts
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {promptPresets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => handlePromptPreset(preset)}
                      className="text-left p-2 text-sm bg-muted hover:bg-muted/80 rounded-md transition-colors duration-200"
                      disabled={!selectedTemplate}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Settings */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Tone</label>
                  <select
                    value={aiSettings.tone}
                    onChange={(e) => setAiSettings({...aiSettings, tone: e.target.value})}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    disabled={!selectedTemplate}
                  >
                    {toneOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Audience</label>
                  <select
                    value={aiSettings.audience}
                    onChange={(e) => setAiSettings({...aiSettings, audience: e.target.value})}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    disabled={!selectedTemplate}
                  >
                    {audienceOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Length</label>
                  <select
                    value={aiSettings.length}
                    onChange={(e) => setAiSettings({...aiSettings, length: e.target.value})}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    disabled={!selectedTemplate}
                  >
                    {lengthOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Generate Button */}
              <Button
                variant="default"
                size="lg"
                onClick={handleGenerate}
                disabled={!selectedTemplate || !prompt.trim() || isGenerating}
                className="w-full"
              >
                {isGenerating ? <AppIcon name="Loader2" className="animate-spin mr-2"/> : <AppIcon name="Sparkles" className="mr-2" />}
                {isGenerating ? 'Generating Content...' : 'Generate with Terra AI'}
              </Button>
            </div>
          </div>
        )}

        {(mode === 'edit' || mode === 'preview') && (
          <div className="p-4 h-full">
            {mode === 'edit' ? (
              <textarea
                value={currentContent}
                onChange={(e) => setCurrentContent(e.target.value)}
                className="w-full h-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-mono text-sm"
                placeholder="Generated content will appear here..."
              />
            ) : (
              <div className="h-full overflow-y-auto bg-background border border-border rounded-md p-4">
                <div 
                  className="prose prose-sm max-w-none text-foreground"
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {currentContent || 'No content to preview'}
                </div>
              </div>
            )}
          </div>
        )}

        {!selectedTemplate && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <AppIcon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Select a Template</h3>
              <p className="text-muted-foreground">Choose a content template from the sidebar to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
