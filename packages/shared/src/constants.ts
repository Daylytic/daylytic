// USER

// GOALS
const MAX_GOAL_TITLE_LENGTH = 32;
const MIN_GOAL_TITLE_LENGTH = 4;

const MAX_GOAL_DESCRIPTION_LENGTH = 90;
const MIN_GOAL_DESCRIPTION_LENGTH = 0;

//TASK
export const TASK_TITLE_MIN_LENGTH = 1;
export const TASK_TITLE_MAX_LENGTH = 32;

export const TASK_DESCRIPTION_MIN_LENGTH = 0;
export const TASK_DESCRIPTION_MAX_LENGTH = 90;


export const goals = {
    MAX_GOAL_TITLE_LENGTH,
    MIN_GOAL_TITLE_LENGTH,
    MAX_GOAL_DESCRIPTION_LENGTH,
    MIN_GOAL_DESCRIPTION_LENGTH,
}

export const TaskTypes = ["ROUTINE", "PROJECT"] as const;
export const Priorities = ["LOW", "MEDIUM", "HIGH", "CRITICAL", "OPTIONAL"];
