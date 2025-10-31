"use client";
import React, { useState, useRef, useCallback, useEffect } from 'react';

import { WorkflowNode } from './WorkflowNode';
import { ConnectionLine } from './ConnectionLine';
import { Button } from '@/components/ui/button';
import AppIcon from '../contacts/app-icon';

const WorkflowCanvas = ({
  nodes,
  connections,
  selectedNodeId,
  onNodeSelect,
  onNodeMove,
  onNodeDelete,
  onNodeConnect,
  onNodeConfigure,
  onAddNode,
  zoomLevel,
  showGrid,
  onCanvasClick
}) => {
  const canvasRef = useRef(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [draggedConnection, setDraggedConnection] = useState(null);

  const handleCanvasMouseDown = (e) => {
    if (e.button !== 0) return; // Only left click
    
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    // Check if clicking on empty canvas
    if (e.target === canvasRef.current || e.target.classList.contains('canvas-background')) {
      setIsPanning(true);
      setPanStart({
        x: e.clientX - canvasOffset.x,
        y: e.clientY - canvasOffset.y
      });
      onCanvasClick({ x: clickX, y: clickY });
    }
  };

  const handleCanvasMouseMove = useCallback((e) => {
    if (isPanning) {
      setCanvasOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    }
  }, [isPanning, panStart]);

  const handleCanvasMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  useEffect(() => {
    if (isPanning) {
      document.addEventListener('mousemove', handleCanvasMouseMove);
      document.addEventListener('mouseup', handleCanvasMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleCanvasMouseMove);
        document.removeEventListener('mouseup', handleCanvasMouseUp);
      };
    }
  }, [isPanning, handleCanvasMouseMove, handleCanvasMouseUp]);

  const handleNodeDoubleClick = (nodeId) => {
    onNodeConfigure(nodeId);
  };

  const handleAddNodeBetween = (fromNodeId, toNodeId, position) => {
    onAddNode(position);
  };

  const getConnectionPath = (from, to) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const controlPointOffset = Math.abs(dx) * 0.5;
    
    return `M ${from.x} ${from.y} C ${from.x + controlPointOffset} ${from.y}, ${to.x - controlPointOffset} ${to.y}, ${to.x} ${to.y}`;
  };

  const renderGridPattern = () => {
    if (!showGrid) return null;

    const gridSize = 20 * zoomLevel;
    const offsetX = canvasOffset.x % gridSize;
    const offsetY = canvasOffset.y % gridSize;

    return (
      <defs>
        <pattern
          id="grid"
          width={gridSize}
          height={gridSize}
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <circle
            cx={gridSize / 2}
            cy={gridSize / 2}
            r="1"
            fill="currentColor"
            className="text-border opacity-40"
          />
        </pattern>
      </defs>
    );
  };

  const renderConnections = () => {
    return connections.map((connection) => {
      const fromNode = nodes.find(n => n.id === connection.from);
      const toNode = nodes.find(n => n.id === connection.to);
      
      if (!fromNode || !toNode) return null;

      const fromPos = {
        x: fromNode.position.x + 200, // Node width
        y: fromNode.position.y + 50   // Half node height
      };
      
      const toPos = {
        x: toNode.position.x,
        y: toNode.position.y + 50
      };

      return (
        <ConnectionLine
          key={connection.id}
          id={connection.id}
          from={fromPos}
          to={toPos}
          isSelected={false}
          onSelect={() => {}}
          onDelete={() => {}}
          onAddNode={(position) => handleAddNodeBetween(connection.from, connection.to, position)}
        />
      );
    });
  };

  const renderNodes = () => {
    return nodes.map((node) => (
      <WorkflowNode
        key={node.id}
        node={node}
        isSelected={selectedNodeId === node.id}
        onSelect={onNodeSelect}
        onMove={onNodeMove}
        onDelete={onNodeDelete}
        onConnect={onNodeConnect}
        onConfigure={onNodeConfigure}
        zoomLevel={zoomLevel}
      />
    ));
  };

  return (
    <div
      ref={canvasRef}
      className={`
        relative w-full h-full overflow-hidden bg-background
        ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}
      `}
      onMouseDown={handleCanvasMouseDown}
      style={{
        transform: `translate(${canvasOffset.x}px, ${canvasOffset.y}px) scale(${zoomLevel})`
      }}
    >
      {/* Grid Background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none canvas-background"
        style={{ transform: `scale(${1/zoomLevel})` }}
      >
        {renderGridPattern()}
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Connections Layer */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ 
          transform: `translate(${-canvasOffset.x}px, ${-canvasOffset.y}px) scale(${1/zoomLevel})`,
          transformOrigin: '0 0'
        }}
      >
        {renderConnections()}
      </svg>

      {/* Nodes Layer */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translate(${-canvasOffset.x}px, ${-canvasOffset.y}px) scale(${1/zoomLevel})`,
          transformOrigin: '0 0'
        }}
      >
        {renderNodes()}
      </div>

      {/* Empty State */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Start Building Your Workflow
            </h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Click anywhere on the canvas to add your first node and begin creating your automation workflow.
            </p>
            <Button
              variant="default"
              onClick={() => onAddNode({ x: 400, y: 200 })}
              className="pointer-events-auto"
            >
              <AppIcon name="Plus" className="mr-2" />
              Add First Node
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export { WorkflowCanvas };
