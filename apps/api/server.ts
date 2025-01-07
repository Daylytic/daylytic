import Fastify from 'fastify';
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

  server.register(authHandler, { prefix: "/oauth2" });
  server.register(goalsHandler, { prefix: "/goals" });

  try {
    await server.listen({ port: 8084 })
    console.log(`Server listening at https://localhost:8084`)
  } catch (err) {
    console.error(err);
    process.exit(1)
  }
}

main();