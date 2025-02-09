export type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | "OPTIONAL" | null;

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  priority: Priority;
  position: number;
  title: string;
  description: string;
  tags: Tag[];
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  deadline: string | null;
}
