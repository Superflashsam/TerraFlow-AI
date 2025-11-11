"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const UploadModal = ({ isOpen, onClose, onUpload }: { isOpen: boolean; onClose: () => void; onUpload: (files: File[]) => void; }) => {
  const [files, setFiles] = useState<File[]>([]);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = () => {
    onUpload(files);
    setFiles([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
                <DialogTitle>Upload Documents</DialogTitle>
                <DialogDescription>Add new files to your document library.</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
                 <div {...getRootProps()} className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer ${isDragActive ? 'border-primary bg-primary/10' : 'border-border'}`}>
                    <input {...getInputProps()} />
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p>Drag and drop files here, or click to browse</p>
                </div>

                {files.length > 0 && (
                    <div>
                        <h4 className="font-medium mb-2">Files to upload:</h4>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {files.map((file, i) => (
                                <div key={i} className="flex items-center justify-between p-2 bg-muted rounded-md">
                                    <span className="text-sm truncate">{file.name}</span>
                                    <Progress value={33} className="w-24" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">Link to</label>
                         <Select>
                            <SelectTrigger><SelectValue placeholder="Select Lead, Deal, or Property"/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="lead-1">Lead: Rajesh Kumar</SelectItem>
                                <SelectItem value="deal-2">Deal: Downtown Office</SelectItem>
                                <SelectItem value="prop-3">Property: Prestige Lakeside</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div>
                        <label className="text-sm font-medium">Folder</label>
                         <Select>
                            <SelectTrigger><SelectValue placeholder="Select folder"/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="folder-1">Property Documents</SelectItem>
                                <SelectItem value="folder-2">Contracts</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <DialogFooter>
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
                <Button onClick={handleUpload} disabled={files.length === 0}>Upload {files.length > 0 ? files.length : ''} file(s)</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
