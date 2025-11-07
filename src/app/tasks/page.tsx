"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clipboard, Calendar, AlertCircle, CheckCircle, Search, LayoutGrid, List, KanbanSquare } from 'lucide-react';
import { initialTasks } from '@/lib/placeholder-data';
import { TaskCard } from '@/components/tasks/task-card';
import { TaskPanel } from '@/components/tasks/task-panel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const TaskMetricCard = ({ icon: Icon, title, value, badge, badgeColor }: { icon: React.ElementType, title: string, value: string, badge?: string, badgeColor?: string }) => (
  <div className="bg-card rounded-lg p-4 flex items-center justify-between border">
    <div>
      <p className="text-muted-foreground text-sm">{title}</p>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
    <div className="flex flex-col items-end">
      <Icon className="h-6 w-6 text-muted-foreground mb-1" />
      {badge && <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${badgeColor}`}>{badge}</span>}
    </div>
  </div>
);

const TaskColumn = ({ title, tasks, status, moveTask, onTaskClick }: { title: string, tasks: any[], status: string, moveTask: Function, onTaskClick: Function }) => {
  const [{ isOver }, drop] = React.useState({ isOver: false }); // DND state placeholders

  return (
    <div ref={drop} className={`bg-muted/50 rounded-xl flex flex-col h-full transition-colors ${isOver ? 'bg-primary/10' : ''}`}>
      <div className="p-4 border-b">
        <h2 className="font-semibold text-foreground">{title} <span className="text-sm text-muted-foreground">{tasks.length}</span></h2>
      </div>
      <div className="p-4 space-y-3 overflow-y-auto flex-1">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
        ))}
      </div>
    </div>
  );
};


export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [viewMode, setViewMode] = useState('board');
  const [filters, setFilters] = useState({
    search: '',
    priority: 'all',
    status: 'all',
    assignee: 'all'
  });
  const [sort, setSort] = useState('due-date');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTask = () => {
    setSelectedTask(null);
    setIsPanelOpen(true);
  };
  
  const handleEditTask = (task: any) => {
    setSelectedTask(task);
    setIsPanelOpen(true);
  };

  const handleSaveTask = (taskData: any) => {
    if (selectedTask) {
      setTasks(tasks.map(t => t.id === taskData.id ? taskData : t));
    } else {
      setTasks([...tasks, { ...taskData, id: `T-${tasks.length + 1}` }]);
    }
    setIsPanelOpen(false);
  };

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      const searchLower = filters.search.toLowerCase();
      return (
        (task.title.toLowerCase().includes(searchLower) || task.description.toLowerCase().includes(searchLower)) &&
        (filters.priority === 'all' || task.priority === filters.priority) &&
        (filters.status === 'all' || task.status === filters.status) &&
        (filters.assignee === 'all' || task.assignee.name === filters.assignee)
      );
    });

    filtered.sort((a, b) => {
      if (sort === 'due-date') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (sort === 'priority') {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
      }
      if (sort === 'created-date') {
        return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
      }
      return 0;
    });

    return filtered;
  }, [tasks, filters, sort]);

  const moveTask = useCallback((taskId: string, newStatus: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  }, []);

  const metrics = {
    total: tasks.length,
    dueToday: tasks.filter(t => new Date(t.dueDate).toDateString() === new Date().toDateString() && t.status !== 'done').length,
    overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'done').length,
    completedThisWeek: tasks.filter(t => t.status === 'done').length // Simplified
  };
  
  const assignees = [...new Set(tasks.map(t => t.assignee.name))];


  return (
     <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-full">
        {/* Top Bar */}
        <div className="p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tasks</h1>
            <p className="text-muted-foreground">Manage your daily tasks and follow-ups</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-muted p-1 rounded-lg">
              <Button variant={viewMode === 'board' ? "secondary" : "ghost"} size="sm" onClick={() => setViewMode('board')}><KanbanSquare className="mr-2 h-4 w-4"/>Board View</Button>
              <Button variant={viewMode === 'list' ? "secondary" : "ghost"} size="sm" onClick={() => setViewMode('list')}><List className="mr-2 h-4 w-4"/>List View</Button>
              <Button variant={viewMode === 'calendar' ? "secondary" : "ghost"} size="sm" onClick={() => setViewMode('calendar')}><Calendar className="mr-2 h-4 w-4"/>Calendar View</Button>
            </div>
            <Button onClick={handleAddTask} variant="success">Add Task</Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <TaskMetricCard icon={Clipboard} title="Total Tasks" value={metrics.total.toString()} />
          <TaskMetricCard icon={Calendar} title="Due Today" value={metrics.dueToday.toString()} badge="Urgent" badgeColor="bg-yellow-500/20 text-yellow-500" />
          <TaskMetricCard icon={AlertCircle} title="Overdue" value={metrics.overdue.toString()} badge={`${metrics.overdue} Overdue`} badgeColor="bg-destructive/20 text-destructive" />
          <TaskMetricCard icon={CheckCircle} title="Completed This Week" value={metrics.completedThisWeek.toString()} badge="+15%" badgeColor="bg-green-500/20 text-green-500" />
        </div>

        {/* Filter/Sort Bar */}
        <div className="p-6 flex items-center gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search tasks, assignees..." 
              className="bg-muted border-border pl-10 placeholder:text-muted-foreground"
              value={filters.search}
              onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
            />
          </div>
          <Select value={filters.priority} onValueChange={(v) => setFilters(f => ({ ...f, priority: v }))}>
            <SelectTrigger className="w-[180px] bg-muted border-border"><SelectValue placeholder="Priority" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All Priorities</SelectItem><SelectItem value="high">High</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="low">Low</SelectItem></SelectContent>
          </Select>
          <Select value={filters.status} onValueChange={(v) => setFilters(f => ({ ...f, status: v }))}>
            <SelectTrigger className="w-[180px] bg-muted border-border"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All Statuses</SelectItem><SelectItem value="todo">To Do</SelectItem><SelectItem value="in-progress">In Progress</SelectItem><SelectItem value="done">Done</SelectItem></SelectContent>
          </Select>
           <Select value={filters.assignee} onValueChange={(v) => setFilters(f => ({ ...f, assignee: v }))}>
            <SelectTrigger className="w-[180px] bg-muted border-border"><SelectValue placeholder="Assignee" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assignees</SelectItem>
              <SelectItem value="Me">Me</SelectItem>
              {assignees.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
            </SelectContent>
          </Select>
          <div className="flex-grow"></div>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px] bg-muted border-border"><SelectValue placeholder="Sort by" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="due-date">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="created-date">Created Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Main Content */}
        <main className="px-6 pb-6 flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
          <TaskColumn title="To Do" tasks={filteredAndSortedTasks.filter(t => t.status === 'todo')} status="todo" moveTask={moveTask} onTaskClick={handleEditTask} />
          <TaskColumn title="In Progress" tasks={filteredAndSortedTasks.filter(t => t.status === 'in-progress')} status="in-progress" moveTask={moveTask} onTaskClick={handleEditTask} />
          <TaskColumn title="Done" tasks={filteredAndSortedTasks.filter(t => t.status === 'done')} status="done" moveTask={moveTask} onTaskClick={handleEditTask} />
        </main>
      </div>
      <TaskPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} task={selectedTask} onSave={handleSaveTask} assignees={assignees} />
    </DndProvider>
  );
}
