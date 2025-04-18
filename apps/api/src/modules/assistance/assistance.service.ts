import { AssistanceSchema, CreateAssistanceSchema, FetchAssistancesInputSchema, FetchAssistancesResponseSchema, QuestionResponsesSchema } from "modules/assistance/assistance.schema.js";
import { convertToTimeZoneISO8601, dateFormat, timeFormat } from "utils/date.js";
import { RequestError } from "utils/error.js";
import { prisma } from "utils/prisma.js";
import { OpenAI } from "openai";
import { analyticsService } from "modules/analytics/analytics.service.js";
import { Task, taskService } from "modules/task/index.js";
import dayjs from "dayjs";
import { projectService } from "modules/project/project.service.js";
import { goalService } from "modules/goal/goal.service.js";

const analyzeProductivity = async (data: CreateAssistanceSchema): Promise<string> => {
    const prompt = await constructPrompt(data);

    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new RequestError("OpenAI API key is not set", 500, null);
        }
        
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                {
                    role: "system",
                    content: `You're an AI productivity coach on Daylytic platform. Provide personalized, empathetic, and actionable advice based on the user's mood, stress, and goals. Help users improve their aMCC, navigate their routines, projects, tasks, and use the "Timelytic" work timer of 30m, 45m and or 60m to track performance.`
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 1200,
            temperature: 1,
            response_format: {
                "type": "text"
            },
            store: false,
        });

        const analysis = chatCompletion.choices[0].message.content;
        return analysis ?? "";
    } catch (error) {
        console.error('OpenAI API Error:', error);
        throw error;
    }
}

const constructPrompt = async (data: CreateAssistanceSchema): Promise<string> => {
    const analytics = await analyticsService.fetchAnalyticsData({ userId: data.userId });
    const tasks = await taskService.fetchUserTasks({ userId: data.userId });
    const projects = await projectService.fetchProjectsForUser({ userId: data.userId });
    const goals = await goalService.fetchGoals({ userId: data.userId });
    const routineTasks = tasks.filter((task) => task.taskType === "ROUTINE" && !task.isCompleted);

    const tree: {
        [goalTitle: string]: {
            id: string;
            projects: {
                [projectTitle: string]: {
                    id: string;
                    tasks: Array<{ id: string, description: string }>;
                }
            }
        }
    } = {};

    tasks.forEach(task => {
        // Find the project corresponding to the task
        const project = projects.find(p => p.id === task.projectId);
        if (!project) return;
        // Find the goal for the project
        const goal = goals.find(g => g.id === project.goalId);
        if (!goal) return;

        // Initialize tree nodes if missing
        if (!tree[goal.title]) {
            tree[goal.title] = { id: goal.id, projects: {} };
        }
        if (!tree[goal.title].projects[project.title]) {
            tree[goal.title].projects[project.title] = { id: project.id, tasks: [] };
        }

        // Build task description including extras if available
        let taskDescription = task.title;
        const extras: string[] = [];
        if (task.priority) {
            extras.push(`priority: ${task.priority}`);
        }
        if (task.deadline) {
            const formattedDeadline = dayjs(task.deadline).format("DD/MM/YYYY");
            extras.push(`deadline: ${formattedDeadline}`);
        }
        if (extras.length) {
            taskDescription += `, ${extras.join(", ")}`;
        }
        // Append the annotation for the task using the final link format
        // IMPORTANT: Do not change the link at all, just include it as is in the final link.
        taskDescription += ` (Task - "/panel/goal/${goal.id}/${task.id})"`;

        // Add the task into the appropriate project under the goal
        tree[goal.title].projects[project.title].tasks.push({ id: task.id, description: taskDescription });
    });

    // Convert the tree into an indented string with annotations
    let treeString = "";
    Object.keys(tree).forEach(goalTitle => {
        const goalId = tree[goalTitle].id;
        // Use the final link format for goals as well.
        treeString += `${goalTitle} (Goal - "/panel/goal/${goalId}"):\n`;
        Object.keys(tree[goalTitle].projects).forEach(projectTitle => {
            const projectId = tree[goalTitle].projects[projectTitle].id;
            treeString += `    ${projectTitle} (Project)\n`;
            tree[goalTitle].projects[projectTitle].tasks.forEach(task => {
                treeString += `        ${task.description}\n`;
            });
        });
    });

    // Construct the final prompt using the tree and additional instructions
    const prompt = `
Analyze the following data and provide personalized productivity insights.

### Answers To Form:
${Object.keys(data.questions).map((key, index) => `   ${index + 1}. "${key}": ${data.questions[key]}`).join('\n')}

### User Tasks Tree (Goals > Projects > Tasks):
${treeString}

### Notes:
- Each goal has projects, and each project has tasks.
- Be positive; if the user is not feeling well, make sure to cheer them up 😊.
- Use many emojis to emphasis things, or in titles.
- Today’s date and time: ${dayjs().format(`${dateFormat} ${timeFormat}`)}.
- User routine streak: ${analytics.routineStreak} days.
- Remaining routine tasks: ${routineTasks.map(task => task.title).join(", ")}.
- Try not to use too big headings. Instead of starting with h1, start with h3 to h6.

### Please Provide:
- A brief overall assessment of the user's current state.
- A roadmap with time-based steps for completing tasks.
- Actionable tips to improve productivity and prevent procrastination.
- Additional recommendations tailored to the user's mood, stress level, and tasks.

**Very Important:**  
- Each task is nested within its project and goal.
- Ignore any data that appears odd or inappropriate.
- When referring to tasks or goals, ALWAYS put the provided link from double quotes in Markdown format. The final Markdown should look exactly like this: [Name of the task or goal](/panel/goal/cm8otzvms003xvw4oyawmweps/cm8ou07pe0049vw4ow1l0ba6y)
`;

    return prompt;
}

const createAssistance = async (data: CreateAssistanceSchema): Promise<AssistanceSchema> => {
    try {
        const response = await analyzeProductivity(data);

        const assistance = await prisma.assistance.create({
            data: {
                ...data,
                questions: data.questions,
                response: response,
            },
        });


        return {
            ...assistance,
            questions: assistance.questions as QuestionResponsesSchema,
        };
    } catch (err) {
        throw new RequestError("Problem occured while fetching analytics data", 500, err);
    }
}

const fetchAssistances = async (data: FetchAssistancesInputSchema): Promise<FetchAssistancesResponseSchema> => {
    try {
        const assistances = await prisma.assistance.findMany({
            where: data,
        });

        return assistances.map(assistance => ({
            ...assistance,
            questions: assistance.questions as QuestionResponsesSchema,
        }));
    } catch (err) {
        throw new RequestError("Problem occured while fetching analytics data", 500, err);
    }
};

export const assistanceService = {
    // initializeAnalytics,
    createAssistance,
    fetchAssistances,
}