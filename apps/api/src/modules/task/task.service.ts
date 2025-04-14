import { RequestError } from "utils/error.js";
import { prisma } from "utils/prisma.js";
import {
  Task,
  FetchTasksInputSchema,
  UpdateTasksSchema,
  VerifyOwnershipSchema,
  DeleteTaskInputSchema,
  FetchTasksWithIdsSchema,
  FetchUserTasksInputSchema,
  CreateTaskWithIdsSchema,
} from "./task.schema.js";
import { convertToTimeZoneISO8601, ISOFormat, ISOFormatUTC } from "utils/date.js";
import { tagService } from "modules/tag/index.js";
import { goalService } from "modules/goal/goal.service.js";
import { projectService } from "modules/project/project.service.js";
import { timelyticService } from "modules/timelytic/timelytic.service.js";
import { analyticsService } from "modules/analytics/analytics.service.js";
import dayjs, { Dayjs } from "dayjs";
import { authService } from "modules/auth/auth.service.js";
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);

const createTask = async (data: CreateTaskWithIdsSchema): Promise<Task> => {
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

const fetchUserTasks = async (data: FetchUserTasksInputSchema): Promise<Task[]> => {
  try {
    return await prisma.task.findMany({
      where: {
        OR: [
          { userId: data.userId }, // Direct user-owned tasks
          { project: { goal: { userId: data.userId } } }, // Tasks linked via goal's userId
        ],
      },
    });
  } catch (err) {
    throw new RequestError("Problem occurred while fetching tasks", 500, err);
  }
};

const fetchRoutineTasks = async (data: FetchUserTasksInputSchema): Promise<Task[]> => {
  try {
    return await prisma.task.findMany({
      where:
        data,
    });
  } catch (err) {
    throw new RequestError("Problem occurred while fetching tasks", 500, err);
  }
};

const fetchTasks = async (data: FetchTasksInputSchema): Promise<Task[]> => {
  return await prisma.task.findMany({
    where: data,
  });
};

const fetchTasksWithIds = async (data: FetchTasksWithIdsSchema): Promise<Task[]> => {
  return await prisma.task.findMany({
    where: {
      id: {
        in: data,
      },
    },
  });
};

const deleteTask = async (data: DeleteTaskInputSchema): Promise<void> => {
  const { id } = data;
  try {
    await prisma.$transaction(async (tx) => {
      const tags = await tx.tag.findMany({
        where: {
          taskIds: {
            has: id,
          },
        },
      });

      for (const tag of tags) {
        const updatedTaskIds = tag.taskIds.filter(taskId => taskId !== id);
        await tx.tag.update({
          where: { id: tag.id },
          data: { taskIds: updatedTaskIds },
        });
      }

      await tx.task.delete({ where: { id } });
    });
  } catch (err) {
    throw new RequestError("Problem occurred while deleting task", 500, err);
  }
};


const fetchScheduledTasks = async (data: FetchUserTasksInputSchema): Promise<Task[]> => {
  try {
    const now = dayjs().utc().startOf("minute");

    // Tasks due in...
    const windows = [
      {
        start: now,
        end: now.add(1, "minute"),
      },
      {
        start: now.add(30, "minute"),
        end: now.add(30, "minute").add(1, "minute"),
      },
      {
        start: now.add(1, "hour"),
        end: now.add(1, "hour").add(1, "minute"),
      },
      {
        start: now.add(6, "hour"),
        end: now.add(6, "hour").add(1, "minute"),
      },
      {
        start: now.add(24, "hour"),
        end: now.add(24, "hour").add(1, "minute"),
      },
    ];

    const routineWindows = windows.slice(0, 3);

    const nonRoutineFilters = windows.map((window) => ({
      deadline: {
        gte: window.start.toDate(),
        lte: window.end.toDate(),
      },
    }));

    const nonRoutineTasks = await prisma.task.findMany({
      where: {
        AND: [
          {
            OR: [
              { userId: data.userId },
              { project: { goal: { userId: data.userId } } },
            ],
          },
          { taskType: { not: "ROUTINE" } },
          { OR: nonRoutineFilters },
        ],
      },
    });

    // For routine tasks, we ignore the day and compare only hour and minute.
    const allRoutineTasks = await prisma.task.findMany({
      where: {
        AND: [
          {
            OR: [
              { userId: data.userId },
              { project: { goal: { userId: data.userId } } },
            ],
          },
          { taskType: "ROUTINE" },
        ],
      },
    });

    const routineTasks = allRoutineTasks.filter((task) => {
      const taskDeadline = dayjs(task.deadline).utc();
      return routineWindows.some((window) => {
        return (
          taskDeadline.hour() === window.start.hour() &&
          taskDeadline.minute() === window.start.minute()
        );
      });
    });

    // Combine both sets of tasks and return.
    return [...nonRoutineTasks, ...routineTasks];
  } catch (err) {
    throw new RequestError("Problem occurred while fetching scheduled tasks", 500, err);
  }
};

const updateTasks = async (data: UpdateTasksSchema): Promise<Task[]> => {
  try {
    // Verify the user actually owns these tasks
    const user = await authService.getUser({ id: data.user.id })
    await verifyOwnership({ tasks: data.tasks, userId: data.user.id });

    // Fetch data concurrently for efficiency.
    const [timelytic, analytics, oldTasks] = await Promise.all([
      timelyticService.fetchTimelytic({ userId: data.user.id }),
      analyticsService.fetchAnalyticsData({ userId: data.user.id }),
      fetchTasksWithIds(data.tasks.map((task) => task.id)),
    ]);

    // Process each task concurrently.
    const updatedTasks = await Promise.all(
      data.tasks.map(async (task) => {
        // Get the associated tags for this task.
        const tags = await tagService.fetchTagsWithIds(task.tagIds);
        const oldTask = oldTasks.find((t) => t.id === task.id);

        // If the task wasn't found in the database, skip it.
        if (!oldTask) return null;

        // Determine if the completion time should change.
        const calculateCompletedAt = (): Dayjs | null | undefined => {
          if (oldTask.isCompleted === task.isCompleted) return undefined;
          return oldTask.isCompleted && !task.isCompleted ? null : dayjs().utc().tz(user.timeZone);
        };

        // Calculate the timelytic flag and update analytics if needed.
        const calculateTimelyticTask = async (): Promise<boolean | undefined> => {
          const hasChanged = oldTask.isCompleted !== task.isCompleted;

          // When timelytic is not running.
          if (!timelytic.isRunning) {
            if (!hasChanged) return undefined;
            if (oldTask.timelyticTask) {
              analytics.timelyticTasksFinished--;
              if (analytics.timelyticTasksFinished > 0) {
                await analyticsService.updateTimelyticTasksFinished({
                  userId: data.user.id,
                  timelyticTasksFinished: analytics.timelyticTasksFinished,
                });
              }
              return false;
            }
            return undefined;
          }

          // When timelytic is running and no change occurred.
          if (!hasChanged) return undefined;

          // If the task was timelytic and already marked completed, revert it.
          if (oldTask.timelyticTask && oldTask.isCompleted) {
            analytics.timelyticTasksFinished--;
            if (analytics.timelyticTasksFinished > 0) {
              await analyticsService.updateTimelyticTasksFinished({
                userId: data.user.id,
                timelyticTasksFinished: analytics.timelyticTasksFinished,
              });
            }
            task.isCompleted = false;
            return false;
          }

          // If the task was not a timelytic task and not completed, mark it completed.
          if (!oldTask.timelyticTask && !oldTask.isCompleted) {
            analytics.timelyticTasksFinished++;
            if (analytics.timelyticTasksFinished > 0) {
              await analyticsService.updateTimelyticTasksFinished({
                userId: data.user.id,
                timelyticTasksFinished: analytics.timelyticTasksFinished,
              });
            }
            task.isCompleted = true;
            return true;
          }

          return undefined;
        };

        // Update the tags related to the task.
        await tagService.updateTasks({
          tagIds: tags.map((tag) => tag.id),
          taskId: task.id,
        });

        // Calculate timelyticTask (which may update analytics).
        const timelyticTask = await calculateTimelyticTask();

        // Finally, update the task record in the database.
        const updatedTask = await prisma.task.update({
          where: { id: task.id },
          data: {
            ...task,
            tagIds: tags.map((tag) => tag.id),
            updatedAt: dayjs().utc().toISOString(),
            completedAt: calculateCompletedAt()?.format(ISOFormatUTC),
            timelyticTask: timelyticTask,
          },
        });

        return updatedTask;
      })
    );

    // Filter out any nulls (tasks that weren't found).
    return updatedTasks.filter((task) => task !== null);
  } catch (err) {
    throw new RequestError("Problem occurred while updating tasks", 500, err);
  }
};

const verifyOwnership = async (data: VerifyOwnershipSchema) => {
  try {
    const userId = data.userId;
    const goals = await goalService.fetchGoals({ userId });
    const goalIds = goals.map(goal => goal.id);
    const projects = await projectService.fetchProjects({ goalIds: goalIds });

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
        if (!project) {
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
  fetchUserTasks,
  fetchRoutineTasks,
  fetchScheduledTasks,
};
