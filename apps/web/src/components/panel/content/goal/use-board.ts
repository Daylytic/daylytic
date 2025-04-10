import { useGoal } from "~/providers/goal";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect } from "react";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";
import { flushSync } from "react-dom";
import { triggerPostMoveFlash } from "~/components/common/flourish/trigger-post-move-flash";
import { useProject } from "~/providers/project";
import { useTask } from "~/providers/task";
import { Task } from "~/types/task";
import { Project } from "~/types/goal";

export const useGoalBoard = () => {
  const { selectedGoal, fetched } = useGoal();
  const { updateTasks, tasks } = useTask();
  const { projects, updateProjects } = useProject();

  useEffect(() => {
    const getSortedProjectTasks = (projectId) => {
      return tasks
        .filter((task) => task.projectId === projectId)
        .sort((a, b) => a.position - b.position);
    };

    const reorderAndUpdate = ({ list, startIndex, indexOfTarget, closestEdgeOfTarget }) => {
      const reordered = reorderWithEdge({
        list,
        startIndex,
        indexOfTarget,
        closestEdgeOfTarget,
        axis: "vertical",
      }).map((task, index) => ({
        ...task as Task,
        position: index,
      }));

      flushSync(async () => {
        await updateTasks(reordered, true);
      });
    };

    const handleMoveTaskToProject = ({ sourceData, targetData }) => {
      const sourceTask = tasks.find((task) => sourceData.taskId === task.id);
      if (!sourceTask) {
        console.error("Given source task does not exist.");
        return;
      }

      const tasksFromTarget = getSortedProjectTasks(targetData.projectId);

      sourceTask.projectId = targetData.projectId;
      sourceTask.position = tasksFromTarget.length;
      tasksFromTarget.push(sourceTask);

      reorderAndUpdate({
        list: tasksFromTarget,
        startIndex: tasksFromTarget.length - 1,
        indexOfTarget: tasksFromTarget.findIndex((task) => task.id === targetData.taskId),
        closestEdgeOfTarget: extractClosestEdge(targetData),
      });
    };

    const handleMoveTaskWithinSameProject = ({ sourceData, targetData }) => {
      if (sourceData.taskId === targetData.taskId) return;

      const tasksWithinSameProject = getSortedProjectTasks(sourceData.projectId);

      const indexOfSource = tasksWithinSameProject.findIndex((task) => task.id === sourceData.taskId);
      const indexOfTarget = tasksWithinSameProject.findIndex((task) => task.id === targetData.taskId);

      if (indexOfTarget < 0 || indexOfSource < 0) return;

      reorderAndUpdate({
        list: tasksWithinSameProject,
        startIndex: indexOfSource,
        indexOfTarget,
        closestEdgeOfTarget: extractClosestEdge(targetData),
      });
    };

    return monitorForElements({
      onDrop({ source, location }) {
        const target = location.current.dropTargets[0];
        if (!target) {
          return;
        }

        const sourceData = source.data;
        const targetData = target.data;

        if (sourceData.type === "task-card") {
          if (sourceData.projectId === targetData.projectId) {
            handleMoveTaskWithinSameProject({ sourceData, targetData });
          } else {
            handleMoveTaskToProject({ sourceData, targetData });
          }

          const element = document.querySelector(`[data-task-id="${sourceData.taskId}"]`);
          if (element instanceof HTMLElement) {
            triggerPostMoveFlash(element);
          }
        }

        if (sourceData.type === "project") {
          if (sourceData.projectId === targetData.projectId) {
            return;
          }

          const projectsWithinSameGoal = projects
            .filter((project) => project.goalId === sourceData.goalId)
            .sort((a, b) => a.position - b.position);

          const indexOfSource = projectsWithinSameGoal.findIndex(
            (sourceProject) => sourceProject.id === sourceData.projectId,
          );
          const indexOfTarget = projectsWithinSameGoal.findIndex(
            (targetProject) => targetProject.id === targetData.projectId,
          );

          const closestEdgeOfTarget = extractClosestEdge(targetData);

          if (indexOfTarget < 0 || indexOfSource < 0) {
            return;
          }

          flushSync(() => {
            updateProjects(
              reorderWithEdge({
                list: projectsWithinSameGoal,
                startIndex: indexOfSource,
                indexOfTarget,
                closestEdgeOfTarget,
                axis: "horizontal",
              }).map((project, index) => ({
                ...project as Project,
                position: index,
              })),
            );
          });

          const element = document.querySelector(`[data-project-id="${sourceData.projectId}"]`);
          if (element instanceof HTMLElement) {
            triggerPostMoveFlash(element);
          }
        }
      },
    });
  }, [tasks, projects]);

  return { projects, selectedGoal, fetched };
};
