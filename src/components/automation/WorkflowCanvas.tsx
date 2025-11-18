"use client";
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { WorkflowNode } from './WorkflowNode';
import { ConnectionLine } from './ConnectionLine';

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
  onCanvasClick,
  canvasOffset,
  setCanvasOffset
}: {
  nodes: any[],
  connections: any[],
  selectedNodeId: string | null,
  onNodeSelect: (id: string) => void,
  onNodeMove: (id: string, pos: {x: number, y: number}) => void,
  onNodeDelete: (id: string) => void,
  onNodeConnect: (id: string) => void,
  onNodeConfigure: (id: string) => void,
  onAddNode: (pos: {x: number, y: number}) => void,
  zoomLevel: number,
  showGrid: boolean,
  onCanvasClick: (pos: {x: number, y: number}) => void,
  canvasOffset: { x: number, y: number },
  setCanvasOffset: React.Dispatch<React.SetStateAction<{ x: number, y: number }>>
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 1 && !(e.button === 0 && e.metaKey)) return; 
    
    if (canvasRef.current) {
        setIsPanning(true);
        canvasRef.current.style.cursor = 'grabbing';
        setPanStart({
            x: e.clientX,
            y: e.clientY
        });
    }
  };

  const handleCanvasMouseMove = useCallback((e: MouseEvent) => {
    if (isPanning) {
        const dx = e.clientX - panStart.x;
        const dy = e.clientY - panStart.y;
        setCanvasOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
        setPanStart({ x: e.clientX, y: e.clientY });
    }
  }, [isPanning, panStart, setCanvasOffset]);

  const handleCanvasMouseUp = useCallback(() => {
    if (isPanning && canvasRef.current) {
      canvasRef.current.style.cursor = 'grab';
    }
    setIsPanning(false);
  }, [isPanning]);


  const handleCanvasClickEvent = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
        const rect = canvasRef.current!.getBoundingClientRect();
        const x = (e.clientX - rect.left - canvasOffset.x) / zoomLevel;
        const y = (e.clientY - rect.top - canvasOffset.y) / zoomLevel;
        onCanvasClick({ x, y });
    }
  };

  useEffect(() => {
    const currentCanvas = canvasRef.current;
    if (isPanning) {
      document.addEventListener('mousemove', handleCanvasMouseMove);
      document.addEventListener('mouseup', handleCanvasMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleCanvasMouseMove);
        document.removeEventListener('mouseup', handleCanvasMouseUp);
        if (currentCanvas) {
          currentCanvas.style.cursor = 'grab';
        }
      };
    }
  }, [isPanning, handleCanvasMouseMove, handleCanvasMouseUp]);

  const handleNodeDoubleClick = (nodeId: string) => {
    onNodeConfigure(nodeId);
  };

  const handleAddNodeBetween = (fromNodeId: string, toNodeId: string, position: {x: number, y: number}) => {
    onAddNode(position);
  };

  const renderGridPattern = () => {
    if (!showGrid) return null;

    const gridSize = 20; // Base grid size
    const scaledGridSize = gridSize * zoomLevel;
    
    const patternOffsetX = canvasOffset.x % scaledGridSize;
    const patternOffsetY = canvasOffset.y % scaledGridSize;

    return (
      <defs>
        <pattern
          id="grid"
          width={scaledGridSize}
          height={scaledGridSize}
          patternUnits="userSpaceOnUse"
          x={patternOffsetX}
          y={patternOffsetY}
        >
          <circle
            cx={gridSize/2}
            cy={gridSize/2}
            r="0.5"
            fill="currentColor"
            className="text-border"
          />
        </pattern>
      </defs>
    );
  };

  return (
    <div
      ref={canvasRef}
      className="w-full h-full cursor-grab"
      onMouseDown={handleCanvasMouseDown}
      onClick={handleCanvasClickEvent}
    >
        <div
          className="w-full h-full"
          style={{ 
              transform: `translate(${canvasOffset.x}px, ${canvasOffset.y}px) scale(${zoomLevel})`,
              transformOrigin: '0 0'
          }}
        >
          {showGrid &&
            <svg width="100%" height="100%" style={{position: 'absolute', top: 0, left: 0, pointerEvents: 'none'}}>
                {renderGridPattern()}
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          }
          {nodes.map((node) => (
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
          ))}

          <svg className="overflow-visible absolute top-0 left-0 pointer-events-none" width="100%" height="100%">
            {connections.map((connection) => {
              const fromNode = nodes.find(n => n.id === connection.from);
              const toNode = nodes.find(n => n.id === connection.to);
              if (!fromNode || !toNode) return null;
              
              const fromPos = { x: fromNode.position.x + 250, y: fromNode.position.y + 75 };
              const toPos = { x: toNode.position.x, y: toNode.position.y + 75 };
              
              return <ConnectionLine key={connection.id} id={connection.id} from={fromPos} to={toPos} onSelect={()=>{}} onDelete={()=>{}} onAddNode={()=>{}} />
            })}
          </svg>
        </div>
    </div>
  );
};

export { WorkflowCanvas };
