export interface Analytics {
    id: string;
    loginStreak: number;
    recordLoginStreak: number;
    routineStreak: number;
    recordRoutineStreak: number;
    timelyticTasksFinished: number;
    timelyticTimeSpent: number;
    timelyticSessions: number;
    lastRoutineReset: string;
}