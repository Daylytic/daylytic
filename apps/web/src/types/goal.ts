export interface Goal {
    id: string;
    title: string;
    description: string;
    userId: string;
}

export interface Project {
    id: string;
    title: string;
    position: number;
    goalId: string;
}