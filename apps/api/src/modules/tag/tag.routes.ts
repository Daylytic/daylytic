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
      tags: ["routine"],
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
      tags: ["routine"],
      body: $ref("CreateTagInputSchema"),
      headers: $refAuth("HeaderBearerSchema"),
      response: {
        201: $ref("TagSchema"),
      },
    },
  });

  server.route({
    url: "/",
    method: "DELETE",
    preHandler: [authController.authenticate],
    handler: tagController.deleteTag,
    schema: {
      description: "Delete tag",
      tags: ["routine"],
      body: $ref("DeleteTagInputSchema"),
      headers: $refAuth("HeaderBearerSchema"),
    },
  });
};
