export type TaskType = "ROUTINE" | "PROJECT" | "EVENT";
export const Priorities = ["LOW", "MEDIUM", "HIGH", "CRITICAL", "OPTIONAL"] as const;

export interface Tag {
  id: string;
  name: string;
  color: string;
  userId: string | null;
  taskIds: string[];
}

export interface Task {
  id: string;
  position: number;
  taskType: TaskType;
  priority: typeof Priorities[number] | null;
  title: string;
  content: string | number | boolean | unknown[] | { [key: string]: unknown };
  isCompleted: boolean;
  timelyticTask: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  deadline: string | null;
  userId: string | null;
  projectId: string | null;
  tagIds: string[];
}
