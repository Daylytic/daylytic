import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect } from "react";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";
import { flushSync } from "react-dom";
import { triggerPostMoveFlash } from "~/components/common/flourish/trigger-post-move-flash";
import { useProject } from "~/providers/project";
import { useTask } from "~/providers/task";
import { Task } from "~/types/task";

export const useRoutineList = () => {
  const { updateTasks, tasks, fetched } = useTask();
  const { projects } = useProject();

  useEffect(() => {
    const getSortedProjectTasks = (projectId) => {
      return tasks
        .filter((task) => task.projectId === projectId)
        .sort((a, b) => a.position - b.position);
    };

    const reorderAndUpdate = ({ list, startIndex, indexOfTarget, closestEdgeOfTarget }) => {
      const reorderedTasks = reorderWithEdge({
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
        await updateTasks(reorderedTasks, true);
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
          }

          const element = document.querySelector(`[data-task-id="${sourceData.taskId}"]`);
          if (element instanceof HTMLElement) {
            triggerPostMoveFlash(element);
          }
        }
      },
    });
  }, [tasks, projects]);

  return { fetched };
};
