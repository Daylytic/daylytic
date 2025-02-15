import { prisma } from "utils/prisma.js";
import {
  CreateTagSchema,
  DeleteTagSchema,
  FetchTagsInputSchema,
  FetchTagsResponseSchema,
  FetchTagsWithIdsSchema,
  TagSchema,
  UpdateTagInputSchema,
  UpdateTagSchema,
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

  try {
    await prisma.tag.create({ data: data });
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

const updateTag = async (data: UpdateTagSchema) => {
  try {
    await prisma.tag.update({
      where: { id: data.id },
      data: { color: data.color, name: data.name },
    });
  } catch (err) {
    throw new RequestError("Problem occured while updating tag", 500, err);
  }
};

const fetchTagsWithIds = async (data: FetchTagsWithIdsSchema): Promise<TagSchema[]> => {
  try {
    const foundTags: TagSchema[] = [];
    for (const id of data) {

      const tag = await prisma.tag.findFirst({
        where: {
          id: id,
        },
      });

      console.log(`Found tag: ${tag}`)

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
}