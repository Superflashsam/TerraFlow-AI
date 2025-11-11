"use client";

import { useState } from "react";
import { FileText, Star, Clock, Trash2, Folder, ChevronRight, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface FolderItem {
  name: string;
  count: number;
  subfolders?: FolderItem[];
}

const quickAccessItems = [
  { icon: FileText, label: "All Documents", count: 847 },
  { icon: Star, label: "Starred", count: 23 },
  { icon: Clock, label: "Recent", count: 15 },
  { icon: Trash2, label: "Trash", count: 5 },
];

const folders: FolderItem[] = [
  {
    name: "Property Documents",
    count: 156,
    subfolders: [
      { name: "Floor Plans", count: 42 },
      { name: "Brochures", count: 38 },
      { name: "Legal", count: 29 },
      { name: "Photos", count: 47 },
    ],
  },
  {
    name: "Contracts & Agreements",
    count: 89,
    subfolders: [
      { name: "Sale Deeds", count: 24 },
      { name: "MoU", count: 18 },
      { name: "RERA Docs", count: 32 },
      { name: "Loan Documents", count: 15 },
    ],
  },
  {
    name: "Marketing Materials",
    count: 124,
    subfolders: [
      { name: "Social Media", count: 45 },
      { name: "Email Templates", count: 28 },
      { name: "WhatsApp Templates", count: 51 },
    ],
  },
  {
    name: "Client Documents",
    count: 478,
    subfolders: [
      { name: "KYC", count: 156 },
      { name: "Financial", count: 98 },
      { name: "Proposals", count: 124 },
      { name: "Site Visit Reports", count: 100 },
    ],
  },
];

const FolderTree = ({ folder, level = 0 }: { folder: FolderItem; level?: number }) => {
  const [isExpanded, setIsExpanded] = useState(level === 0);

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-card rounded-md transition-colors"
        style={{ paddingLeft: `${level * 12 + 12}px` }}
      >
        {folder.subfolders && (
          isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
        )}
        {!folder.subfolders && <div className="w-4" />}
        <Folder className="h-4 w-4" />
        <span className="flex-1 text-left">{folder.name}</span>
        <Badge variant="secondary" className="text-xs">
          {folder.count}
        </Badge>
      </button>
      {isExpanded && folder.subfolders && (
        <div className="mt-1">
          {folder.subfolders.map((subfolder) => (
            <FolderTree key={subfolder.name} folder={subfolder} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const DocumentsSidebar = () => {
  const storageUsed = 34.2;
  const storageTotal = 100;
  const storagePercent = (storageUsed / storageTotal) * 100;

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col h-full">
      {/* Quick Access */}
      <div className="p-4 border-b border-border">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Quick Access
        </h3>
        <div className="space-y-1">
          {quickAccessItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-background rounded-md transition-colors"
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1 text-left">{item.label}</span>
              <Badge variant="secondary" className="text-xs">
                {item.count}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Folders */}
      <div className="flex-1 overflow-auto p-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Folders
        </h3>
        <div className="space-y-1">
          {folders.map((folder) => (
            <FolderTree key={folder.name} folder={folder} />
          ))}
        </div>
      </div>

      {/* Storage Usage */}
      <div className="p-4 border-t border-border">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Storage Usage
        </h3>
        <Progress value={storagePercent} className="h-2 mb-2" />
        <p className="text-xs text-muted-foreground mb-3">
          {storageUsed} GB / {storageTotal} GB used
        </p>
        <Button variant="link" className="text-primary p-0 h-auto text-xs">
          Upgrade Storage
        </Button>
      </div>
    </div>
  );
};
