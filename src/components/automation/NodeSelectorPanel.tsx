"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppIcon from '@/components/contacts/app-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NodeSelectorPanel = ({ isOpen, onClose, onNodeSelect, position = { x: 0, y: 0 } }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const nodeCategories = [
    { id: 'all', name: 'All Nodes', icon: 'Grid' },
    { id: 'triggers', name: 'Triggers', icon: 'Zap' },
    { id: 'actions', name: 'Actions', icon: 'Play' },
    { id: 'conditions', name: 'Conditions', icon: 'GitBranch' },
    { id: 'integrations', name: 'Integrations', icon: 'Plug' },
    { id: 'utilities', name: 'Utilities', icon: 'Wrench' }
  ];

  const availableNodes = [
    // Triggers
    {
      id: 'terralead-trigger',
      name: 'TerraLead Trigger',
      description: 'Triggers when new leads are captured',
      category: 'triggers',
      type: 'trigger',
      service: 'TerraLead',
      serviceIcon: 'Target',
      color: 'emerald'
    },
    {
      id: 'webhook-trigger',
      name: 'Webhook Trigger',
      description: 'Triggers on incoming webhook requests',
      category: 'triggers',
      type: 'trigger',
      service: 'Webhook',
      serviceIcon: 'Webhook',
      color: 'emerald'
    },
    {
      id: 'schedule-trigger',
      name: 'Schedule Trigger',
      description: 'Triggers at specified time intervals',
      category: 'triggers',
      type: 'trigger',
      service: 'Schedule',
      serviceIcon: 'Calendar',
      color: 'emerald'
    },

    // Actions
    {
      id: 'terrascribe-content',
      name: 'TerraScribe Content',
      description: 'Generate AI-powered content',
      category: 'actions',
      type: 'action',
      service: 'TerraScribe',
      serviceIcon: 'PenTool',
      color: 'blue'
    },
    {
      id: 'gmail-send',
      name: 'Send Gmail',
      description: 'Send emails via Gmail',
      category: 'actions',
      type: 'action',
      service: 'Gmail',
      serviceIcon: 'Mail',
      color: 'blue'
    },
    {
      id: 'slack-message',
      name: 'Send Slack Message',
      description: 'Post messages to Slack channels',
      category: 'actions',
      type: 'action',
      service: 'Slack',
      serviceIcon: 'MessageSquare',
      color: 'blue'
    },

    // Conditions
    {
      id: 'filter-condition',
      name: 'Filter Condition',
      description: 'Filter data based on conditions',
      category: 'conditions',
      type: 'condition',
      service: 'Filter',
      serviceIcon: 'Filter',
      color: 'amber'
    },
    {
      id: 'branch-condition',
      name: 'Branch Condition',
      description: 'Create conditional workflow branches',
      category: 'conditions',
      type: 'condition',
      service: 'Branch',
      serviceIcon: 'GitBranch',
      color: 'amber'
    },

    // Integrations
    {
      id: 'google-sheets',
      name: 'Google Sheets',
      description: 'Read/write Google Sheets data',
      category: 'integrations',
      type: 'integration',
      service: 'Google Sheets',
      serviceIcon: 'FileSpreadsheet',
      color: 'indigo'
    },
    {
      id: 'hubspot-crm',
      name: 'HubSpot CRM',
      description: 'Manage HubSpot contacts and deals',
      category: 'integrations',
      type: 'integration',
      service: 'HubSpot',
      serviceIcon: 'Users',
      color: 'indigo'
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Integrate with Salesforce CRM',
      category: 'integrations',
      type: 'integration',
      service: 'Salesforce',
      serviceIcon: 'Building',
      color: 'indigo'
    },

    // Utilities
    {
      id: 'delay-node',
      name: 'Delay',
      description: 'Add time delays between actions',
      category: 'utilities',
      type: 'delay',
      service: 'Delay',
      serviceIcon: 'Clock',
      color: 'purple'
    },
    {
      id: 'data-transformer',
      name: 'Data Transformer',
      description: 'Transform and format data',
      category: 'utilities',
      type: 'utility',
      service: 'Transform',
      serviceIcon: 'Shuffle',
      color: 'purple'
    },
    {
      id: 'http-request',
      name: 'HTTP Request',
      description: 'Make HTTP API requests',
      category: 'utilities',
      type: 'utility',
      service: 'HTTP',
      serviceIcon: 'Globe',
      color: 'purple'
    }
  ];

  const filteredNodes = useMemo(() => {
    let nodes = availableNodes;

    // Filter by category
    if (selectedCategory !== 'all') {
      nodes = nodes.filter(node => node.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      nodes = nodes.filter(node => 
        node.name.toLowerCase().includes(query) ||
        node.description.toLowerCase().includes(query) ||
        node.service.toLowerCase().includes(query)
      );
    }

    return nodes;
  }, [selectedCategory, searchQuery]);

  const handleNodeClick = (node) => {
    onNodeSelect({
      ...node,
      id: `${node.id}-${Date.now()}`,
      position: { x: position.x, y: position.y },
      status: 'pending'
    });
    onClose();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Panel */}
        <motion.div
          className="relative w-80 bg-card border-r border-border shadow-lg flex flex-col h-full"
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          exit={{ x: -320 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Add Node</h2>
              <p className="text-sm text-muted-foreground">Choose a node to add</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <AppIcon name="X" size={20} />
            </Button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-border">
            <Input
              type="search"
              placeholder="Search nodes..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>

          {/* Categories */}
          <div className="p-4 border-b border-border">
            <div className="grid grid-cols-2 gap-2">
              {nodeCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }
                  `}
                >
                  <AppIcon name={category.icon} size={16} />
                  <span className="truncate">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Node List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {filteredNodes.length > 0 ? (
                filteredNodes.map((node) => (
                  <motion.button
                    key={node.id}
                    onClick={() => handleNodeClick(node)}
                    className="w-full p-3 bg-card border border-border rounded-lg hover:border-primary/50 hover:shadow-md transition-all duration-200 text-left"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`
                        flex items-center justify-center w-10 h-10 rounded-lg
                        ${node.color === 'emerald' ? 'bg-green-500' :
                          node.color === 'blue' ? 'bg-blue-500' :
                          node.color === 'amber' ? 'bg-amber-500' :
                          node.color === 'indigo'? 'bg-indigo-500' : 'bg-purple-500'
                        }
                      `}>
                        <AppIcon name={node.serviceIcon} size={20} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground text-sm mb-1">
                          {node.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {node.description}
                        </p>
                        <div className="flex items-center mt-2">
                          <span className="text-xs font-medium text-primary">
                            {node.service}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))
              ) : (
                <div className="text-center py-8">
                  <AppIcon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No nodes found</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your search or category filter
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export { NodeSelectorPanel };
