"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Upload, FileText, Calendar, User, Download, Eye, History } from 'lucide-react';
import type { KnowledgeVersion, KnowledgeAttachment } from '@/server/terra-store';

type Knowledge = { 
  company: string; 
  properties: string; 
  faqs: string; 
  policies: string; 
  objections: string; 
  logs: string[]; 
  confidence: string;
  versions: KnowledgeVersion[];
  attachments: KnowledgeAttachment[];
};

export function TrainingTab() {
  const [data, setData] = useState<Knowledge | null>(null);
  const [versionComment, setVersionComment] = useState('');
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  
  useEffect(() => { 
    (async () => { 
      const res = await fetch('/api/terra/knowledge'); 
      const j = await res.json(); 
      setData(j); 
    })(); 
  }, []);
  
  const save = async () => {
    if (!data) return;
    
    // Create a new version if comment is provided
    if (versionComment.trim()) {
      const newVersion: KnowledgeVersion = {
        id: `v${Date.now()}`,
        timestamp: new Date().toISOString(),
        author: 'Current User', // In real app, get from auth
        changes: versionComment,
        data: {
          company: data.company,
          properties: data.properties,
          faqs: data.faqs,
          policies: data.policies,
          objections: data.objections
        }
      };
      
      const updatedData = {
        ...data,
        versions: [...data.versions, newVersion],
        logs: [...data.logs, `Version created: ${versionComment} at ${new Date().toLocaleString()}`]
      };
      
      setData(updatedData);
      setVersionComment('');
      
      await fetch('/api/terra/knowledge', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(updatedData) 
      });
    } else {
      await fetch('/api/terra/knowledge', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(data) 
      });
    }
  };
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !data) return;
    
    // Simulate file upload - in real app, upload to server
    const newAttachments: KnowledgeAttachment[] = [];
    
    Array.from(files).forEach(file => {
      const attachment: KnowledgeAttachment = {
        id: `att_${Date.now()}_${Math.random()}`,
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file), // In real app, this would be server URL
        uploadedAt: new Date().toISOString()
      };
      newAttachments.push(attachment);
    });
    
    const updatedData = {
      ...data,
      attachments: [...data.attachments, ...newAttachments],
      logs: [...data.logs, `Files uploaded: ${newAttachments.map(a => a.name).join(', ')}`]
    };
    
    setData(updatedData);
  };
  
  const restoreVersion = (version: KnowledgeVersion) => {
    if (!data) return;
    
    const restoredData = {
      ...data,
      ...version.data,
      logs: [...data.logs, `Restored to version: ${version.changes} (${new Date(version.timestamp).toLocaleDateString()})`]
    };
    
    setData(restoredData);
  };
  
  if (!data) return <p className="text-sm text-muted-foreground">Loading knowledge...</p>;
  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Knowledge Base Training</h2>
        <div className="flex gap-2">
          <Dialog open={showVersionHistory} onOpenChange={setShowVersionHistory}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <History className="h-4 w-4 mr-2" />
                Version History ({data.versions.length})
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Version History</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {data.versions.slice().reverse().map((version) => (
                    <Card key={version.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{version.changes}</h4>
                            <p className="text-sm text-muted-foreground">
                              <User className="h-3 w-3 inline mr-1" />
                              {version.author} • <Calendar className="h-3 w-3 inline mr-1" />
                              {new Date(version.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              restoreVersion(version);
                              setShowVersionHistory(false);
                            }}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Restore
                          </Button>
                        </div>
                        <Separator className="my-2" />
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <strong>Company:</strong>
                            <p className="truncate">{version.data.company || 'No content'}</p>
                          </div>
                          <div>
                            <strong>Properties:</strong>
                            <p className="truncate">{version.data.properties || 'No content'}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
          
          <Dialog open={showAttachments} onOpenChange={setShowAttachments}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Attachments ({data.attachments.length})
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Knowledge Attachments</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <Input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.txt,.md,.jpg,.jpeg,.png,.gif"
                  />
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <Button variant="outline" asChild>
                      <span>Choose Files or Drag & Drop</span>
                    </Button>
                  </Label>
                  <p className="text-sm text-muted-foreground mt-2">
                    Supported: PDF, DOC, DOCX, TXT, MD, JPG, PNG, GIF (Max 10MB each)
                  </p>
                </div>
                
                {data.attachments.length > 0 && (
                  <ScrollArea className="h-64">
                    <div className="space-y-2">
                      {data.attachments.map((attachment) => (
                        <Card key={attachment.id}>
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-blue-500" />
                                <div>
                                  <p className="font-medium text-sm">{attachment.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {(attachment.size / 1024).toFixed(1)} KB • {attachment.type}
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Training Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>AI Training Logs</span>
            <Badge variant="secondary">{data.confidence}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-32">
            <ul className="text-xs space-y-1">
              {data.logs.slice().reverse().map((log, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span>{log}</span>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Version Comment */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <Label htmlFor="version-comment">Version Comment (Optional)</Label>
            <Textarea
              id="version-comment"
              placeholder="Describe your changes for version history..."
              value={versionComment}
              onChange={(e) => setVersionComment(e.target.value)}
              className="min-h-[60px]"
            />
            <p className="text-xs text-muted-foreground">
              Adding a comment will create a new version in the history
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Knowledge Sections */}
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="company" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="font-medium">Company Information</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <Textarea 
              value={data.company} 
              onChange={e => setData({...data, company: e.target.value})}
              placeholder="Enter company overview, mission, values, history, and key information..."
              className="min-h-[120px] font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {data.company.length} characters • Use markdown formatting for better structure
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="properties" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="font-medium">Property Details</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <Textarea 
              value={data.properties} 
              onChange={e => setData({...data, properties: e.target.value})}
              placeholder="Enter property specifications, amenities, pricing, locations, and features..."
              className="min-h-[120px] font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {data.properties.length} characters • Include unit types, sizes, and key selling points
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faqs" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="font-medium">FAQs</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <Textarea 
              value={data.faqs} 
              onChange={e => setData({...data, faqs: e.target.value})}
              placeholder="Enter frequently asked questions and answers..."
              className="min-h-[120px] font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {data.faqs.length} characters • Format as Q: Question A: Answer pairs
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="policies" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="font-medium">Policies & Processes</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <Textarea 
              value={data.policies} 
              onChange={e => setData({...data, policies: e.target.value})}
              placeholder="Enter booking procedures, payment terms, cancellation policies, and legal information..."
              className="min-h-[120px] font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {data.policies.length} characters • Include important legal and procedural information
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="objections" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="font-medium">Objection Handling Scripts</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3">
            <Textarea 
              value={data.objections} 
              onChange={e => setData({...data, objections: e.target.value})}
              placeholder="Enter common objections and recommended responses..."
              className="min-h-[120px] font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {data.objections.length} characters • Format as Objection: Response pairs
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={save} size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Save Knowledge Base
        </Button>
      </div>
    </div>
  );
}

