
"use client";

import { useState } from "react";
import type { Task, TaskPriority, TaskRepetition } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { teamMembers } from "@/lib/placeholder-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImagePlaceholder } from "@/lib/placeholder-images";

interface AddTaskPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: Omit<Task, "id" | "createdDate">) => void;
}

const availableTags = ["Follow-up", "Site Visit", "Urgent", "Legal", "Documentation"];

export const AddTaskPanel = ({ isOpen, onClose, onAdd }: AddTaskPanelProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [linkedType, setLinkedType] = useState<"lead" | "deal">("lead");
  const [linkedName, setLinkedName] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [assignee, setAssignee] = useState('me');
  const [repetition, setRepetition] = useState<TaskRepetition>('none');

  const handleSubmit = () => {
    if (!title || !dueDate || !linkedName) return;

    const selectedAssignee = teamMembers.find(m => m.id === assignee);

    onAdd({
      title,
      description,
      priority,
      status: "todo",
      dueDate: new Date(dueDate).toISOString(),
      dueTime,
      linkedTo: {
        type: linkedType,
        name: linkedName,
      },
      assignee: {
        name: selectedAssignee?.name || 'Me',
        avatarId: selectedAssignee?.avatarId || 'user-avatar',
      },
      tags: selectedTags,
      repetition,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
    setDueTime("");
    setLinkedName("");
    setSelectedTags([]);
    setAssignee('me');
    setRepetition('none');
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className={cn(
        "fixed right-0 top-0 bottom-0 w-full md:w-[480px] bg-card border-l border-border z-50",
        "transform transition-transform duration-300",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Add New Task</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
                rows={3}
                className="bg-background resize-none"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select value={priority} onValueChange={(v) => setPriority(v as TaskPriority)}>
                        <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                        <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Repeat</Label>
                    <Select value={repetition} onValueChange={(v) => setRepetition(v as TaskRepetition)}>
                        <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">Never</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>


            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueTime">Due Time</Label>
                <Input
                  id="dueTime"
                  type="time"
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                  className="bg-background"
                />
              </div>
            </div>

             <div className="space-y-2">
              <Label>Assign to</Label>
              <Select value={assignee} onValueChange={setAssignee}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {teamMembers.map(member => (
                        <SelectItem key={member.id} value={member.id}>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={getImagePlaceholder(member.avatarId)?.imageUrl} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {member.name}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Link to</Label>
              <Select value={linkedType} onValueChange={(v) => setLinkedType(v as "lead" | "deal")}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="deal">Deal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedName">{linkedType === "lead" ? "Lead Name" : "Deal Name"}</Label>
              <Input
                id="linkedName"
                value={linkedName}
                onChange={(e) => setLinkedName(e.target.value)}
                placeholder={`Enter ${linkedType} name`}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-border flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!title || !dueDate || !linkedName}
              className="flex-1"
            >
              Create Task
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
