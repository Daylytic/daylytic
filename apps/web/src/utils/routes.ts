export enum Routes {
  HOME = "/",
  SETUP = "/setup",
  PANEL_DASHBOARD = "/panel/dashboard",
  PANEL_ROUTINE = "/panel/routine",
  PANEL_TAG = "/panel/tag",
  PANEL_GOAL = "/panel/goal",
  PANEL_CALENDAR = "/panel/calendar",
  PANEL_TIMELYTIC = "/panel/timelytic",
}

export const getTaskRoute = (taskId?: string) => `${Routes.PANEL_ROUTINE}/${taskId}`;
export const getDashboardRoute = (dailyAssistant?: boolean) => `${Routes.PANEL_DASHBOARD}${dailyAssistant === true ? "/daily-assistant" : ""}`;
export const getTagRoute = (tagId: string, taskId?: string) =>
  `${Routes.PANEL_TAG}/${tagId}${taskId ? `/${taskId}` : ``}`;

export const getGoalRoute = (goalId: string, taskId?: string) =>
  `${Routes.PANEL_GOAL}/${goalId}${taskId ? `/${taskId}` : ``}`;
export const getCalendarRoute = (date: string, goalId?: string, taskId?: string) => `${Routes.PANEL_CALENDAR}/${date}${goalId ? "/" + goalId : ""}${taskId ? "/" + taskId : ""}`;
export const getAssistanceRoute = (assistanceId?: string) => `${Routes.PANEL_DASHBOARD}/daily-assistant${assistanceId ? `/${assistanceId}` : ""}`;
