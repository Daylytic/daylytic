export interface Goal {
    id: string;
    title: string;
    description: string;
    userId: string;

    /* Local Data */
    // progress: number;
    // updatedAt: string;
}

export interface Project {
    id: string;
    title: string;
    position: number;
    goalId: string;
}