export type TaskType = "ROUTINE" | "PROJECT";
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
  createdAt: string;
  updatedAt: string;
  deadline: string | null;
  userId: string | null;
  projectId: string | null;
  tagIds: string[];
}
