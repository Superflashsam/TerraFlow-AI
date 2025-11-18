"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppIcon from '@/components/contacts/app-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type NodeType = any
type Props = { isOpen: boolean; onClose: () => void; selectedNode: NodeType | null; onUpdateNode: (id: string, node: NodeType) => void }
const NodeConfigurationPanel = ({ isOpen, onClose, selectedNode, onUpdateNode }: Props) => {
  const [nodeConfig, setNodeConfig] = useState<Record<string, any>>({});
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    if (selectedNode) {
      setNodeConfig(selectedNode.config || {});
    }
  }, [selectedNode]);

  const configTabs = [
    { id: 'general', name: 'General', icon: 'Settings' },
    { id: 'variables', name: 'Variables', icon: 'Code' },
    { id: 'conditions', name: 'Conditions', icon: 'Filter' },
    { id: 'advanced', name: 'Advanced', icon: 'Wrench' }
  ];

  const handleConfigChange = (key: string, value: any) => {
    const updatedConfig = { ...nodeConfig, [key]: value };
    setNodeConfig(updatedConfig);
    
    if (selectedNode) {
      onUpdateNode(selectedNode.id, {
        ...selectedNode,
        config: updatedConfig
      });
    }
  };

  const handleSaveConfig = () => {
    if (selectedNode) {
      onUpdateNode(selectedNode.id, {
        ...selectedNode,
        config: nodeConfig,
        status: 'configured'
      });
    }
    onClose();
  };

  const renderGeneralConfig = () => {
    if (!selectedNode) return null;

    return (
      <div className="space-y-4">
        <div>
          <Label>Node Name</Label>
          <Input
            type="text"
            value={nodeConfig.name || selectedNode.name}
            onChange={(e) => handleConfigChange('name', e.target.value)}
            placeholder="Enter node name"
          />
        </div>

        <div>
          <Label>Description</Label>
          <Input
            type="text"
            value={nodeConfig.description || selectedNode.description || ''}
            onChange={(e) => handleConfigChange('description', e.target.value)}
            placeholder="Enter node description"
          />
        </div>

        {selectedNode.type === 'trigger' && (
          <>
            <div>
              <Label>Trigger Type</Label>
              <Select
                value={nodeConfig.triggerType || 'webhook'}
                onValueChange={(value) => handleConfigChange('triggerType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select trigger type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="webhook">Webhook</SelectItem>
                  <SelectItem value="schedule">Schedule</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {nodeConfig.triggerType === 'schedule' && (
              <div>
                <Label>Schedule (Cron)</Label>
                <Input
                  type="text"
                  value={nodeConfig.schedule || ''}
                  onChange={(e) => handleConfigChange('schedule', e.target.value)}
                  placeholder="0 9 * * 1-5"
                />
                <p className="text-xs text-muted-foreground mt-1">Run every weekday at 9 AM</p>
              </div>
            )}
          </>
        )}

        {selectedNode.type === 'action' && (
          <>
            <div>
              <Label>Action Type</Label>
              <Select
                value={nodeConfig.actionType || 'send_email'}
                onValueChange={(value) => handleConfigChange('actionType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select action type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="send_email">Send Email</SelectItem>
                  <SelectItem value="create_record">Create Record</SelectItem>
                  <SelectItem value="update_record">Update Record</SelectItem>
                  <SelectItem value="api_call">API Call</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {nodeConfig.actionType === 'send_email' && (
              <>
                <div>
                  <Label>To Email</Label>
                  <Input
                    type="email"
                    value={nodeConfig.toEmail || ''}
                    onChange={(e) => handleConfigChange('toEmail', e.target.value)}
                    placeholder="recipient@example.com"
                  />
                </div>
                <div>
                  <Label>Subject</Label>
                  <Input
                    type="text"
                    value={nodeConfig.subject || ''}
                    onChange={(e) => handleConfigChange('subject', e.target.value)}
                    placeholder="Email subject"
                  />
                </div>
              </>
            )}
          </>
        )}

        {selectedNode.type === 'condition' && (
          <>
            <div>
              <Label>Condition Type</Label>
              <Select
                value={nodeConfig.conditionType || 'equals'}
                onValueChange={(value) => handleConfigChange('conditionType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equals">Equals</SelectItem>
                  <SelectItem value="contains">Contains</SelectItem>
                  <SelectItem value="greater_than">Greater Than</SelectItem>
                  <SelectItem value="less_than">Less Than</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Field to Check</Label>
              <Input
                type="text"
                value={nodeConfig.field || ''}
                onChange={(e) => handleConfigChange('field', e.target.value)}
                placeholder="email"
              />
            </div>

            <div>
              <Label>Value</Label>
              <Input
                type="text"
                value={nodeConfig.value || ''}
                onChange={(e) => handleConfigChange('value', e.target.value)}
                placeholder="Expected value"
              />
            </div>
          </>
        )}

        <div className="flex items-center space-x-2">
          <Checkbox
            id="errorHandling"
            checked={nodeConfig.errorHandling || false}
            onCheckedChange={(checked) => handleConfigChange('errorHandling', checked)}
          />
          <Label htmlFor="errorHandling">Enable Error Handling</Label>
        </div>
      </div>
    );
  };

  const renderVariablesConfig = () => {
    const variables: Array<{ name: string; value: string; type: string }> = nodeConfig.variables || [];

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">Variables</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newVariables = [...variables, { name: '', value: '', type: 'string' }];
              handleConfigChange('variables', newVariables);
            }}
          >
            <AppIcon name="Plus" className="mr-2" />
            Add Variable
          </Button>
        </div>

        {variables.length > 0 ? (
          <div className="space-y-3">
            {variables.map((variable, index) => (
              <div key={index} className="p-3 bg-muted rounded-lg">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <Label>Variable Name</Label>
                    <Input
                      type="text"
                      value={variable.name}
                      onChange={(e) => {
                        const newVariables = [...variables];
                        newVariables[index].name = e.target.value;
                        handleConfigChange('variables', newVariables);
                      }}
                      placeholder="variableName"
                    />
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Select
                      value={variable.type}
                      onValueChange={(value) => {
                        const newVariables = [...variables];
                        newVariables[index].type = value;
                        handleConfigChange('variables', newVariables);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="string">String</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="boolean">Boolean</SelectItem>
                        <SelectItem value="array">Array</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-end space-x-2">
                  <div className="flex-1">
                    <Label>Value</Label>
                    <Input
                      type="text"
                      value={variable.value}
                      onChange={(e) => {
                        const newVariables = [...variables];
                        newVariables[index].value = e.target.value;
                        handleConfigChange('variables', newVariables);
                      }}
                      placeholder="Variable value"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newVariables = variables.filter((_, i) => i !== index);
                      handleConfigChange('variables', newVariables);
                    }}
                    className="text-destructive hover:text-destructive"
                  >
                    <AppIcon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <AppIcon name="Code" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No variables defined</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add variables to pass data between nodes
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderConditionsConfig = () => {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="text-sm font-medium text-foreground mb-3">Execution Conditions</h3>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="runOnSuccess"
              checked={nodeConfig.runOnSuccess !== false}
              onCheckedChange={(checked) => handleConfigChange('runOnSuccess', checked)}
            />
            <Label htmlFor="runOnSuccess">Only run if previous node succeeded</Label>
          </div>

          <div className="flex items-center space-x-2 mt-3">
            <Checkbox
              id="runOnError"
              checked={nodeConfig.runOnError || false}
              onCheckedChange={(checked) => handleConfigChange('runOnError', checked)}
            />
            <Label htmlFor="runOnError">Run on error from previous node</Label>
          </div>

          <div className="mt-4">
            <Label>Custom Condition (JavaScript)</Label>
            <Input
              type="text"
              value={nodeConfig.customCondition || ''}
              onChange={(e) => handleConfigChange('customCondition', e.target.value)}
              placeholder="return data.status === 'active'"
            />
            <p className="text-xs text-muted-foreground mt-1">Return true to execute this node</p>
          </div>
        </div>
      </div>
    );
  };

  const renderAdvancedConfig = () => {
    return (
      <div className="space-y-4">
        <div>
          <Label>Timeout (seconds)</Label>
          <Input
            type="number"
            value={nodeConfig.timeout || 30}
            onChange={(e) => handleConfigChange('timeout', parseInt(e.target.value))}
            placeholder="30"
          />
        </div>

        <div>
          <Label>Retry Attempts</Label>
          <Input
            type="number"
            value={nodeConfig.retryAttempts || 3}
            onChange={(e) => handleConfigChange('retryAttempts', parseInt(e.target.value))}
            placeholder="3"
          />
        </div>
        
        <div>
          <Label>Priority</Label>
          <Select
            value={nodeConfig.priority || 'normal'}
            onValueChange={(value) => handleConfigChange('priority', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="enableLogging"
            checked={nodeConfig.enableLogging !== false}
            onCheckedChange={(checked) => handleConfigChange('enableLogging', checked)}
          />
          <Label htmlFor="enableLogging">Enable Logging</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="parallelExecution"
            checked={nodeConfig.parallelExecution || false}
            onCheckedChange={(checked) => handleConfigChange('parallelExecution', checked)}
          />
          <Label htmlFor="parallelExecution">Parallel Execution</Label>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralConfig();
      case 'variables':
        return renderVariablesConfig();
      case 'conditions':
        return renderConditionsConfig();
      case 'advanced':
        return renderAdvancedConfig();
      default:
        return renderGeneralConfig();
    }
  };

  if (!isOpen || !selectedNode) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
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
          className="relative w-96 bg-card border-l border-border shadow-lg flex flex-col h-full"
          initial={{ x: 384 }}
          animate={{ x: 0 }}
          exit={{ x: 384 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-lg
                ${selectedNode.color === 'emerald' ? 'bg-green-500' :
                  selectedNode.color === 'blue' ? 'bg-blue-500' :
                  selectedNode.color === 'amber' ? 'bg-amber-500' :
                  selectedNode.color === 'indigo'? 'bg-indigo-500' : 'bg-purple-500'
                }
              `}>
                <AppIcon name={selectedNode.serviceIcon} size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">{selectedNode.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedNode.service}</p>
              </div>
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

          {/* Tabs */}
          <div className="border-b border-border">
            <div className="flex">
              {configTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-3 text-sm font-medium
                    border-b-2 transition-all duration-200
                    ${activeTab === tab.id
                      ? 'text-primary border-primary' :'text-muted-foreground border-transparent hover:text-foreground'
                    }
                  `}
                >
                  <AppIcon name={tab.icon} size={16} />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {renderTabContent()}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t border-border bg-muted/30">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <AppIcon name="TestTube" className="mr-2" />
                Test
              </Button>
              <Button
                variant="default"
                onClick={handleSaveConfig}
              >
                <AppIcon name="Save" className="mr-2" />
                Save
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export { NodeConfigurationPanel };
