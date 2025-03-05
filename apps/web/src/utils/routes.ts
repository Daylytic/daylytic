export enum Routes {
  PANEL_DASHBOARD = "/panel/dashboard",
  PANEL_ROUTINE = "/panel/routine",
  PANEL_TAG = "/panel/tag",
  PANEL_GOAL = "/panel/goal"
}

export const getTaskRoute = (taskId?: string) => `${Routes.PANEL_ROUTINE}/${taskId}`;
export const getTagRoute = (tagId: string, taskId?: string) =>
  `${Routes.PANEL_TAG}/${tagId}${taskId ? `/${taskId}` : ``}`;

export const getGoalRoute = (goalId: string, taskId?: string) =>
  `${Routes.PANEL_GOAL}/${goalId}${taskId ? `/${taskId}` : ``}`;