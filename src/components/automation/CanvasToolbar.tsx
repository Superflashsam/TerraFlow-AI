"use client";
import React from 'react';
import AppIcon from '@/components/contacts/app-icon';
import { Button } from '@/components/ui/button';

const CanvasToolbar = ({ 
  zoomLevel, 
  onZoomIn, 
  onZoomOut, 
  onZoomReset, 
  onFitToScreen,
  onToggleGrid,
  showGrid = true,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false
}) => {
  return (
    <div className="absolute top-4 right-4 z-50 flex flex-col space-y-2">
      {/* Zoom Controls */}
      <div className="bg-card border border-border rounded-lg shadow-sm p-2">
        <div className="flex flex-col space-y-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onZoomIn}
            className="text-muted-foreground hover:text-foreground"
            title="Zoom In"
          >
            <AppIcon name="Plus" size={16} />
          </Button>
          <div className="px-2 py-1 text-xs font-medium text-center text-muted-foreground min-w-[3rem]">
            {Math.round(zoomLevel * 100)}%
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onZoomOut}
            className="text-muted-foreground hover:text-foreground"
            title="Zoom Out"
          >
            <AppIcon name="Minus" size={16} />
          </Button>
        </div>
      </div>

      {/* Canvas Controls */}
      <div className="bg-card border border-border rounded-lg shadow-sm p-2">
        <div className="flex flex-col space-y-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onFitToScreen}
            className="text-muted-foreground hover:text-foreground"
            title="Fit to Screen"
          >
            <AppIcon name="Maximize" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onZoomReset}
            className="text-muted-foreground hover:text-foreground"
            title="Reset Zoom"
          >
            <AppIcon name="RotateCcw" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleGrid}
            className={`${showGrid ? 'text-primary' : 'text-muted-foreground'} hover:text-foreground`}
            title="Toggle Grid"
          >
            <AppIcon name={showGrid ? "Grid" : "Grid"} size={16} />
          </Button>
        </div>
      </div>

      {/* History Controls */}
      <div className="bg-card border border-border rounded-lg shadow-sm p-2">
        <div className="flex flex-col space-y-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onUndo}
            disabled={!canUndo}
            className="text-muted-foreground hover:text-foreground disabled:opacity-50"
            title="Undo"
          >
            <AppIcon name="Undo" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRedo}
            disabled={!canRedo}
            className="text-muted-foreground hover:text-foreground disabled:opacity-50"
            title="Redo"
          >
            <AppIcon name="Redo" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export { CanvasToolbar };
