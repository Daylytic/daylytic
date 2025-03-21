import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateTagSchema,
  DeleteTagInputSchema,
  UpdateTagInputSchema,
} from "./tag.schema.js";
import { tagService } from "./tag.service.js";
import { handleControllerError } from "utils/error.js";

const fetchTags = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const userId = req.user!.id;
    return await tagService.fetchTags({ userId: userId });
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const createTag = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const userId = req.user!.id;
    const { color, name } = req.body as CreateTagSchema;
    return await tagService.createTag({
      color: color,
      name: name,
      userId: userId,
    });
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const deleteTag = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const userId = req.user!.id;
    const { tagId } = req.params as DeleteTagInputSchema;
    return await tagService.deleteTag({ id: tagId, userId: userId });
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const updateTag = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const userId = req.user!.id;
    const { name, color, id } = req.body as UpdateTagInputSchema;
    tagService.updateTag({ name, color, id, userId })
  } catch (err) {
    handleControllerError(err, rep);
  }
}

export const tagController = {
  fetchTags,
  createTag,
  deleteTag,
  updateTag,
};
