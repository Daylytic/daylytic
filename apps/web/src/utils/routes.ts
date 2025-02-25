export enum Routes {
  PANEL_DASHBOARD = "/panel/dashboard",
  PANEL_ROUTINE = "/panel/routine",
  PANEL_TAG = "/panel/tag",
}

export const getTaskRoute = (taskId?: string) => `${Routes.PANEL_ROUTINE}/${taskId}`;
export const getTagRoute = (tagId: string, taskId?: string) =>
  `${Routes.PANEL_TAG}/${tagId}${taskId ? `/${taskId}` : ``}`;
