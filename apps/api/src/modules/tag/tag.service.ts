import { prisma } from "utils/prisma.js";
import { CreateTagSchema, DeleteTagSchema, UpdateTagSchema } from "./index.js";
import { RequestError } from "utils/error.js";

const createTag = async (data: CreateTagSchema) => {
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

export const tagService = {
    createTag,
    deleteTag,
    updateTag,
}