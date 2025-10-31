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
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const nodeRef = useRef(null);

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

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left click
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - node.position.x,
      y: e.clientY - node.position.y
    });
    
    onSelect(node.id);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newPosition = {
      x: (e.clientX - dragStart.x) / zoomLevel,
      y: (e.clientY - dragStart.y) / zoomLevel
    };
    
    onMove(node.id, newPosition);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart, zoomLevel, handleMouseMove, handleMouseUp]);

  const handleDoubleClick = () => {
    onConfigure(node.id);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(node.id);
  };

  const handleConnectClick = (e) => {
    e.stopPropagation();
    onConnect(node.id);
  };

  return (
    <motion.div
      ref={nodeRef}
      className={`
        absolute cursor-move select-none
        ${isDragging ? 'z-50' : 'z-10'}
      `}
      style={{
        left: node.position.x,
        top: node.position.y,
        transform: `scale(${zoomLevel})`
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      {/* Node Container */}
      <div className={`
        relative bg-card border-2 rounded-xl shadow-sm
        min-w-[200px] max-w-[280px] p-4
        transition-all duration-200 hover:shadow-md
        ${isSelected 
          ? `${nodeStyle.borderColor} ring-2 ring-primary/20` 
          : 'border-border hover:border-primary/50'
        }
      `}>
        {/* Node Header */}
        <div className="flex items-center space-x-3 mb-3">
          <div className={`
            flex items-center justify-center w-10 h-10 rounded-lg
            ${nodeStyle.color}
          `}>
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

        {/* Node Description */}
        {node.description && (
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
            {node.description}
          </p>
        )}

        {/* Node Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`
              w-2 h-2 rounded-full
              ${node.status === 'configured' ? 'bg-green-500' : 
                node.status === 'error' ? 'bg-destructive' : 'bg-yellow-500'}
            `} />
            <span className="text-xs text-muted-foreground capitalize">
              {node.status || 'pending'}
            </span>
          </div>
          
          {node.executionTime && (
            <span className="text-xs text-muted-foreground">
              {node.executionTime}ms
            </span>
          )}
        </div>

        {/* Connection Points */}
        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
          <div className="w-4 h-4 bg-card border-2 border-border rounded-full hover:border-primary transition-all duration-200" />
        </div>
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
          <div className="w-4 h-4 bg-card border-2 border-border rounded-full hover:border-primary transition-all duration-200" />
        </div>

        {/* Node Actions (visible on hover/selection) */}
        {isSelected && (
          <div className="absolute -top-3 right-0 flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleConnectClick}
              className="bg-card border border-border shadow-sm text-muted-foreground hover:text-foreground"
              title="Configure Node"
            >
              <AppIcon name="Settings" size={14} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleConnectClick}
              className="bg-card border border-border shadow-sm text-muted-foreground hover:text-foreground"
              title="Add Connection"
            >
              <AppIcon name="Plus" size={14} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDeleteClick}
              className="bg-card border border-border shadow-sm text-destructive hover:text-destructive"
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
