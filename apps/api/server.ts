import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { authHandler } from "./src/modules/auth/index.js";
import { Session, User, userSchemas } from "./src/modules/auth/auth.schema.js";

import { routineHandler } from "./src/modules/routine/routine.routes.js";
import { taskSchemas } from "./src/modules/task/index.js";
import { tagHandler, tagSchemas } from "modules/tag/index.js";
import { goalHandler } from "modules/goal/goal.routes.js";
import { projectHandler } from "modules/project/project.routes.js";
import { goalSchemas } from "modules/goal/goal.schema.js";
import { projectSchemas } from "modules/project/project.schema.js";
import { taskHandler } from "modules/task/task.routes.js";

declare module "fastify" {
  interface FastifyRequest {
    session: Session | undefined;
    user: User | undefined;
  }
}

const server = Fastify({ logger: true });

const main = async () => {
  for (const schema of [
    ...userSchemas,
    ...taskSchemas,
    ...tagSchemas,
    ...goalSchemas,
    ...projectSchemas,
  ]) {
    server.addSchema(schema);
  }

  server.addHook("onRequest", async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Credentials", true);
    reply.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, X-Requested-With, Content-Type, Accept, X-Slug, X-UID"
    );
    reply.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, POST, PUT, PATCH, GET, DELETE"
    );
    if (request.method === "OPTIONS") {
      reply.send();
    }
  });

  await server.register(swagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "Daylytic Swagger",
        description: "API for Daylytic",
        version: "0.1.0",
      },
      servers: [
        {
          url: "http://localhost:8084",
          description: "Development server",
        },
      ],
      tags: [
        { name: "auth", description: "Authentication related end-points" },
        { name: "goals", description: "Goals related end-points" },
        { name: "projects", description: "Projects related end-points" },
        { name: "routine", description: "Routine related end-points" },
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: "apiKey",
            name: "apiKey",
            in: "header",
          },
        },
      },
    },
  });

  await server.register(swaggerUi, {
    routePrefix: "/documentation",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  server.register(authHandler, { prefix: "/oauth2" });
  server.register(routineHandler, { prefix: "/routine" });
  server.register(goalHandler, { prefix: "/goal" });
  server.register(projectHandler, { prefix: "/goal/:goalId/project" });
  server.register(taskHandler, {
    prefix: "/goal/:goalId/project/:projectId/task",
  });
  server.register(tagHandler, { prefix: "/tag" });

  try {
    await server.listen({ port: 8084 });
    console.log(`Server listening at https://localhost:8084`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  await server.ready();
  server.swagger();
};

main();
