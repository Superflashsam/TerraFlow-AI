"use client";
import React, { useState, useCallback, useEffect, useRef } from 'react';

import { PageHeader } from "@/components/shared/page-header";
import { CanvasToolbar } from '@/components/automation/CanvasToolbar';
import { WorkflowCanvas } from '@/components/automation/WorkflowCanvas';
import { WorkflowSidebar } from '@/components/automation/WorkflowSidebar';
import { NodeConfigurationPanel } from '@/components/automation/NodeConfigurationPanel';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';


const VisualCanvasBuilder = () => {
  // Canvas state
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  
  // Workflow state
  const [workflowName, setWorkflowName] = useState("Customer Onboarding Flow");
  const [saveStatus, setSaveStatus] = useState("saved");
  const [lastSaved, setLastSaved] = useState("2 minutes ago");
  
  // Nodes and connections
  const [nodes, setNodes] = useState([
    {
      id: 'node-1',
      name: 'TerraLead Trigger',
      description: 'Triggers when new leads are captured',
      type: 'trigger',
      service: 'TerraLead',
      serviceIcon: 'Target',
      position: { x: 350, y: 200 },
      status: 'configured',
      config: {
        triggerType: 'webhook',
        name: 'New Lead Trigger'
      }
    },
    {
      id: 'node-2',
      name: 'Filter Condition',
      description: 'Filter leads by qualification criteria',
      type: 'condition',
      service: 'Filter',
      serviceIcon: 'Filter',
      position: { x: 650, y: 200 },
      status: 'configured',
      config: {
        conditionType: 'equals',
        field: 'lead_score',
        value: '80'
      }
    },
  ]);
  
  const [connections, setConnections] = useState([
    { id: 'conn-1', from: 'node-1', to: 'node-2' },
  ]);

  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  
  // Panel states
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);
  
  // History for undo/redo
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (saveStatus === 'unsaved') {
        handleSave();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [saveStatus]);

  // Canvas controls
  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.1));
  }, []);

  const handleZoomReset = useCallback(() => {
    setZoomLevel(1);
    setCanvasOffset({ x: 0, y: 0 });
  }, []);

  const handleFitToScreen = useCallback(() => {
    if (nodes.length === 0 || !canvasRef.current) return;
    
    const bounds = nodes.reduce((acc, node) => ({
      minX: Math.min(acc.minX, node.position.x),
      maxX: Math.max(acc.maxX, node.position.x + 250), // node width
      minY: Math.min(acc.minY, node.position.y),
      maxY: Math.max(acc.maxY, node.position.y + 150)  // node height
    }), {
      minX: Infinity,
      maxX: -Infinity,
      minY: Infinity,
      maxY: -Infinity
    });

    const padding = 100;
    const canvasWidth = canvasRef.current.clientWidth;
    const canvasHeight = canvasRef.current.clientHeight;
    
    const contentWidth = bounds.maxX - bounds.minX + padding * 2;
    const contentHeight = bounds.maxY - bounds.minY + padding * 2;
    
    if (contentWidth <= 0 || contentHeight <= 0) return;

    const scaleX = canvasWidth / contentWidth;
    const scaleY = canvasHeight / contentHeight;
    
    const newZoom = Math.min(scaleX, scaleY, 1.5);
    setZoomLevel(newZoom);

    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerY = (bounds.minY + bounds.maxY) / 2;
    
    const newOffsetX = canvasWidth / 2 - centerX * newZoom;
    const newOffsetY = canvasHeight / 2 - centerY * newZoom;
    
    setCanvasOffset({ x: newOffsetX, y: newOffsetY });
  }, [nodes]);

  const handleToggleGrid = useCallback(() => {
    setShowGrid(prev => !prev);
  }, []);

  // Node operations
  const handleNodeSelect = useCallback((nodeId: any) => {
    setSelectedNodeId(nodeId);
  }, []);

  const handleNodeMove = useCallback((nodeId: any, newPosition: any) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, position: newPosition }
        : node
    ));
    setSaveStatus('unsaved');
  }, []);

  const handleNodeDelete = useCallback((nodeId: any) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId));
    setConnections(prev => prev.filter(conn => 
      conn.from !== nodeId && conn.to !== nodeId
    ));
    setSelectedNodeId(null);
    setSaveStatus('unsaved');
  }, []);

  const handleNodeConnect = useCallback((nodeId: any) => {
    // Implementation for connecting nodes
    console.log('Connect node:', nodeId);
  }, []);

  const handleNodeConfigure = useCallback((nodeId: any) => {
    setSelectedNodeId(nodeId);
    setIsConfigPanelOpen(true);
  }, []);

  const handleUpdateNode = useCallback((nodeId: any, updatedNode: any) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? updatedNode : node
    ));
    setSaveStatus('unsaved');
  }, []);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData('application/json');
    if (nodeType && canvasRef.current) {
        const newNodeData = JSON.parse(nodeType);
        const rect = canvasRef.current.getBoundingClientRect();
        
        // Adjust for canvas offset and zoom
        const x = (event.clientX - rect.left - canvasOffset.x) / zoomLevel;
        const y = (event.clientY - rect.top - canvasOffset.y) / zoomLevel;

        const newNode = {
            id: `${newNodeData.id}-${Date.now()}`,
            ...newNodeData,
            position: { x, y },
            status: 'pending'
        };
        setNodes((nds) => nds.concat(newNode));
        setSaveStatus('unsaved');
    }
  };


  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleCanvasClick = useCallback((position: any) => {
    setSelectedNodeId(null);
    setIsConfigPanelOpen(false);
  }, []);

  // Save functionality
  const handleSave = useCallback(() => {
    setSaveStatus('saving');
    
    // Simulate save operation
    setTimeout(() => {
      setSaveStatus('saved');
      setLastSaved('just now');
    }, 1000);
  }, []);

  // History operations
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      // Restore previous state
    }
  }, [historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      // Restore next state
    }
  }, [historyIndex, history]);

  const selectedNode = selectedNodeId ? nodes.find(n => n.id === selectedNodeId) : null;

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title={workflowName}
        description="Build and manage automated workflows to streamline your process."
      >
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Workflows
        </Button>
      </PageHeader>

      <div className="flex flex-1 mt-4" style={{ height: 'calc(100vh - 220px)' }}>
        <WorkflowSidebar />
        <div ref={canvasRef} onDrop={handleDrop} onDragOver={handleDragOver} className="relative flex-1 bg-background overflow-hidden">
          <WorkflowCanvas
            nodes={nodes}
            connections={connections}
            selectedNodeId={selectedNodeId}
            onNodeSelect={handleNodeSelect}
            onNodeMove={handleNodeMove}
            onNodeDelete={handleNodeDelete}
            onNodeConnect={handleNodeConnect}
            onNodeConfigure={handleNodeConfigure}
            onAddNode={() => {}}
            zoomLevel={zoomLevel}
            showGrid={showGrid}
            onCanvasClick={handleCanvasClick}
            canvasOffset={canvasOffset}
            setCanvasOffset={setCanvasOffset}
          />
        </div>
      </div>
       <CanvasToolbar
          zoomLevel={zoomLevel}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onZoomReset={handleZoomReset}
          onFitToScreen={handleFitToScreen}
          onToggleGrid={handleToggleGrid}
          showGrid={showGrid}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
        />
        <NodeConfigurationPanel
          isOpen={isConfigPanelOpen}
          onClose={() => setIsConfigPanelOpen(false)}
          selectedNode={selectedNode}
          onUpdateNode={handleUpdateNode}
        />
    </div>
  );
};

export default VisualCanvasBuilder;
