"use client";

import { useState } from "react";
import { Upload, X, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload?: (files: File[]) => void;
}

export const UploadModal = ({ isOpen, onClose, onUpload }: UploadModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };
  
  const handleUpload = () => {
    if (onUpload) {
      onUpload(files);
    }
    setFiles([]);
    onClose();
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card">
        <DialogHeader>
          <DialogTitle>Upload Documents</DialogTitle>
          <DialogDescription>
            Upload files and link them to leads, deals, or properties
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium text-foreground mb-2">
              Drag files here or click to browse
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Support for PDF, Word, Excel, Images, and more
            </p>
            <Input
              type="file"
              multiple
              className="hidden"
              id="file-upload"
              onChange={handleFileSelect}
            />
            <Button variant="outline" asChild>
                <Label htmlFor="file-upload" className="cursor-pointer">Browse Files</Label>
            </Button>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Selected Files</h4>
              <div className="space-y-2 max-h-48 overflow-auto">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border"
                  >
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Options */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="link-to">Link to</Label>
              <Select>
                <SelectTrigger id="link-to" className="bg-background">
                  <SelectValue placeholder="Select Lead, Deal, or Property" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead1">Rajesh Kumar (Lead)</SelectItem>
                  <SelectItem value="deal1">Prestige Lakeside Deal</SelectItem>
                  <SelectItem value="property1">Brigade Property</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tags">Add tags</Label>
              <Input
                id="tags"
                placeholder="Enter tags separated by commas"
                className="bg-background"
              />
            </div>

            <div>
              <Label htmlFor="folder">Folder</Label>
              <Select>
                <SelectTrigger id="folder" className="bg-background">
                  <SelectValue placeholder="Select folder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="property">Property Documents</SelectItem>
                  <SelectItem value="contracts">Contracts & Agreements</SelectItem>
                  <SelectItem value="marketing">Marketing Materials</SelectItem>
                  <SelectItem value="client">Client Documents</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} className="bg-primary text-primary-foreground" disabled={files.length === 0}>
            <Upload className="h-4 w-4 mr-2" />
            Upload {files.length > 0 && `${files.length} file${files.length > 1 ? "s" : ""}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
