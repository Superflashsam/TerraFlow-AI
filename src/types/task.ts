export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";
export type TaskRepetition = 'none' | 'daily' | 'weekly' | 'monthly';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  dueTime?: string;
  createdDate: string;
  completedAt?: string;
  linkedTo: {
    type: "lead" | "deal";
    name: string;
  } | null;
  assignee: {
    name: string;
    avatarId: string;
  };
  tags: string[];
  repetition?: TaskRepetition;
}
