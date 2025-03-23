// GOALS
export const GOAL_TITLE_MAX_LENGTH = 100;
export const GOAL_TITLE_MIN_LENGTH = 4;

export const GOAL_DESCRIPTION_MAX_LENGTH = 1000;
export const GOAL_DESCRIPTION_MIN_LENGTH = 0;

//TASK
export const TASK_TITLE_MIN_LENGTH = 1;
export const TASK_TITLE_MAX_LENGTH = 100;

//PROJECT
export const PROJECT_TITLE_MIN_LENGTH = 1;
export const PROJECT_TITLE_MAX_LENGTH = 100;

export const themes =  [
    "dark",
    "light"
];

//FORM
export interface Question {
    id: string;
    questionText: string;
    answerType: "text" | "number" | "date" | "select";
    options?: string[];
    confirmation?: boolean;
}

export const questions: Question[] = [
    {
        id: "cm8ten45w00010cl4fr4hhust",
        questionText: "How are you feeling today? Are you feeling like doing work?",
        answerType: "text",
    },
    {
        id: "cm8vk1u6l00040cjy362cdj26",
        questionText: "What times are you available to do work? Do you have school / job, or anything that prevents you from doing your tasks?",
        answerType: "text",
    },
    {
        id: "cm8sji1v700000cl8cful2b8p",
        questionText: "Which of the following best describes your mood?",
        answerType: "select",
        options: ["Happy", "Sad", "Anxious", "Motivated", "Neutral", "Overwhelmed"],
    },
    {
        id: "cm8sji84800010cl86p2w3dxb",
        questionText: "Rate your current stress level (1 being very relaxed and 10 extremely stressed)",
        answerType: "number",
    },
    {
        id: "cm8sjjh9400050cl810snad2k",
        questionText: "How motivated are you to do work today? (1 being not at all and 10 extremely motivated)",
        answerType: "number",
    },
    {
        id: "cm8sjip3600030cl8clww1f6e",
        questionText: "What is one personal goal / project you’d like to work on today?",
        answerType: "text",
    },
    {
        id: "cm8sjiuat00040cl84s7l9m6p",
        questionText: "What type of tasks are you most inclined to focus on today?",
        answerType: "select",
        options: [
            "Creative Projects",
            "Administrative Tasks",
            "Physical Activities",
            "Social Engagements",
            "Relaxation/Wellness",
        ],
    },
];

