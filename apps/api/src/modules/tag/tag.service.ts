import { prisma } from "utils/prisma.js";
import {
  CreateTagSchema,
  DeleteTagSchema,
  FetchTagsInputSchema,
  FetchTagsResponseSchema,
  FetchTagsWithIdsSchema,
  TagSchema,
  UpdateTagInputSchema,
  UpdateTasksForTagSchema,
} from "./index.js";
import { RequestError } from "utils/error.js";

const fetchTags = async (
  data: FetchTagsInputSchema
): Promise<FetchTagsResponseSchema> => {
  try {
    return await prisma.tag.findMany({ where: { userId: data.userId } });
  } catch (err) {
    throw new RequestError(
      "Could not find tags for the specific user",
      404,
      err
    );
  }
};

const createTag = async (data: CreateTagSchema): Promise<TagSchema> => {
  try {
    return await prisma.tag.create({ data: data });
  } catch (err) {
    throw new RequestError("Problem occured while creating tag", 500, err);
  }
};

const deleteTag = async (data: DeleteTagSchema) => {
  try {
    await prisma.tag.delete({ where: data });
  } catch (err) {
    throw new RequestError("Tag with given ID does not exist.", 404, err);
  }
};

const updateTag = async (data: UpdateTagInputSchema): Promise<TagSchema> => {
  try {
    return await prisma.tag.update({
      where: { id: data.id },
      data: { color: data.color, name: data.name },
    });
  } catch (err) {
    throw new RequestError("Problem occured while updating tag", 500, err);
  }
};

const updateTasks = async (data: UpdateTasksForTagSchema): Promise<void> => {
  try {
    const tagsToUpdate = await prisma.tag.findMany({
      where: { taskIds: { has: data.taskId } }
    });

    // For each tag, remove the unwanted taskId and update.
    await Promise.all(tagsToUpdate.map(tag => {
      if(data.tagIds.includes(tag.id)) {
        return;
      }
      
      const newTaskIds = tag.taskIds.filter(id => id !== data.taskId);
      return prisma.tag.update({
        where: { id: tag.id },
        data: { taskIds: { set: newTaskIds } }
      });
    }));

    for (const tagId of data.tagIds) {
      // Retrieve current taskIds for this tag
      const tag = await prisma.tag.findUnique({
        where: { id: tagId },
        select: { taskIds: true },
      });

      // Only push the task id if it doesn't already exist
      if (!tag?.taskIds.includes(data.taskId)) {
        await prisma.tag.update({
          where: { id: tagId },
          data: { taskIds: { push: data.taskId } },
        });
      }
    }
  } catch (err) {
    throw new RequestError("Problem occurred while updating tag", 500, err);
  }
}

const fetchTagsWithIds = async (data: FetchTagsWithIdsSchema): Promise<TagSchema[]> => {
  try {
    const foundTags: TagSchema[] = [];
    for (const id of data) {

      const tag = await prisma.tag.findFirst({
        where: {
          id: id,
        },
      });

      if (!tag) continue;

      foundTags.push(tag);
    }
    return foundTags;
  } catch (err) {
    throw new RequestError(
      "Problem occured when fetching tags with specific id",
      500,
      err
    );
  }
};

export const tagService = {
  fetchTags,
  fetchTagsWithIds,
  createTag,
  deleteTag,
  updateTag,
  updateTasks,
};