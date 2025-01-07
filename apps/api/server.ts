import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import postgres from '@fastify/postgres'; // Use import instead of requird
import { authHandler } from './src/modules/auth/index.js'; // Ensure the extension is included
import { SessionCore, UserCore, userSchemas } from './src/modules/auth/auth.schema.js';
import { goalSchemas } from './src/modules/goals/goals.schema.js';
import { goalsHandler } from './src/modules/goals/goals.routes.js';

declare module 'fastify' {
  interface FastifyRequest {
    session: SessionCore | undefined,
    user: UserCore | undefined,
  }
}

const server = Fastify({ logger: true })

const main = async () => {

  for (const schema of [...userSchemas, ...goalSchemas]) {
    server.addSchema(schema);
  }

  server.addHook("onRequest", async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Credentials", true);
    reply.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept, X-Slug, X-UID");
    reply.header("Access-Control-Allow-Methods", "OPTIONS, POST, PUT, PATCH, GET, DELETE");
    if (request.method === "OPTIONS") {
      reply.send();
    }
  });

  await server.register(swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Daylytic Swagger',
        description: 'API for Daylytic',
        version: '0.1.0'
      },
      servers: [
        {
          url: 'http://localhost:8084',
          description: 'Development server'
        }
      ],
      tags: [
        { name: 'auth', description: 'Authentication related end-points' },
        { name: 'goals', description: 'Goals related end-points' }
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: 'apiKey',
            name: 'apiKey',
            in: 'header'
          }
        }
      }
    }
  });

  await server.register(swaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
  })

  server.register(authHandler, { prefix: "/oauth2" });
  server.register(goalsHandler, { prefix: "/goals" });

  try {
    await server.listen({ port: 8084 })
    console.log(`Server listening at https://localhost:8084`)
  } catch (err) {
    console.error(err);
    process.exit(1)
  }
  await server.ready()
  server.swagger()
}

main();