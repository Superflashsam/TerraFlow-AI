"use client";

import { Download, Folder, Share2, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BulkActionsBarProps {
  selectedCount: number;
  onClearSelection: () => void;
}

export const BulkActionsBar = ({ selectedCount, onClearSelection }: BulkActionsBarProps) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg shadow-lg px-6 py-4 flex items-center gap-4 z-50">
      <span className="text-sm font-medium text-foreground">
        {selectedCount} file{selectedCount > 1 ? "s" : ""} selected
      </span>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download All
        </Button>
        <Button variant="outline" size="sm">
          <Folder className="h-4 w-4 mr-2" />
          Move
        </Button>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 ml-2"
        onClick={onClearSelection}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
