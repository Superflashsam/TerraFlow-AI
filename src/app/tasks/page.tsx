"use client";

import { useState, useEffect } from "react";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { initialTasks } from "@/lib/placeholder-data";
import type { Task, TaskStatus } from "@/types/task";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clipboard,
  Calendar,
  AlertCircle,
  CheckCircle,
  Search,
  LayoutGrid,
  List,
} from "lucide-react";
import { TaskColumn } from "@/components/tasks/TaskColumn";
import { CalendarView } from "@/components/tasks/CalendarView";
import { AddTaskPanel } from "@/components/tasks/AddTaskPanel";
import { TaskDetailModal } from "@/components/tasks/TaskDetailModal";
import { cn } from "@/lib/utils";

const TaskMetricCard = ({
  icon: Icon,
  title,
  value,
  badge,
  badgeColor,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  badge?: string;
  badgeColor?: string;
}) => (
  <div className="bg-card rounded-lg p-4 flex items-center justify-between border border-border">
    <div>
      <p className="text-muted-foreground text-sm">{title}</p>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
    <div className="flex flex-col items-end">
      <Icon className="h-6 w-6 text-muted-foreground mb-1" />
      {badge && (
        <span
          className={`px-2 py-0.5 text-xs font-semibold rounded-full ${badgeColor}`}
        >
          {badge}
        </span>
      )}
    </div>
  </div>
);

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [viewMode, setViewMode] = useState("board");
  const [filters, setFilters] = useState({
    search: "",
    priority: "all",
    status: "all",
    assignee: "all",
  });
  const [sort, setSort] = useState("due-date");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdDate'>) => {
    const fullTask: Task = {
      ...newTask,
      id: `T-${Date.now()}`,
      createdDate: new Date().toISOString(),
    };
    setTasks(prev => [fullTask, ...prev]);
    setIsPanelOpen(false);
  };
  
  const handleEditTask = (updatedTask: Task) => {
    setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
    setSelectedTask(null);
  };
  
  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    setSelectedTask(null);
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
        const activeTask = tasks.find(t => t.id === active.id);
        const overStatus = over.id as TaskStatus;

        if (activeTask && activeTask.status !== overStatus) {
            handleTaskMove(active.id as string, overStatus);
        }
    }
  };

  const handleTaskMove = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };
  
  const handleTaskComplete = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "done" ? "todo" : "done",
              completedAt: task.status !== "done" ? new Date().toISOString() : undefined
            }
          : task
      )
    );
  };

  const filteredAndSortedTasks = (() => {
    let filtered = tasks.filter((task) => {
      const searchLower = filters.search.toLowerCase();
      const titleMatch = task.title.toLowerCase().includes(searchLower);
      const descMatch = task.description?.toLowerCase().includes(searchLower);
      const assigneeMatch = task.assignee.name.toLowerCase().includes(searchLower);
      const linkedToMatch = task.linkedTo?.name.toLowerCase().includes(searchLower);

      return (
        (titleMatch || descMatch || assigneeMatch || linkedToMatch) &&
        (filters.priority === "all" || task.priority === filters.priority) &&
        (filters.status === "all" || task.status === filters.status) &&
        (filters.assignee === "all" || task.assignee.name === filters.assignee)
      );
    });

    filtered.sort((a, b) => {
      if (sort === "due-date") {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (sort === "priority") {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (sort === "created-date") {
        return (
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        );
      }
      return 0;
    });

    return filtered;
  })();

  const metrics = {
    total: tasks.length,
    dueToday: tasks.filter(
      (t) => new Date(t.dueDate).toDateString() === new Date().toDateString() && t.status !== "done"
    ).length,
    overdue: tasks.filter(
      (t) => new Date(t.dueDate) < new Date() && t.status !== "done"
    ).length,
    completedThisWeek: tasks.filter((t) => t.status === "done").length, // Simplified for now
  };

  const assignees = [...new Set(tasks.map((t) => t.assignee.name))];
  
  const columns: { title: string, status: TaskStatus }[] = [
    { title: "To Do", status: "todo" },
    { title: "In Progress", status: "in-progress" },
    { title: "Done", status: "done" },
  ];

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-full bg-task-charcoal text-task-text-primary">
        <div className="p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tasks</h1>
            <p className="text-muted-foreground">
              Manage your daily tasks and follow-ups
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-task-surface p-1 rounded-lg">
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={cn(viewMode === 'list' && 'bg-task-primary/20 text-task-primary')}
              >
                <List className="mr-2 h-4 w-4" />
                List View
              </Button>
               <Button
                variant={viewMode === "calendar" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("calendar")}
                className={cn(viewMode === 'calendar' && 'bg-task-primary/20 text-task-primary')}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Calendar View
              </Button>
               <Button
                variant={viewMode === "board" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("board")}
                className={cn(viewMode === 'board' && 'bg-task-primary/20 text-task-primary')}
              >
                <LayoutGrid className="mr-2 h-4 w-4" />
                Board View
              </Button>
            </div>
            <Button onClick={() => setIsPanelOpen(true)} className="bg-task-primary hover:bg-task-primary/90 text-white">
              Add Task
            </Button>
          </div>
        </div>

        <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <TaskMetricCard
            icon={Clipboard}
            title="Total Tasks"
            value={metrics.total.toString()}
          />
          <TaskMetricCard
            icon={Calendar}
            title="Due Today"
            value={metrics.dueToday.toString()}
            badge="Urgent"
            badgeColor="bg-yellow-500/20 text-yellow-500"
          />
          <TaskMetricCard
            icon={AlertCircle}
            title="Overdue"
            value={metrics.overdue.toString()}
            badge={`${metrics.overdue} Overdue`}
            badgeColor="bg-destructive/20 text-destructive"
          />
          <TaskMetricCard
            icon={CheckCircle}
            title="Completed This Week"
            value={metrics.completedThisWeek.toString()}
            badge="+15%"
            badgeColor="bg-green-500/20 text-green-500"
          />
        </div>

        <div className="p-6 flex items-center gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks, assignees..."
              className="bg-background border-border pl-10 placeholder:text-muted-foreground"
              value={filters.search}
              onChange={(e) =>
                setFilters((f) => ({ ...f, search: e.target.value }))
              }
            />
          </div>
          <Select
            value={filters.priority}
            onValueChange={(v) => setFilters((f) => ({ ...f, priority: v }))}
          >
            <SelectTrigger className="w-[180px] bg-background border-border">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filters.status}
            onValueChange={(v) => setFilters((f) => ({ ...f, status: v }))}
          >
            <SelectTrigger className="w-[180px] bg-background border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filters.assignee}
            onValueChange={(v) => setFilters((f) => ({ ...f, assignee: v }))}
          >
            <SelectTrigger className="w-[180px] bg-background border-border">
              <SelectValue placeholder="Assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assignees</SelectItem>
              <SelectItem value="Me">Me</SelectItem>
              {assignees.map((a) => (
                <SelectItem key={a} value={a}>
                  {a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex-grow"></div>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px] bg-background border-border">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="due-date">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="created-date">Created Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <main className="px-6 pb-6 flex-1 overflow-hidden">
          {viewMode === "board" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
              {columns.map(col => (
                <TaskColumn
                  key={col.status}
                  title={col.title}
                  status={col.status}
                  count={filteredAndSortedTasks.filter(t => t.status === col.status).length}
                  tasks={filteredAndSortedTasks.filter(t => t.status === col.status)}
                  onTaskComplete={handleTaskComplete}
                  onTaskMove={handleTaskMove}
                  onTaskClick={handleTaskClick}
                />
              ))}
            </div>
          )}
          {viewMode === "calendar" && (
            <CalendarView tasks={filteredAndSortedTasks} onTaskClick={handleTaskClick} />
          )}
          {viewMode === "list" && (
             <div className="text-center text-muted-foreground p-12">List view is coming soon.</div>
          )}
        </main>
      </div>
      
      <AddTaskPanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
        onAdd={handleAddTask}
      />
      
      <TaskDetailModal
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        onUpdate={handleEditTask}
        onDelete={handleDeleteTask}
      />

    </DndContext>
  );
}
