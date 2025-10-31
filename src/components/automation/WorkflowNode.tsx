"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import AppIcon from '@/components/contacts/app-icon';
import { Button } from '@/components/ui/button';

const WorkflowNode = ({ 
  node, 
  isSelected = false, 
  onSelect, 
  onMove, 
  onDelete,
  onConnect,
  onConfigure,
  zoomLevel = 1
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  
  const nodeTypes = {
    trigger: {
      color: 'bg-green-500',
      textColor: 'text-white',
      borderColor: 'border-green-500',
      icon: 'Zap'
    },
    action: {
      color: 'bg-blue-500',
      textColor: 'text-white',
      borderColor: 'border-blue-500',
      icon: 'Play'
    },
    condition: {
      color: 'bg-amber-500',
      textColor: 'text-white',
      borderColor: 'border-amber-500',
      icon: 'GitBranch'
    },
    delay: {
      color: 'bg-purple-500',
      textColor: 'text-white',
      borderColor: 'border-purple-500',
      icon: 'Clock'
    },
    integration: {
      color: 'bg-indigo-500',
      textColor: 'text-white',
      borderColor: 'border-indigo-500',
      icon: 'Plug'
    }
  };

  const nodeStyle = nodeTypes[node.type] || nodeTypes.action;

  const handleMouseDown = (e: React.MouseEvent) => {
    // Check if the click is on the node itself and not on a button
    if (e.button !== 0 || (e.target as HTMLElement).closest('button')) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    onSelect(node.id);
    
    const startPos = { x: e.clientX, y: e.clientY };
    const startNodePos = { ...node.position };

    const handleMouseMove = (moveEvent: MouseEvent) => {
        const dx = (moveEvent.clientX - startPos.x) / zoomLevel;
        const dy = (moveEvent.clientY - startPos.y) / zoomLevel;
        onMove(node.id, { x: startNodePos.x + dx, y: startNodePos.y + dy });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleDoubleClick = () => {
    onConfigure(node.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(node.id);
  };

  const handleConnectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onConnect(node.id);
  };
  
  const handleConfigureClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onConfigure(node.id);
  };

  return (
    <motion.div
      ref={nodeRef}
      className={`absolute cursor-grab select-none ${isDragging ? 'z-50 cursor-grabbing' : 'z-10'}`}
      style={{
        left: node.position.x,
        top: node.position.y,
        width: 250,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <div className={`
        relative bg-card border-2 rounded-xl shadow-sm
        p-4 transition-all duration-200 hover:shadow-md
        ${isSelected 
          ? `${nodeStyle.borderColor} ring-2 ring-primary/20` 
          : 'border-border hover:border-primary/50'
        }
      `}>
        {/* Node Header */}
        <div className="flex items-center space-x-3 mb-3">
          <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${nodeStyle.color}`}>
            <AppIcon 
              name={node.serviceIcon || nodeStyle.icon} 
              size={20} 
              className={nodeStyle.textColor}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-sm truncate">
              {node.name}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {node.service || node.type}
            </p>
          </div>
        </div>

        {node.description && (
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2 h-8">
            {node.description}
          </p>
        )}

        {/* Node Status */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${node.status === 'configured' ? 'bg-green-500' : node.status === 'error' ? 'bg-destructive' : 'bg-yellow-500'}`} />
            <span className="capitalize">{node.status || 'pending'}</span>
          </div>
          
          {node.executionTime && (
            <span>{node.executionTime}ms</span>
          )}
        </div>

        {/* Connection Points */}
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-card border-2 border-border rounded-full hover:border-primary transition-all duration-200 pointer-events-auto" />
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-card border-2 border-border rounded-full hover:border-primary transition-all duration-200 pointer-events-auto" />

        {/* Node Actions (visible on hover/selection) */}
        {isSelected && (
          <div className="absolute -top-3 -right-3 flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleConfigureClick}
              className="h-7 w-7 bg-card border border-border shadow-sm text-muted-foreground hover:text-foreground"
              title="Configure Node"
            >
              <AppIcon name="Settings" size={14} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleConnectClick}
              className="h-7 w-7 bg-card border border-border shadow-sm text-muted-foreground hover:text-foreground"
              title="Add Connection"
            >
              <AppIcon name="Plus" size={14} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDeleteClick}
              className="h-7 w-7 bg-card border border-border shadow-sm text-destructive hover:text-destructive"
              title="Delete Node"
            >
              <AppIcon name="Trash2" size={14} />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export { WorkflowNode };
