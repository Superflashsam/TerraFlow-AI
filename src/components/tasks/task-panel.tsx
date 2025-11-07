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

  const [formData, setFormData] = useState(task || {
    title: '',
    description: '',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
    dueTime: '',
    linkedTo: null,
    assignee: { name: 'Me', avatar: '' },
    tags: []
  });

  useEffect(() => {
    setFormData(task || {
      title: '',
      description: '',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
      dueTime: '',
      linkedTo: null,
      assignee: { name: 'Me', avatar: '' },
      tags: []
    });
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
          className="fixed top-0 right-0 h-full w-full max-w-md bg-surface border-l border-white/10 shadow-lg z-50 flex flex-col font-geist"
        >
          <div className="p-6 flex items-center justify-between border-b border-white/10">
            <h2 className="text-lg font-semibold text-text-primary">{task ? 'Edit Task' : 'Add New Task'}</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-text-secondary hover:text-text-primary">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            <div>
              <Label htmlFor="title" className="text-text-secondary">Task Title</Label>
              <Input id="title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="bg-charcoal border-white/10 mt-1" />
            </div>
            <div>
              <Label htmlFor="description" className="text-text-secondary">Description</Label>
              <Textarea id="description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="bg-charcoal border-white/10 mt-1" rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-text-secondary">Priority</Label>
                <Select value={formData.priority} onValueChange={v => setFormData({...formData, priority: v})}>
                  <SelectTrigger className="bg-charcoal border-white/10 mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                 <Label htmlFor="assignee" className="text-text-secondary">Assign to</Label>
                <Select value={formData.assignee.name} onValueChange={v => setFormData({...formData, assignee: { name: v, avatar: ''}})}>
                  <SelectTrigger className="bg-charcoal border-white/10 mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Me">Me</SelectItem>
                     {assignees.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="due-date" className="text-text-secondary">Due Date</Label>
                <Input id="due-date" type="date" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} className="bg-charcoal border-white/10 mt-1" />
              </div>
              <div>
                <Label htmlFor="due-time" className="text-text-secondary">Due Time</Label>
                <Input id="due-time" type="time" value={formData.dueTime} onChange={e => setFormData({...formData, dueTime: e.target.value})} className="bg-charcoal border-white/10 mt-1" />
              </div>
            </div>
            <div>
              <Label className="text-text-secondary">Link to</Label>
               <Select onValueChange={v => setFormData({...formData, linkedTo: {type: 'lead', name: v}})}>
                  <SelectTrigger className="bg-charcoal border-white/10 mt-1"><SelectValue placeholder="Select a Lead or Deal..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rajesh Kumar">Lead: Rajesh Kumar</SelectItem>
                    <SelectItem value="Priya Sharma">Lead: Priya Sharma</SelectItem>
                    <SelectItem value="Whitefield Villa">Deal: Whitefield Villa</SelectItem>
                  </SelectContent>
                </Select>
            </div>
            <div>
              <Label className="text-text-secondary">Tags</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {allTags.map(tag => (
                  <Button
                    key={tag}
                    variant={formData.tags.includes(tag) ? 'secondary' : 'outline'}
                    size="sm"
                    className={`border-white/10 ${formData.tags.includes(tag) ? 'bg-primary text-black' : 'bg-surface text-text-secondary'}`}
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
          <div className="p-6 flex items-center justify-end gap-3 border-t border-white/10">
            <Button variant="ghost" onClick={onClose} className="text-text-secondary hover:text-text-primary">Cancel</Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-black font-semibold">
              {task ? 'Save Changes' : 'Create Task'}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
