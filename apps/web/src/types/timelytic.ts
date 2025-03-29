export interface Timelytic {
    id: string;
    userId: string;
    deadline: string | null;
    duration: 1800000 | 2700000 | 3600000 | null;
    pausedTime: string | null;
    isRunning: boolean;
}