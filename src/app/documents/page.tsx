"use client";

import React, { useState } from 'react';
import { DocumentSidebar } from '@/components/documents/sidebar';
import { DocumentFilters } from '@/components/documents/filter-bar';
import { DocumentGrid } from '@/components/documents/grid-view';
import { DocumentList } from '@/components/documents/list-view';
import { DocumentDetailsPanel } from '@/components/documents/detail-panel';
import { Button } from '@/components/ui/button';
import { Grid, List, Upload, Folder, Plus } from 'lucide-react';
import { documents as mockDocuments } from '@/lib/placeholder-data';
import { BulkActionsToolbar } from '@/components/documents/bulk-actions';
import { UploadModal } from '@/components/documents/upload-modal';
import { PageHeader } from '@/components/shared/page-header';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(mockDocuments);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleSelectDocument = (doc: any) => {
    setSelectedDocument(doc);
  };

  const handleCheckboxChange = (docId: string, isChecked: boolean) => {
    setSelectedDocuments(prev => 
      isChecked ? [...prev, docId] : prev.filter(id => id !== docId)
    );
  };
  
  const handleSelectAll = (isChecked: boolean) => {
    setSelectedDocuments(isChecked ? documents.map(d => d.id) : []);
  };

  const handleUpload = (files: File[]) => {
    console.log('Uploading files:', files);
    setIsUploadModalOpen(false);
  };


  return (
    <div className="h-full flex flex-col bg-background text-foreground">
        <PageHeader
            title="Documents"
            description="Centralized document storage and management"
        >
             <div className="flex items-center space-x-2">
                <div className="flex items-center bg-muted p-1 rounded-lg">
                    <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="sm" onClick={() => setViewMode('grid')}><Grid className="h-4 w-4" /></Button>
                    <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="sm" onClick={() => setViewMode('list')}><List className="h-4 w-4" /></Button>
                </div>
                <Button variant="outline" onClick={() => setIsUploadModalOpen(true)}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                </Button>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Folder
                </Button>
            </div>
        </PageHeader>
        
        <div className="flex-1 flex mt-6 overflow-hidden gap-6">
            <DocumentSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <DocumentFilters onFilterChange={() => {}} onSortChange={() => {}} />
                
                <div className="flex-1 overflow-y-auto mt-4 pr-6">
                    {viewMode === 'grid' ? (
                        <DocumentGrid 
                            documents={documents} 
                            onSelect={handleSelectDocument}
                            onCheckboxChange={handleCheckboxChange}
                            selectedDocuments={selectedDocuments}
                        />
                    ) : (
                        <DocumentList
                             documents={documents} 
                             onSelect={handleSelectDocument}
                             onCheckboxChange={handleCheckboxChange}
                             selectedDocuments={selectedDocuments}
                             onSelectAll={handleSelectAll}
                        />
                    )}
                </div>
            </div>
            {selectedDocument && <DocumentDetailsPanel document={selectedDocument} onClose={() => setSelectedDocument(null)} />}
        </div>
        {selectedDocuments.length > 0 && <BulkActionsToolbar selectedCount={selectedDocuments.length} onClear={() => setSelectedDocuments([])} />}
        <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} onUpload={handleUpload} />
    </div>
  );
}
