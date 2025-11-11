"use client";

import { Grid, List, Upload, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ViewMode } from "@/app/documents/page";

interface DocumentsTopBarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onUploadClick: () => void;
}

export const DocumentsTopBar = ({
  viewMode,
  onViewModeChange,
  onUploadClick,
}: DocumentsTopBarProps) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Documents</h1>
        <p className="text-sm text-muted-foreground">
          Centralized document storage and management
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-background rounded-md p-1">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-2 rounded transition-colors ${
              viewMode === "grid"
                ? "bg-card text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-2 rounded transition-colors ${
              viewMode === "list"
                ? "bg-card text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>

        {/* Action Buttons */}
        <Button onClick={onUploadClick} className="bg-primary text-primary-foreground">
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
        <Button variant="secondary">
          <FolderPlus className="h-4 w-4 mr-2" />
          New Folder
        </Button>
      </div>
    </div>
  );
};
