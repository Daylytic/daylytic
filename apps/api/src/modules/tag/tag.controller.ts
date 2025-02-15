import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateTagSchema,
  DeleteTagSchema,
  FetchTagsInputSchema,
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
    tagService.createTag({
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
        const {id} = req.body as DeleteTagSchema;
        tagService.deleteTag({id: id, userId: userId});
    } catch (err) {
        handleControllerError(err, rep);
    }
}

export const tagController = {
  fetchTags,
  createTag,
  deleteTag,
};
