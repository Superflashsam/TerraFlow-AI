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
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-2">
      {/* Zoom Controls */}
      <div className="bg-card border border-border rounded-lg shadow-sm p-1 flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomOut}
          className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"
          title="Zoom Out"
        >
          <AppIcon name="Minus" size={16} />
        </Button>
        <div className="px-2 py-1 text-xs font-medium text-center text-muted-foreground min-w-[3rem]" onClick={onZoomReset} title="Reset Zoom">
          {Math.round(zoomLevel * 100)}%
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomIn}
          className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"
          title="Zoom In"
        >
          <AppIcon name="Plus" size={16} />
        </Button>
      </div>

      {/* Canvas Controls */}
      <div className="bg-card border border-border rounded-lg shadow-sm p-1 flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onFitToScreen}
          className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"
          title="Fit to Screen"
        >
          <AppIcon name="Maximize" size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleGrid}
          className={`h-8 w-8 p-0 ${showGrid ? 'text-primary' : 'text-muted-foreground'} hover:text-foreground`}
          title="Toggle Grid"
        >
          <AppIcon name="Grid" size={16} />
        </Button>
      </div>

      {/* History Controls */}
      <div className="bg-card border border-border rounded-lg shadow-sm p-1 flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
          className="text-muted-foreground hover:text-foreground disabled:opacity-50 h-8 w-8 p-0"
          title="Undo"
        >
          <AppIcon name="Undo" size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRedo}
          disabled={!canRedo}
          className="text-muted-foreground hover:text-foreground disabled:opacity-50 h-8 w-8 p-0"
          title="Redo"
        >
          <AppIcon name="Redo" size={16} />
        </Button>
      </div>
    </div>
  );
};

export { CanvasToolbar };
