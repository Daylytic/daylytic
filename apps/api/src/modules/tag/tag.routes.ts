import { FastifyPluginAsync } from "fastify";
import { tagController } from "./tag.controller.js";
import { authController } from "modules/auth/index.js";
import { $ref } from "./tag.schema.js";
import { $ref as $refAuth } from "modules/auth/auth.schema.js";

export const tagHandler: FastifyPluginAsync = async (server, _) => {
  server.route({
    url: "/",
    method: "GET",
    preHandler: [authController.authenticate],
    handler: tagController.fetchTags,
    schema: {
      description: "Fetch all tags from the user",
      tags: ["tag"],
      headers: $refAuth("HeaderBearerSchema"),
      response: {
        201: $ref("FetchTagsResponseSchema"),
      },
    },
  });

  server.route({
    url: "/",
    method: "POST",
    preHandler: [authController.authenticate],
    handler: tagController.createTag,
    schema: {
      description: "Create new tag",
      tags: ["tag"],
      body: $ref("CreateTagInputSchema"),
      headers: $refAuth("HeaderBearerSchema"),
      response: {
        201: $ref("TagSchema"),
      },
    },
  });

  server.route({
    url: "/:tagId",
    method: "DELETE",
    preHandler: [authController.authenticate],
    handler: tagController.deleteTag,
    schema: {
      description: "Delete tag",
      tags: ["tag"],
      params: $ref("DeleteTagInputSchema"),
      headers: $refAuth("HeaderBearerSchema"),
    },
  });

  server.route({
    url: "/",
    method: "PUT",
    preHandler: [authController.authenticate],
    handler: tagController.updateTag,
    schema: {
      description: "Update tag",
      tags: ["tag"],
      body: $ref("UpdateTagInputSchema"),
      headers: $refAuth("HeaderBearerSchema"),
    },
  });
};
