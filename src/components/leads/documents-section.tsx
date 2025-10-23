"use client";

import React, { useState } from 'react';
import {
  Upload,
  FileText,
  FileSpreadsheet,
  Image as ImageIcon,
  Archive as ArchiveIcon,
  File,
  Download,
  Eye,
  Trash2,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const iconMap: { [key: string]: React.ElementType } = {
  FileText,
  FileSpreadsheet,
  ImageIcon,
  ArchiveIcon,
  File,
};

const DocumentsSection = ({
  documents,
  onUploadDocument,
  onDeleteDocument,
  onDownloadDocument,
}: {
  documents: any[];
  onUploadDocument: (file: File) => void;
  onDeleteDocument: (id: number) => void;
  onDownloadDocument: (id: number) => void;
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    fileArray.forEach((file) => {
      onUploadDocument(file);
    });
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return 'FileText';
      case 'doc': case 'docx': return 'FileText';
      case 'xls': case 'xlsx': return 'FileSpreadsheet';
      case 'jpg': case 'jpeg': case 'png': case 'gif': return 'ImageIcon';
      case 'zip': case 'rar': return 'ArchiveIcon';
      default: return 'File';
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return 'text-destructive';
      case 'doc': case 'docx': return 'text-primary';
      case 'xls': case 'xlsx': return 'text-green-500';
      case 'jpg': case 'jpeg': case 'png': case 'gif': return 'text-accent-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const documentCategories = [
    { id: 'contracts', label: 'Contracts', count: documents.filter(d => d.category === 'contracts').length },
    { id: 'financial', label: 'Financial', count: documents.filter(d => d.category === 'financial').length },
    { id: 'identification', label: 'ID Documents', count: documents.filter(d => d.category === 'identification').length },
    { id: 'property', label: 'Property Docs', count: documents.filter(d => d.category === 'property').length },
    { id: 'communication', label: 'Communication', count: documents.filter(d => d.category === 'communication').length },
    { id: 'other', label: 'Other', count: documents.filter(d => d.category === 'other').length }
  ];


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Documents</h3>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            multiple
            onChange={(e) => handleFiles(e.target.files!)}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button variant="outline" size="sm" asChild>
              <span><Upload className="mr-2"/>Upload Files</span>
            </Button>
          </label>
        </div>
      </div>
      
       <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
          dragActive 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload size={32} className="text-muted-foreground mx-auto mb-4" />
        <p className="text-foreground font-medium mb-2">
          Drag and drop files here, or click to select
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Supports PDF, DOC, XLS, images and more (Max 10MB per file)
        </p>
        <label htmlFor="file-upload">
          <Button variant="outline" size="sm" asChild>
            <span>Choose Files</span>
          </Button>
        </label>
      </div>

      <div className="space-y-3">
        {documents.length === 0 ? (
          <div className="text-center py-8">
            <FileText size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No documents uploaded yet</p>
          </div>
        ) : (
          documents.map((document) => {
            const Icon = iconMap[getFileIcon(document.type)];
            return (
                <div key={document.id} className="bg-card border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Icon
                        size={24}
                        className={getFileTypeColor(document.type)}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium text-foreground truncate">{document.name}</h4>
                          <div className="flex items-center space-x-2 mt-1 text-sm text-muted-foreground">
                            <span>{formatFileSize(document.size)}</span>
                            <span>•</span>
                            <span>{document.type.toUpperCase()}</span>
                            <span>•</span>
                            <span>{formatDate(document.uploadedAt)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDownloadDocument(document.id)}
                          >
                              <Download/>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => window.open(document.url, '_blank')}
                          >
                              <Eye/>
                          </Button>
                           <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDeleteDocument(document.id)}
                            className="text-destructive hover:text-destructive"
                          >
                              <Trash2/>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            )
        })
        )}
      </div>
    </div>
  );
};

export { DocumentsSection };