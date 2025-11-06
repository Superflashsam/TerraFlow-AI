"use client";

import React, { useState } from 'react';
import AppIcon from '@/components/contacts/app-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const CustomizationPanel = ({ selectedTemplate, currentContent, onExport }: { selectedTemplate: any, currentContent: string, onExport: (format: string) => void }) => {
  const [brandSettings, setBrandSettings] = useState({
    companyName: 'TerraFlow Realty',
    logo: '',
    primaryColor: '#2563eb',
    secondaryColor: '#64748b',
    fontFamily: 'Inter'
  });

  const [exportSettings, setExportSettings] = useState({
    format: 'pdf',
    includeHeader: true,
    includeFooter: true,
    addWatermark: false
  });

  const exportFormats = [
    { value: 'pdf', label: 'PDF Document', icon: 'FileText' },
    { value: 'docx', label: 'Word Document', icon: 'FileText' },
    { value: 'html', label: 'HTML Email', icon: 'Mail' },
    { value: 'txt', label: 'Plain Text', icon: 'File' }
  ];

  const fontOptions = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Times New Roman', label: 'Times New Roman' }
  ];

  const handleExport = () => {
    onExport(exportSettings.format);
  };

  const handleBrandingUpdate = (field: string, value: string) => {
    setBrandSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const previewStyle = {
    fontFamily: brandSettings.fontFamily,
    color: brandSettings.primaryColor
  };

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <AppIcon name="Palette" size={20} className="text-primary" />
          <span>Customization</span>
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Brand Guidelines */}
        <div>
          <h3 className="font-medium text-foreground mb-4 flex items-center space-x-2">
            <AppIcon name="Building" size={16} className="text-primary" />
            <span>Brand Guidelines</span>
          </h3>
          
          <div className="space-y-4">
            <Input
              label="Company Name"
              type="text"
              value={brandSettings.companyName}
              onChange={(e) => handleBrandingUpdate('companyName', e.target.value)}
              placeholder="Enter company name"
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Primary Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={brandSettings.primaryColor}
                  onChange={(e) => handleBrandingUpdate('primaryColor', e.target.value)}
                  className="w-12 h-10 border border-border rounded-md cursor-pointer"
                />
                <Input
                  type="text"
                  value={brandSettings.primaryColor}
                  onChange={(e) => handleBrandingUpdate('primaryColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Secondary Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={brandSettings.secondaryColor}
                  onChange={(e) => handleBrandingUpdate('secondaryColor', e.target.value)}
                  className="w-12 h-10 border border-border rounded-md cursor-pointer"
                />
                <Input
                  type="text"
                  value={brandSettings.secondaryColor}
                  onChange={(e) => handleBrandingUpdate('secondaryColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Font Family
              </label>
              <select
                value={brandSettings.fontFamily}
                onChange={(e) => handleBrandingUpdate('fontFamily', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {fontOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Brand Preview */}
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Brand Preview:</p>
              <div style={previewStyle} className="text-sm">
                <strong>{brandSettings.companyName}</strong>
                <br />
                <span style={{ color: brandSettings.secondaryColor }}>
                  Your trusted real estate partner
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Settings */}
        {selectedTemplate && (
          <div>
            <h3 className="font-medium text-foreground mb-4 flex items-center space-x-2">
              <AppIcon name="Settings" size={16} className="text-primary" />
              <span>Content Settings</span>
            </h3>
            
            <div className="space-y-4">
              {selectedTemplate.isRERACompliant && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AppIcon name="Shield" size={16} className="text-green-500" />
                    <span className="text-sm font-medium text-green-500">RERA Compliance</span>
                  </div>
                  <p className="text-xs text-green-500">
                    This template ensures RERA compliance with mandatory disclosures and legal requirements.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={exportSettings.includeHeader}
                    onChange={(e) => setExportSettings(prev => ({
                      ...prev,
                      includeHeader: e.target.checked
                    }))}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">Include Header</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={exportSettings.includeFooter}
                    onChange={(e) => setExportSettings(prev => ({
                      ...prev,
                      includeFooter: e.target.checked
                    }))}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">Include Footer</span>
                </label>
              </div>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={exportSettings.addWatermark}
                  onChange={(e) => setExportSettings(prev => ({
                    ...prev,
                    addWatermark: e.target.checked
                  }))}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-foreground">Add Watermark</span>
              </label>
            </div>
          </div>
        )}

        {/* Export Options */}
        {currentContent && (
          <div>
            <h3 className="font-medium text-foreground mb-4 flex items-center space-x-2">
              <AppIcon name="Download" size={16} className="text-primary" />
              <span>Export Options</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Export Format
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {exportFormats.map((format) => (
                    <label
                      key={format.value}
                      className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                        exportSettings.format === format.value
                          ? 'border-primary bg-primary/5' :'border-border hover:bg-muted'
                      }`}
                    >
                      <input
                        type="radio"
                        name="exportFormat"
                        value={format.value}
                        checked={exportSettings.format === format.value}
                        onChange={(e) => setExportSettings(prev => ({
                          ...prev,
                          format: e.target.value
                        }))}
                        className="sr-only"
                      />
                      <AppIcon name={format.icon} size={16} className="text-primary" />
                      <span className="text-sm font-medium text-foreground">{format.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button
                variant="default"
                onClick={handleExport}
                className="w-full"
              >
                <AppIcon name="Download" className="mr-2"/>
                Export Content
              </Button>
            </div>
          </div>
        )}

        {/* Collaboration */}
        <div>
          <h3 className="font-medium text-foreground mb-4 flex items-center space-x-2">
            <AppIcon name="Users" size={16} className="text-primary" />
            <span>Collaboration</span>
          </h3>
          
          <div className="space-y-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              disabled={!currentContent}
            >
              <AppIcon name="Share2" className="mr-2"/>
              Share for Review
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              disabled={!currentContent}
            >
              <AppIcon name="MessageSquare" className="mr-2"/>
              Add Comments
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              disabled={!currentContent}
            >
              <AppIcon name="History" className="mr-2"/>
              Version History
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
