export type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | "OPTIONAL" | null;

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
  taskType: "ROUTINE" | "TODOLIST";
  priority: Priority;
  title: string;
  content: string | number | boolean | unknown[] | { [key: string]: unknown; } | null;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  deadline: string | null;
  userId: string | null;
  tagIds: string[];
}
