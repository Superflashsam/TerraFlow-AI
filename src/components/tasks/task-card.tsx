
"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, User, Building, MoreHorizontal, Edit, Trash2, ArrowRight } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useDrag } from 'react-dnd';

const priorityClasses = {
  high: 'border-l-task-high-priority',
  medium: 'border-l-task-medium-priority',
  low: 'border-l-task-low-priority',
};

const priorityDotClasses = {
  high: 'bg-task-high-priority',
  medium: 'bg-task-medium-priority',
  low: 'bg-task-low-priority',
};

export const TaskCard = ({ task, onClick }: { task: any, onClick: () => void }) => {
  const [formattedDate, setFormattedDate] = useState('');
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done';
  const isDone = task.status === 'done';
  
  useEffect(() => {
    // This will only run on the client, after initial hydration
    setFormattedDate(new Date(task.dueDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }));
  }, [task.dueDate]);


  return (
    <div
      ref={drag}
      onClick={onClick}
      className={`bg-task-surface border rounded-lg p-4 group relative cursor-pointer hover:bg-muted/50 transition-all ${priorityClasses[task.priority as keyof typeof priorityClasses]} border-l-2 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={isDone}
          className="mt-1 border-task-low-priority data-[state=checked]:bg-task-primary data-[state=checked]:border-task-primary"
          onClick={(e) => e.stopPropagation()} // Prevent card click
        />
        <div className="flex-1">
          <p className={`font-semibold text-sm ${isDone ? 'line-through text-task-text-secondary' : 'text-task-text-primary'}`}>
            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${priorityDotClasses[task.priority as keyof typeof priorityDotClasses]}`}></span>
            {task.title}
          </p>
          <p className="text-xs text-task-text-secondary mt-1 line-clamp-2">{task.description}</p>
          <div className="mt-3 flex items-center justify-between text-xs text-task-text-secondary">
            <div className="flex items-center gap-1">
              <Calendar className={`h-3 w-3 ${isOverdue ? 'text-task-high-priority' : ''}`} />
              <span className={isOverdue ? 'text-task-high-priority' : ''}>{formattedDate}</span>
            </div>
            {task.linkedTo && (
              <div className="flex items-center gap-1">
                {task.linkedTo.type === 'lead' ? <User className="h-3 w-3" /> : <Building className="h-3 w-3" />}
                <span>{task.linkedTo.name}</span>
              </div>
            )}
          </div>
          <div className="mt-2 flex items-center gap-2">
            {task.tags?.map((tag: string) => (
              <span key={tag} className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-[10px]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end mt-2">
        <Avatar className="h-6 w-6">
          <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
          <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:bg-muted"><Edit className="h-3 w-3" /></Button>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:bg-muted"><Trash2 className="h-3 w-3" /></Button>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:bg-muted"><ArrowRight className="h-3 w-3" /></Button>
      </div>
    </div>
  );
};
