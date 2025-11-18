"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import AppIcon from '@/components/contacts/app-icon';

type Point = { x: number; y: number }
type Props = {
  id: string;
  from: Point;
  to: Point;
  isSelected?: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onAddNode: (at: Point) => void;
  status?: 'idle' | 'active' | 'error' | 'success';
}

const ConnectionLine = ({ 
  id, 
  from, 
  to, 
  isSelected = false, 
  onSelect, 
  onDelete, 
  onAddNode,
  status = 'idle'
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const getConnectionPath = () => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const controlPointOffset = Math.abs(dx) * 0.4;
    
    return `M ${from.x} ${from.y} C ${from.x + controlPointOffset} ${from.y}, ${to.x - controlPointOffset} ${to.y}, ${to.x} ${to.y}`;
  };

  const getMidPoint = () => {
    return {
      x: (from.x + to.x) / 2,
      y: (from.y + to.y) / 2
    };
  };

  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'stroke-primary';
      case 'error':
        return 'stroke-destructive';
      case 'success':
        return 'stroke-green-500';
      default:
        return 'stroke-border';
    }
  };

  const midPoint = getMidPoint();

  return (
    <g>
      {/* Connection Path */}
      <motion.path
        d={getConnectionPath()}
        fill="none"
        strokeWidth={isSelected ? "3" : "2"}
        className={`
          transition-all duration-200 cursor-pointer
          ${getStatusColor()}
          ${isHovered ? 'stroke-primary' : ''}
          ${isSelected ? 'stroke-primary' : ''}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onSelect(id)}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Connection Highlight (for better visibility) */}
      <path
        d={getConnectionPath()}
        fill="none"
        strokeWidth="8"
        className="stroke-transparent cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onSelect(id)}
      />

      {/* Arrow Head */}
      <defs>
        <marker
          id={`arrowhead-${id}`}
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            className={getStatusColor()}
            fill="currentColor"
          />
        </marker>
      </defs>

      <path
        d={getConnectionPath()}
        fill="none"
        strokeWidth="2"
        className={getStatusColor()}
        markerEnd={`url(#arrowhead-${id})`}
        pointerEvents="none"
      />

      {/* Status Indicator */}
      {status === 'active' && (
        <motion.circle
          cx={from.x}
          cy={from.y}
          r="4"
          className="fill-primary"
          animate={{
            cx: [from.x, to.x],
            cy: [from.y, to.y]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}

      {/* Add Node Button (visible on hover) */}
      {(isHovered || isSelected) && (
        <foreignObject
          x={midPoint.x - 12}
          y={midPoint.y - 12}
          width="24"
          height="24"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onAddNode(midPoint);
            }}
            className="w-6 h-6 bg-card border border-border shadow-md text-muted-foreground hover:text-foreground hover:border-primary"
            title="Add Node"
          >
            <AppIcon name="Plus" size={12} />
          </Button>
        </foreignObject>
      )}

      {/* Delete Button (visible when selected) */}
      {isSelected && (
        <foreignObject
          x={midPoint.x + 16}
          y={midPoint.y - 12}
          width="24"
          height="24"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            className="w-6 h-6 bg-card border border-border shadow-md text-destructive hover:text-destructive hover:border-destructive"
            title="Delete Connection"
          >
            <AppIcon name="Trash2" size={12} />
          </Button>
        </foreignObject>
      )}
    </g>
  );
};

export { ConnectionLine };
