
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Building, Tag, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const TaskPanel = ({ isOpen, onClose, task, onSave, assignees }: { isOpen: boolean, onClose: () => void, task: any, onSave: (task: any) => void, assignees: string[] }) => {

  const getInitialFormData = () => ({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'medium',
    dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    dueTime: task?.dueTime || '',
    linkedTo: task?.linkedTo || null,
    assignee: task?.assignee || { name: 'Me', avatar: '' },
    tags: task?.tags || []
  });

  const [formData, setFormData] = useState(getInitialFormData());

  useEffect(() => {
    if (isOpen) {
      setFormData(getInitialFormData());
    }
  }, [task, isOpen]);
  
  const handleSave = () => {
    onSave(formData);
  };
  
  const allTags = ["Follow-up", "Site Visit", "Urgent", "Legal", "Documentation"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l z-50 flex flex-col"
        >
          <div className="p-6 flex items-center justify-between border-b">
            <h2 className="text-lg font-semibold text-foreground">{task ? 'Edit Task' : 'Add New Task'}</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            <div>
              <Label htmlFor="title" className="text-muted-foreground">Task Title</Label>
              <Input id="title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="bg-background border-border mt-1" />
            </div>
            <div>
              <Label htmlFor="description" className="text-muted-foreground">Description</Label>
              <Textarea id="description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="bg-background border-border mt-1" rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Priority</Label>
                <Select value={formData.priority} onValueChange={v => setFormData({...formData, priority: v})}>
                  <SelectTrigger className="bg-background border-border mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                 <Label htmlFor="assignee" className="text-muted-foreground">Assign to</Label>
                <Select value={formData.assignee.name} onValueChange={v => setFormData({...formData, assignee: { name: v, avatar: ''}})}>
                  <SelectTrigger className="bg-background border-border mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Me">Me</SelectItem>
                     {assignees.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="due-date" className="text-muted-foreground">Due Date</Label>
                <Input id="due-date" type="date" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} className="bg-background border-border mt-1" />
              </div>
              <div>
                <Label htmlFor="due-time" className="text-muted-foreground">Due Time</Label>
                <Input id="due-time" type="time" value={formData.dueTime} onChange={e => setFormData({...formData, dueTime: e.target.value})} className="bg-background border-border mt-1" />
              </div>
            </div>
            <div>
              <Label className="text-muted-foreground">Link to</Label>
               <Select onValueChange={v => setFormData({...formData, linkedTo: {type: 'lead', name: v}})}>
                  <SelectTrigger className="bg-background border-border mt-1"><SelectValue placeholder="Select a Lead or Deal..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rajesh Kumar">Lead: Rajesh Kumar</SelectItem>
                    <SelectItem value="Priya Sharma">Lead: Priya Sharma</SelectItem>
                    <SelectItem value="Whitefield Villa">Deal: Whitefield Villa</SelectItem>
                  </SelectContent>
                </Select>
            </div>
            <div>
              <Label className="text-muted-foreground">Tags</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {allTags.map(tag => (
                  <Button
                    key={tag}
                    variant={formData.tags.includes(tag) ? 'secondary' : 'outline'}
                    size="sm"
                    className={`border-border ${formData.tags.includes(tag) ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground'}`}
                    onClick={() => {
                      const newTags = formData.tags.includes(tag)
                        ? formData.tags.filter((t: string) => t !== tag)
                        : [...formData.tags, tag];
                      setFormData({...formData, tags: newTags});
                    }}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="p-6 flex items-center justify-end gap-3 border-t">
            <Button variant="ghost" onClick={onClose} className="text-muted-foreground hover:text-foreground">Cancel</Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              {task ? 'Save Changes' : 'Create Task'}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
