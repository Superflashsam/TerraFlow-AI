"use client";

import { Task } from "@/types/task";
import { cn } from "@/lib/utils";
import { Calendar, User, Building2, Edit, Trash2, MoveRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
  task: Task;
  onComplete: () => void;
  onMove: (status: Task["status"]) => void;
  onTaskClick: () => void;
}

export const TaskCard = ({ task, onComplete, onMove, onTaskClick }: TaskCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  useEffect(() => {
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (date.toDateString() === today.toDateString()) {
        return "Today";
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return "Tomorrow";
      } else {
        return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
      }
    };
    setFormattedDate(formatDate(task.dueDate));
  }, [task.dueDate]);


  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "done";
  
  const getPriorityColor = () => {
    switch (task.priority) {
      case "high": return "bg-task-high-priority";
      case "medium": return "bg-task-medium-priority";
      case "low": return "bg-task-low-priority";
    }
  };

  const dndProps = isClient ? { ...listeners, ...attributes } : {};

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-task-surface rounded-lg p-4 border border-border relative cursor-move hover:bg-muted/50",
        task.status === "done" && "opacity-70",
        isDragging && "opacity-50 shadow-lg"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...dndProps}
    >
      <div className="flex items-start gap-3">
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={task.status === "done"}
            onCheckedChange={onComplete}
            className="mt-1 border-task-low-priority data-[state=checked]:bg-task-primary data-[state=checked]:border-task-primary"
          />
        </div>
        
        <div 
          className="flex-1 min-w-0 cursor-pointer"
          onClick={(e) => {
            if (!(e.target instanceof HTMLButtonElement || e.target instanceof HTMLInputElement)) {
               e.stopPropagation();
               onTaskClick();
            }
          }}
        >
          <div className="flex items-start gap-2 mb-2">
            <div className={cn("w-2 h-2 rounded-full mt-[7px] flex-shrink-0", getPriorityColor())} />
            <h4 className={cn(
              "font-semibold text-sm text-task-text-primary",
              task.status === "done" && "line-through text-task-text-secondary"
            )}>
              {task.title}
            </h4>
          </div>
          
          <p className="text-xs text-task-text-secondary mb-3 line-clamp-2">
            {task.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-2 text-xs mb-3">
            <div className={cn(
              "flex items-center gap-1",
              isOverdue ? "text-task-high-priority" : "text-task-text-secondary"
            )}>
              <Calendar className="h-3 w-3" />
              <span>{formattedDate}</span>
              {task.dueTime && <span className="ml-1">{task.dueTime}</span>}
            </div>
            
            {task.linkedTo && <div className="flex items-center gap-1 text-task-text-secondary">
              {task.linkedTo.type === "lead" ? (
                <User className="h-3 w-3" />
              ) : (
                <Building2 className="h-3 w-3" />
              )}
              <span className="truncate max-w-[120px]">{task.linkedTo.name}</span>
            </div>}
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {task.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs px-2 py-0 h-5 bg-muted text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-task-text-secondary">
              <div className="w-6 h-6 rounded-full bg-task-primary/20 flex items-center justify-center">
                <span className="text-task-primary font-medium text-[10px]">
                  {task.assignee.name === "You" ? "Me" : task.assignee.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <span>{task.assignee.name}</span>
            </div>
            
            {isHovered && (
              <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 text-muted-foreground hover:bg-muted"
                  onClick={onTaskClick}
                >
                  <Edit className="h-3 w-3" />
                </Button>
                {task.status !== "done" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-muted-foreground hover:bg-muted"
                    onClick={() => {
                      const nextStatus = task.status === "todo" ? "in-progress" : "done";
                      onMove(nextStatus);
                    }}
                  >
                    <MoveRight className="h-3 w-3" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
