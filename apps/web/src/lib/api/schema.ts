/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/oauth2/google": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Creates an account with session in the db, and returns user object. */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["def-0"]["createUserSchema"];
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["def-0"]["userCore"];
                    };
                };
            };
        };
        /** @description Logs out session assosiated with the bearer */
        delete: {
            parameters: {
                query?: never;
                header: {
                    authorization: string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Succesfully logged out from the account */
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": unknown;
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/goals/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["def-1"]["goals"];
                    };
                };
            };
        };
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["def-1"]["goalCreateInput"];
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["def-1"]["goalCore"];
                    };
                };
            };
        };
        delete: {
            parameters: {
                query: {
                    id: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Goal successfully deleted. No content returned. */
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": unknown;
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/projects/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query: {
                    goalId: string;
                    projectId: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post: {
            parameters: {
                query: {
                    goalId: string;
                    projectId: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/routine/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header: {
                    authorization: string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["def-3"]["fetchDailyTasksResponse"];
                    };
                };
            };
        };
        put?: never;
        post: {
            parameters: {
                query?: never;
                header: {
                    authorization: string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["def-3"]["createDailyTaskInput"];
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["def-3"]["createDailyTaskResponse"];
                    };
                };
            };
        };
        delete: {
            parameters: {
                query?: never;
                header: {
                    authorization: string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["def-3"]["deleteDailyTaskInput"];
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** UsersSchema */
        "def-0": {
            userCore: {
                id: string;
                name: string;
                email: string;
                picture: string;
                /** Format: date-time */
                createdAt: string;
                /** Format: date-time */
                lastSeenAt: string;
            };
            createUserSchema: {
                token: string;
            };
            googleAccountCore: {
                id: string;
                /** Format: email */
                email: string;
                name: string;
                picture: string;
            };
            headersBearer: {
                authorization: string;
            };
        };
        /** GoalsSchema */
        "def-1": {
            goalCreateInput: {
                title: string;
                description: string;
                deadline: string | null;
                userId: string;
            };
            goalDeleteInput: {
                id: string;
            };
            goalCore: {
                title: components["schemas"]["def-1"]["goalCreateInput"]["title"];
                description: components["schemas"]["def-1"]["goalCreateInput"]["description"];
                deadline: components["schemas"]["def-1"]["goalCreateInput"]["deadline"];
                userId: components["schemas"]["def-1"]["goalCreateInput"]["userId"];
                id: string;
                /** Format: date-time */
                createdAt: string;
                /** Format: date-time */
                updatedAt: string;
                progress: number;
            };
            goals: components["schemas"]["def-1"]["goalCore"][];
        };
        /** ProjectsSchema */
        "def-2": {
            projectsBaseQuery: {
                goalId: string;
                projectId: string;
            };
        };
        /** RoutineSchema */
        "def-3": {
            createDailyTaskInput: {
                title: string;
            };
            createDailyTaskResponse: {
                id: string;
                title: string;
                isCompleted: boolean;
                userId: string;
            };
            fetchDailyTasksResponse: components["schemas"]["def-3"]["createDailyTaskResponse"][];
            deleteDailyTaskInput: {
                id: string;
            };
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
