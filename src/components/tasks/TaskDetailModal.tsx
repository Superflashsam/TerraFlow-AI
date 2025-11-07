"use client";

import { useState, useEffect } from "react";
import type { Task, TaskPriority } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, Trash2, Calendar, User, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const availableTags = ["Follow-up", "Site Visit", "Urgent", "Legal", "Documentation"];

export const TaskDetailModal = ({
  task,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
}: TaskDetailModalProps) => {
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (task) {
      setEditedTask({ ...task });
      setIsEditing(false);
    }
  }, [task]);

  if (!task || !editedTask) return null;

  const handleSave = () => {
    onUpdate(editedTask);
    setIsEditing(false);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id);
      onClose();
    }
  };

  const toggleTag = (tag: string) => {
    setEditedTask({
      ...editedTask,
      tags: editedTask.tags.includes(tag)
        ? editedTask.tags.filter((t) => t !== tag)
        : [...editedTask.tags, tag],
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high": return "text-task-high-priority";
      case "medium": return "text-task-medium-priority";
      case "low": return "text-task-low-priority";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl font-bold text-foreground">
              {isEditing ? "Edit Task" : "Task Details"}
            </DialogTitle>
            <div className="flex gap-2">
              {!isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Title */}
          <div className="space-y-2">
            <Label>Task Title</Label>
            {isEditing ? (
              <Input
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
                className="bg-background"
              />
            ) : (
              <p className="text-lg font-semibold text-foreground">
                {task.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            {isEditing ? (
              <Textarea
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
                rows={4}
                className="bg-background resize-none"
              />
            ) : (
              <p className="text-muted-foreground">{task.description}</p>
            )}
          </div>

          {/* Priority and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Priority</Label>
              {isEditing ? (
                <Select
                  value={editedTask.priority}
                  onValueChange={(v) =>
                    setEditedTask({
                      ...editedTask,
                      priority: v as TaskPriority,
                    })
                  }
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className={cn("font-medium capitalize", getPriorityColor(task.priority))}>
                  {task.priority}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              {isEditing ? (
                <Select
                  value={editedTask.status}
                  onValueChange={(v) =>
                    setEditedTask({
                      ...editedTask,
                      status: v as Task["status"],
                    })
                  }
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="font-medium capitalize text-foreground">
                  {task.status === "todo"
                    ? "To Do"
                    : task.status === "in-progress"
                    ? "In Progress"
                    : "Done"}
                </p>
              )}
            </div>
          </div>

          {/* Due Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Due Date</Label>
              {isEditing ? (
                <Input
                  type="date"
                  value={new Date(editedTask.dueDate).toISOString().split("T")[0]}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      dueDate: new Date(e.target.value).toISOString(),
                    })
                  }
                  className="bg-background"
                />
              ) : (
                <div className="flex items-center gap-2 text-foreground">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(task.dueDate)}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Due Time</Label>
              {isEditing ? (
                <Input
                  type="time"
                  value={editedTask.dueTime || ""}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, dueTime: e.target.value })
                  }
                  className="bg-background"
                />
              ) : (
                <p className="text-foreground">{task.dueTime || "Not set"}</p>
              )}
            </div>
          </div>

          {/* Linked To */}
          {task.linkedTo && <div className="space-y-2">
            <Label>Linked To</Label>
            {isEditing && editedTask.linkedTo ? (
              <div className="space-y-2">
                <Select
                  value={editedTask.linkedTo.type}
                  onValueChange={(v) =>
                    setEditedTask({
                      ...editedTask,
                      linkedTo: {
                        ...editedTask.linkedTo!,
                        type: v as "lead" | "deal",
                      },
                    })
                  }
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="deal">Deal</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  value={editedTask.linkedTo.name}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      linkedTo: {
                        ...editedTask.linkedTo!,
                        name: e.target.value,
                      },
                    })
                  }
                  className="bg-background"
                  placeholder="Enter name"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 text-foreground">
                {task.linkedTo.type === "lead" ? (
                  <User className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="capitalize">{task.linkedTo.type}:</span>
                <span className="font-medium">{task.linkedTo.name}</span>
              </div>
            )}
          </div>}

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            {isEditing ? (
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={editedTask.tags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Assignee */}
          <div className="space-y-2">
            <Label>Assigned To</Label>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-medium text-sm">
                  {task.assignee.name === "You"
                    ? "Me"
                    : task.assignee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                </span>
              </div>
              <span className="text-foreground">{task.assignee.name}</span>
            </div>
          </div>

          {/* Completed At (if done) */}
          {task.completedAt && (
            <div className="space-y-2">
              <Label>Completed At</Label>
              <p className="text-green-500">
                {formatDate(task.completedAt)}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        {isEditing && (
          <div className="flex gap-3 pt-4 border-t border-border mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setEditedTask({ ...task });
                setIsEditing(false);
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-task-primary hover:bg-task-primary/90">
              Save Changes
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
