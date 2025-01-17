import { RequestError } from "utils/error.js";
import { prisma } from "utils/prisma.js";
import {
  CreateTaskWithIdSchema,
  Task,
  DeleteTaskWithIdInputSchema,
  FetchTaskInputSchema,
  UpdateTaskWithIdInputSchema,
} from "./task.schema.js";

const createTask = async (data: CreateTaskWithIdSchema): Promise<Task> => {
  try {
    return await prisma.task.create({
      data: data,
    });
  } catch (err) {
    throw new RequestError("Problem occured while creating task", 500);
  }
};

const getTasks = async (data: FetchTaskInputSchema): Promise<Task[]> => {
  return await prisma.task.findMany({
    where: data,
    include: {
      tags: true,
    },
  });
};

const deleteTask = async (data: DeleteTaskWithIdInputSchema): Promise<void> => {
  try {
    await prisma.task.delete({
      where: data,
    });
  } catch (err) {
    throw new RequestError("Problem occured while deleting task", 500);
  }
};

const updateTask = async (data: UpdateTaskInputSchema) => {
  try {
    // Extract the tags from the incoming data
    const incomingTags = data.tags!;

    // Fetch current task's tags
    const currentTask = await prisma.task.findUnique({
      where: { id: data.id },
      include: { tags: true },
    });

    if (!currentTask) {
      throw new RequestError(`Task with id ${data.id} not found`, 404);
    }

    // Get current tag IDs
    const currentTags = currentTask.tags;

    // Prepare to find existing tags
    const tagsToCreate = [];
    const tagsToConnect = [];

    for (const incomingTag of incomingTags) {
      const existingTag = await prisma.tag.findFirst({
        where: {
          name: incomingTag.name,
          color: incomingTag.color,
        },
      });

      if (existingTag) {
        tagsToConnect.push({ id: existingTag.id });
      } else {
        tagsToCreate.push(incomingTag);
      }
    }

    // Determine tags to disconnect
    const incomingTagIdentifiers = incomingTags.map(
      (tag) => `${tag.name}-${tag.color}`
    );

    const tagsToDisconnect = currentTags.filter(
      (currentTag) =>
        !incomingTagIdentifiers.includes(`${currentTag.name}-${currentTag.color}`)
    );

    // Update the task
    await prisma.task.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
        tags: {
          // Create new tags
          create: tagsToCreate,

          // Connect existing tags
          connect: tagsToConnect,

          // Disconnect tags that are no longer present
          disconnect: tagsToDisconnect.map((tag) => ({ id: tag.id })),
        },
      },
    });

    return { message: "Task updated successfully" };
  } catch (err) {
    throw new RequestError(`Problem occurred while updating task: ${err}`, 500);
  }
};

export const taskService = {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
};
