import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { authHandler } from "./src/modules/auth/index.js";
import { Session, User, userSchemas } from "./src/modules/auth/auth.schema.js";
import { taskSchemas, taskService } from "./src/modules/task/index.js";
import { tagHandler, tagSchemas } from "modules/tag/index.js";
import { goalHandler } from "modules/goal/goal.routes.js";
import { projectHandler } from "modules/project/project.routes.js";
import { goalSchemas } from "modules/goal/goal.schema.js";
import { projectSchemas } from "modules/project/project.schema.js";
import { taskHandler } from "modules/task/task.routes.js";
import { timelyticSchemas } from "modules/timelytic/timelytic.schema.js";
import { timelyticHandler } from "modules/timelytic/timelytic.routes.js";
import { analyticsSchemas } from "modules/analytics/analytics.schema.js";
import { analyticsHandler } from "modules/analytics/analytics.routes.js";
import { assistanceSchemas } from "modules/assistance/assistance.schema.js";
import { assistanceHandler } from "modules/assistance/index.js";
import { statsHandler } from "modules/misc/stats/stats.routes.js";
import { statsSchemas } from "modules/misc/stats/stats.schema.js";
import { contactSchemas } from "modules/misc/contact/contact.schema.js";
import { contactHandler } from "modules/misc/contact/contact.routes.js";
import { readFileSync } from 'fs';
import { constants } from 'crypto';
import webPush from "web-push";
import fastifyCron from "fastify-cron";
import { prisma } from "utils/prisma.js";
import { getNotificationMessage } from "utils/date.js";

declare module "fastify" {
  interface FastifyRequest {
    session: Session | undefined;
    user: User | undefined;
  }
}

const server = Fastify({
  logger: true,
  trustProxy: process.env.DEV === "true" ? false : true,
  https: process.env.DEV === "true"
    ? null
    : {
      key: readFileSync('/etc/letsencrypt/live/daylytic.com/privkey.pem'),
      cert: readFileSync('/etc/letsencrypt/live/daylytic.com/fullchain.pem'),
      secureOptions: constants.SSL_OP_NO_SSLv2 | constants.SSL_OP_NO_SSLv3,
    }
});

webPush.setVapidDetails(
  "https://daylytic.com/#contact",
  process.env.VAPID_PUBLIC_KEY ?? "",
  process.env.VAPID_PRIVATE_KEY ?? "",
);

server.register(fastifyCron as any, {
  jobs: [
    {
      cronTime: '*/1 * * * *',  // Executes every minute
      onTick: async () => {
        const notifications = await prisma.notificationSubscriptions.findMany();

        // Iterate over each subscription.
        for (const notification of notifications) {
          const tasks = await taskService.fetchScheduledTasks({ userId: notification.userId });

          if (tasks.length === 0) {
            continue;
          }

          try {
            for (const task of tasks) {
              const pushSubscription = {
                endpoint: notification.endpoint,
                keys: notification.keys as { auth: string, p256dh: string },
              };

              const message = getNotificationMessage(task);

              const payload = JSON.stringify({
                title: `Daylytic - ${task.title}`,
                body: message,
                timestamp: new Date().toISOString(),
              });

              await webPush.sendNotification(pushSubscription, payload);
            }
          } catch (err) {
            // Remove the subscription if sending the notification fails.
            await prisma.notificationSubscriptions.delete({
              where: { id: notification.id },
            });
          }
        }
      },
    },
  ],
});

await server.register(import('@fastify/rate-limit'), {
  max: 100,
  timeWindow: '1 minute'
})

const main = async () => {
  for (const schema of [
    ...userSchemas,
    ...taskSchemas,
    ...tagSchemas,
    ...goalSchemas,
    ...projectSchemas,
    ...timelyticSchemas,
    ...analyticsSchemas,
    ...assistanceSchemas,
    ...statsSchemas,
    ...contactSchemas,
  ]) {
    server.addSchema(schema);
  }

  // Start jobs when ready
  server.addHook('onReady', () => {
    server.cron.startAllJobs();
  });


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
          url: "http://localhost:4000",
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
      onRequest: function (_request, _reply, next) {
        next();
      },
      preHandler: function (_request, _reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, _request, _reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  server.register(authHandler, { prefix: "/oauth2" });
  server.register(timelyticHandler, { prefix: "/timelytic" });
  server.register(analyticsHandler, { prefix: "/analytics" });
  server.register(goalHandler, { prefix: "/goal" });
  server.register(projectHandler, { prefix: "/goal" });
  server.register(assistanceHandler, { prefix: "/assistance" });
  server.register(taskHandler, {
    prefix: "/task",
  });
  server.register(tagHandler, { prefix: "/tag" });
  server.register(statsHandler, { prefix: "/stats" });
  server.register(contactHandler, { prefix: "/contact" });

  try {
    await server.listen({ port: 4000, host: process.env.DEV === "true" ? undefined : "0.0.0.0" });
    console.log(`Server listening at https://localhost:4000`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  await server.ready();
  server.swagger();
};

main();
