import { RequestError } from "utils/error.js";
import { prisma } from "utils/prisma.js";
import {
  CreateTaskWithIdSchema,
  Task,
  DeleteTaskWithIdInputSchema,
  FetchTasksInputSchema,
  UpdateTasksSchema,
  VerifyOwnershipSchema,
} from "./task.schema.js";
import { convertToTimeZoneISO8601 } from "utils/date.js";
import { tagService } from "modules/tag/index.js";
import { goalService } from "modules/goal/goal.service.js";
import { projectService } from "modules/project/project.service.js";

const createTask = async (data: CreateTaskWithIdSchema): Promise<Task> => {
  try {
    const maxPosition = await prisma.task.aggregate({
      where: { userId: data.userId, projectId: data.projectId, taskType: data.taskType },
      _max: { position: true },
    });

    const newPosition = (maxPosition._max.position ?? -1) + 1;

    return await prisma.task.create({
      data: { ...data, position: newPosition, content: {} },
    });
  } catch (err) {
    throw new RequestError("Problem occured while creating task", 500, err);
  }
};

const fetchTasks = async (data: FetchTasksInputSchema): Promise<Task[]> => {
  return await prisma.task.findMany({
    where: data,
  });
};

const deleteTask = async (data: DeleteTaskWithIdInputSchema): Promise<void> => {
  try {
    await prisma.task.delete({
      where: data,
    });
  } catch (err) {
    throw new RequestError("Problem occured while deleting task", 500, err);
  }
};

const updateTasks = async (data: UpdateTasksSchema) => {
  try {
    const updatedTasks: Task[] = [];
    await verifyOwnership({tasks: updatedTasks, userId: data.userId});

    for (const dataRow of data.tasks) {
      const tagIds = dataRow.tagIds;

      const tags = await tagService.fetchTagsWithIds(tagIds);
      await tagService.updateTasks({ tagIds: tags.map((tag) => tag.id), taskId: dataRow.id })

      updatedTasks.push(
        await prisma.task.update({
          where: {
            id: dataRow.id,
          },
          data: {
            ...dataRow,
            tagIds: tags.map((tag) => tag.id),
            updatedAt: convertToTimeZoneISO8601(),
          },
        })
      );
    }
    return updatedTasks;
  } catch (err) {
    throw new RequestError(`Problem occurred while updating task`, 500, err);
  }
};

const verifyOwnership = async (data: VerifyOwnershipSchema) => {
  try {
    const userId = data.userId;
    const goals = await goalService.fetchGoals({ userId });
    const goalIds = goals.map(goal => goal.id);
    const projects = await projectService.fetchProjects({goalIds: goalIds});

    for (const task of data.tasks) {
      if (!task.userId && !task.projectId) {
        throw Error("Neither userId, nor projectId are set");
      }

      if (task.userId) {
        if (userId !== task.userId) {
          throw Error("UserId does not match task.userId")
        }
      }

      if (task.projectId) {
        const project = projects.find((fetchedProject) => fetchedProject.id === task.projectId);
        if(!project) {
          throw Error("ProjectId does not match any projects user owns")
        }
      }
    }
  } catch (err) {
    throw new RequestError("Could not verify ownership", 500, err);
  }
}

export const taskService = {
  createTask,
  fetchTasks,
  deleteTask,
  updateTasks,
};
