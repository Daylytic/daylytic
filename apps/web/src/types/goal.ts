import { Task } from "~/types/task";

export interface Goal {
    id: string;
    title: string;
    description: string;
    userId: string;
    archived: boolean;
    projects?: Project[];
}

export interface Project {
    id: string;
    title: string;
    position: number;
    goalId: string;
    archived: boolean;
    tasks?: Task[];
}