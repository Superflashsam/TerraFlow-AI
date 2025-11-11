"use client";

import { X, Star, Download, Folder, Trash2, FileText, Link2, Clock } from "lucide-react";
import type { Document } from "@/app/documents/page";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface DocumentDetailPanelProps {
  document: Document;
  onClose: () => void;
}

const versionHistory = [
  { version: 3, date: "Oct 17, 4:15 PM", user: "Priya Sharma", isCurrent: true },
  { version: 2, date: "Oct 16, 10:30 AM", user: "Rajesh Kumar", isCurrent: false },
  { version: 1, date: "Oct 15, 2:30 PM", user: "Priya Sharma", isCurrent: false },
];

const sharedWith = [
  { name: "Priya Sharma", role: "Owner", permission: "Can edit", avatar: "PS" },
  { name: "Rajesh Kumar", role: "Viewer", permission: "Can view", avatar: "RK" },
  { name: "Amit Patel", role: "Viewer", permission: "Can view", avatar: "AP" },
];

export const DocumentDetailPanel = ({ document, onClose }: DocumentDetailPanelProps) => {
  return (
    <div className="w-96 bg-card border-l border-border flex flex-col h-full overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Details</h2>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <Star className={`h-4 w-4 ${document.starred ? "fill-primary text-primary" : ""}`} />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Preview */}
      <div className="p-4 bg-background">
        <div className="flex items-center justify-center h-48 bg-card rounded-lg border border-border">
          <FileText className="h-20 w-20 text-muted-foreground" />
        </div>
      </div>

      {/* File Name */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-foreground mb-1">{document.name}</h3>
      </div>

      <div className="flex-1 overflow-auto px-4 pb-4 space-y-6">
        {/* Document Details */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Document Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type</span>
              <span className="text-foreground">{document.type} Document</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Size</span>
              <span className="text-foreground">{document.size}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Modified</span>
              <span className="text-foreground">{document.modified}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Uploaded by</span>
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="text-xs">
                    {document.uploadedBy.name.split(" ").map((n: string) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-foreground">{document.uploadedBy.name}</span>
              </div>
            </div>
            {document.linkedTo && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Linked to</span>
                <div className="flex items-center gap-1 text-primary">
                  <Link2 className="h-3 w-3" />
                  <span className="text-sm">{document.linkedTo.name}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Tags */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Tags</h4>
          <div className="flex flex-wrap gap-2 mb-2">
            {document.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <Input placeholder="+ Add tag" className="text-sm" />
        </div>

        <Separator />

        {/* Sharing */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Sharing & Permissions</h4>
          <div className="space-y-3 mb-3">
            {sharedWith.map((person) => (
              <div key={person.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">{person.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{person.name}</p>
                    <p className="text-xs text-muted-foreground">{person.permission}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full mb-2">
            + Add people
          </Button>
          <Button variant="outline" size="sm" className="w-full">
            Copy shareable link
          </Button>
        </div>

        <Separator />

        {/* Version History */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Version History</h4>
          <div className="space-y-3">
            {versionHistory.map((version) => (
              <div key={version.version} className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">
                      Version {version.version}
                      {version.isCurrent && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Current
                        </Badge>
                      )}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{version.date}</p>
                  <p className="text-xs text-muted-foreground">{version.user}</p>
                  {!version.isCurrent && (
                    <Button variant="link" className="p-0 h-auto text-xs mt-1">
                      Restore
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button className="w-full bg-primary text-primary-foreground">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        <Button variant="outline" className="w-full">
          <Folder className="h-4 w-4 mr-2" />
          Move to folder
        </Button>
        <Button variant="destructive" className="w-full">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
};
