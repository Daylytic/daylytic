export interface Assistance {
    id: string;
    createdAt: string;
    questions: {
        [key: string]: string | number;
    };
    response: null | string;
    userId: string;
}