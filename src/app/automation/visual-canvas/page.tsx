"use client";
import React, { useState, useCallback, useEffect } from 'react';

import { PageHeader } from "@/components/shared/page-header";
import { CanvasToolbar } from '@/components/automation/CanvasToolbar';
import { WorkflowCanvas } from '@/components/automation/WorkflowCanvas';
import { NodeSelectorPanel } from '@/components/automation/NodeSelectorPanel';
import { NodeConfigurationPanel } from '@/components/automation/NodeConfigurationPanel';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';


const VisualCanvasBuilder = ({ onBack }: { onBack: () => void }) => {
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
      color: 'emerald',
      position: { x: 100, y: 200 },
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
      color: 'amber',
      position: { x: 400, y: 200 },
      status: 'configured',
      config: {
        conditionType: 'equals',
        field: 'lead_score',
        value: '80'
      }
    },
    {
      id: 'node-3',
      name: 'Send Welcome Email',
      description: 'Send personalized welcome email to qualified leads',
      type: 'action',
      service: 'Gmail',
      serviceIcon: 'Mail',
      color: 'blue',
      position: { x: 700, y: 150 },
      status: 'pending',
      config: {
        actionType: 'send_email',
        toEmail: '{{lead.email}}',
        subject: 'Welcome to SmartFlow Studio!'
      }
    },
    {
      id: 'node-4',
      name: 'Create HubSpot Contact',
      description: 'Add qualified lead to HubSpot CRM',
      type: 'action',
      service: 'HubSpot',
      serviceIcon: 'Users',
      color: 'blue',
      position: { x: 700, y: 300 },
      status: 'configured',
      config: {
        actionType: 'create_record',
        recordType: 'contact'
      }
    }
  ]);
  
  const [connections, setConnections] = useState([
    { id: 'conn-1', from: 'node-1', to: 'node-2' },
    { id: 'conn-2', from: 'node-2', to: 'node-3' },
    { id: 'conn-3', from: 'node-2', to: 'node-4' }
  ]);
  
  // Panel states
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);
  const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);
  const [nodeSelectorPosition, setNodeSelectorPosition] = useState({ x: 0, y: 0 });
  
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
  }, []);

  const handleFitToScreen = useCallback(() => {
    // Calculate bounds of all nodes
    if (nodes.length === 0) return;
    
    const bounds = nodes.reduce((acc, node) => ({
      minX: Math.min(acc.minX, node.position.x),
      maxX: Math.max(acc.maxX, node.position.x + 200),
      minY: Math.min(acc.minY, node.position.y),
      maxY: Math.max(acc.maxY, node.position.y + 100)
    }), {
      minX: Infinity,
      maxX: -Infinity,
      minY: Infinity,
      maxY: -Infinity
    });

    const padding = 100;
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight - 200; // Account for headers
    
    const contentWidth = bounds.maxX - bounds.minX + padding * 2;
    const contentHeight = bounds.maxY - bounds.minY + padding * 2;
    
    const scaleX = canvasWidth / contentWidth;
    const scaleY = canvasHeight / contentHeight;
    
    setZoomLevel(Math.min(scaleX, scaleY, 1));
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

  const handleAddNode = useCallback((position: any) => {
    setNodeSelectorPosition(position);
    setIsNodeSelectorOpen(true);
  }, []);

  const handleNodeSelectFromPanel = useCallback((newNode: any) => {
    setNodes(prev => [...prev, newNode]);
    setSaveStatus('unsaved');
    setIsNodeSelectorOpen(false);
  }, []);

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
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Workflows
        </Button>
      </PageHeader>

      {/* Main Canvas Area */}
      <div className="relative flex-1 mt-4" style={{ height: 'calc(100vh - 280px)' }}>
        {/* Canvas */}
        <WorkflowCanvas
          nodes={nodes}
          connections={connections}
          selectedNodeId={selectedNodeId}
          onNodeSelect={handleNodeSelect}
          onNodeMove={handleNodeMove}
          onNodeDelete={handleNodeDelete}
          onNodeConnect={handleNodeConnect}
          onNodeConfigure={handleNodeConfigure}
          onAddNode={handleAddNode}
          zoomLevel={zoomLevel}
          showGrid={showGrid}
          onCanvasClick={handleCanvasClick}
        />

        {/* Canvas Toolbar */}
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

        {/* Node Selector Panel */}
        <NodeSelectorPanel
          isOpen={isNodeSelectorOpen}
          onClose={() => setIsNodeSelectorOpen(false)}
          onNodeSelect={handleNodeSelectFromPanel}
          position={nodeSelectorPosition}
        />

        {/* Node Configuration Panel */}
        <NodeConfigurationPanel
          isOpen={isConfigPanelOpen}
          onClose={() => setIsConfigPanelOpen(false)}
          selectedNode={selectedNode}
          onUpdateNode={handleUpdateNode}
        />
      </div>
    </div>
  );
};

export default VisualCanvasBuilder;
