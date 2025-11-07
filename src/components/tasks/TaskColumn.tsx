"use client";

import type { Task, TaskStatus } from "@/types/task";
import { TaskCard } from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  count: number;
  tasks: Task[];
  onTaskComplete: (taskId: string) => void;
  onTaskMove: (taskId: string, status: Task["status"]) => void;
  onTaskClick: (task: Task) => void;
}

export const TaskColumn = ({ 
  title, 
  status,
  count, 
  tasks, 
  onTaskComplete, 
  onTaskMove,
  onTaskClick 
}: TaskColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div 
      ref={setNodeRef}
      className={cn(
        "bg-task-surface rounded-lg p-4 border border-border flex flex-col h-full",
        isOver && "border-task-primary border-2 bg-task-primary/5"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-task-text-primary">{title}</h3>
        <span className="bg-task-primary/20 text-task-primary text-sm font-medium px-3 py-1 rounded-full">
          {count}
        </span>
      </div>
      
      <div className="space-y-3 flex-1 overflow-y-auto pr-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onComplete={() => onTaskComplete(task.id)}
            onMove={(status) => onTaskMove(task.id, status)}
            onTaskClick={() => onTaskClick(task)}
          />
        ))}
      </div>
    </div>
  );
};
