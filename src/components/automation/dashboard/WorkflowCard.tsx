"use client";
import React, { useState } from 'react';
import AppIcon from '@/components/contacts/app-icon';
import { Button } from '@/components/ui/button';

const WorkflowCard = ({ workflow, onEdit, onDuplicate, onDelete, onToggleStatus, onViewAnalytics, isSelected, onSelect }: {
    workflow: any;
    onEdit: (workflow: any) => void;
    onDuplicate: (workflow: any) => void;
    onDelete: (workflow: any) => void;
    onToggleStatus: (workflow: any) => void;
    onViewAnalytics: (workflow: any) => void;
    isSelected: boolean;
    onSelect: (id: number) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500 text-green-50';
      case 'paused':
        return 'bg-yellow-500 text-yellow-50';
      case 'draft':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return 'Play';
      case 'paused':
        return 'Pause';
      case 'draft':
        return 'FileText';
      default:
        return 'FileText';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatExecutions = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div
      className={`
        relative bg-card border border-border rounded-lg p-6 transition-all duration-200 cursor-pointer
        hover:shadow-lg hover:border-primary/20
        ${isSelected ? 'ring-2 ring-primary border-primary' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(workflow.id)}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-4 left-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onSelect(workflow.id);
          }}
          className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
        />
      </div>

      {/* Quick Actions - Show on Hover */}
      {isHovered && (
        <div className="absolute top-4 right-4 flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            iconName="Edit"
            iconSize={16}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(workflow);
            }}
            className="w-8 h-8 text-muted-foreground hover:text-foreground bg-background/80 backdrop-blur-sm"
          />
          <Button
            variant="ghost"
            size="icon"
            iconName="Copy"
            iconSize={16}
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate(workflow);
            }}
            className="w-8 h-8 text-muted-foreground hover:text-foreground bg-background/80 backdrop-blur-sm"
          />
          <Button
            variant="ghost"
            size="icon"
            iconName="BarChart3"
            iconSize={16}
            onClick={(e) => {
              e.stopPropagation();
              onViewAnalytics(workflow);
            }}
            className="w-8 h-8 text-muted-foreground hover:text-foreground bg-background/80 backdrop-blur-sm"
          />
          <Button
            variant="ghost"
            size="icon"
            iconName="Trash2"
            iconSize={16}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(workflow);
            }}
            className="w-8 h-8 text-muted-foreground hover:text-destructive bg-background/80 backdrop-blur-sm"
          />
        </div>
      )}

      {/* Workflow Thumbnail */}
      <div className="mb-4 mt-6">
        <div className="w-full h-24 bg-muted rounded-md flex items-center justify-center overflow-hidden">
          {workflow.thumbnail ? (
            <img
              src={workflow.thumbnail}
              alt={`${workflow.name} workflow preview`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <AppIcon name="GitBranch" size={20} />
              <span className="text-sm">Workflow Preview</span>
            </div>
          )}
        </div>
      </div>

      {/* Workflow Info */}
      <div className="space-y-3">
        {/* Name and Status */}
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-foreground truncate pr-2">
            {workflow.name}
          </h3>
          <span className={`
            inline-flex items-center px-2 py-1 text-xs font-medium rounded-full
            ${getStatusColor(workflow.status)}
          `}>
            <AppIcon name={getStatusIcon(workflow.status)} size={12} className="mr-1" />
            {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
          </span>
        </div>

        {/* Description */}
        {workflow.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {workflow.description}
          </p>
        )}

        {/* Tags */}
        {workflow.tags && workflow.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {workflow.tags.slice(0, 3).map((tag: any, index: number) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground rounded-full"
              >
                {tag}
              </span>
            ))}
            {workflow.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                +{workflow.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <AppIcon name="Play" size={14} />
              <span>{formatExecutions(workflow.executions)} runs</span>
            </div>
            <div className="flex items-center space-x-1">
              <AppIcon name="Clock" size={14} />
              <span>{formatDate(workflow.lastModified)}</span>
            </div>
          </div>
          
          {/* Status Toggle */}
          <Button
            variant="ghost"
            size="sm"
            iconName={workflow.status === 'active' ? 'Pause' : 'Play'}
            iconSize={14}
            onClick={(e) => {
              e.stopPropagation();
              onToggleStatus(workflow);
            }}
            className="text-muted-foreground hover:text-foreground"
          />
        </div>
      </div>
    </div>
  );
};

export { WorkflowCard };
