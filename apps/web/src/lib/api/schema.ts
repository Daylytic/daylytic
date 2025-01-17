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
                    "application/json": components["schemas"]["def-0"]["LoadUserInputSchema"];
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["def-0"]["UserSchema"];
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
        /** @description Fetches given user tasks */
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
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["def-3"]["FetchTasksResponseSchema"];
                    };
                };
            };
        };
        /** @description Updates the data of the daily task */
        put: {
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
                    "application/json": components["schemas"]["def-3"]["UpdateTaskInputSchema"];
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["def-3"]["TaskSchema"];
                    };
                };
            };
        };
        /** @description Create new daily task */
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
                    "application/json": components["schemas"]["def-3"]["CreateTaskInputSchema"];
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["def-3"]["TaskSchema"];
                    };
                };
            };
        };
        /** @description Deletes daily task */
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
                    "application/json": components["schemas"]["def-3"]["DeleteTaskInputSchema"];
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
            UserSchema: {
                id: string;
                name: string;
                email: string;
                picture: string;
                /** Format: date-time */
                createdAt: string;
                /** Format: date-time */
                lastSeenAt: string;
                timeZone: string;
            };
            CreateUserInputSchema: {
                token: string;
                timeZone: string;
            };
            GoogleAccountSchema: {
                id: components["schemas"]["def-0"]["UserSchema"]["id"];
                /** Format: email */
                email: string;
                name: string;
                picture: string;
                timeZone: string;
            };
            HeaderBearerSchema: {
                authorization: string;
            };
            LoadUserInputSchema: {
                token: string;
                timeZone?: string;
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
        /** TaskSchemas */
        "def-3": {
            TaskSchema: {
                id: string;
                /** @enum {string} */
                taskType: "ROUTINE" | "TODOLIST";
                /** @default 0 */
                priority: number;
                title: string;
                description: string | null;
                /** @default false */
                isCompleted: boolean;
                /**
                 * Format: date-time
                 * @default {}
                 */
                createdAt: string;
                /** Format: date-time */
                updatedAt: string;
                deadline: string | null;
                todoListId: components["schemas"]["def-3"]["TaskSchema"]["id"] | null;
                userId: components["schemas"]["def-3"]["TaskSchema"]["id"] | null;
                tags?: {
                    id: components["schemas"]["def-3"]["TaskSchema"]["id"];
                    name: string;
                    color: string;
                    tasks?: string[];
                }[];
            };
            CreateTaskInputSchema: {
                title: components["schemas"]["def-3"]["TaskSchema"]["title"];
                taskType: components["schemas"]["def-3"]["TaskSchema"]["taskType"];
            };
            FetchTasksResponseSchema: components["schemas"]["def-3"]["TaskSchema"][];
            DeleteTaskInputSchema: {
                id: components["schemas"]["def-3"]["TaskSchema"]["id"];
            };
            UpdateTaskInputSchema: {
                id: components["schemas"]["def-3"]["TaskSchema"]["id"];
                taskType: components["schemas"]["def-3"]["TaskSchema"]["taskType"];
                priority?: components["schemas"]["def-3"]["TaskSchema"]["priority"];
                title: components["schemas"]["def-3"]["TaskSchema"]["title"];
                description: components["schemas"]["def-3"]["TaskSchema"]["description"];
                isCompleted?: components["schemas"]["def-3"]["TaskSchema"]["isCompleted"];
                createdAt?: components["schemas"]["def-3"]["TaskSchema"]["createdAt"];
                updatedAt: components["schemas"]["def-3"]["TaskSchema"]["updatedAt"];
                deadline: components["schemas"]["def-3"]["TaskSchema"]["deadline"];
                tags?: components["schemas"]["def-3"]["TaskSchema"]["tags"];
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
