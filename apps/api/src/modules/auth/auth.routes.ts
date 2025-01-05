import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { authService } from './auth.service.js';
import { googleAuthentication } from './auth.controller.js';
import { $ref } from './auth.schema.js';

export const authHandler: FastifyPluginAsync = async (server, _) => {
    // server.route({url: "/google", handler: googleAuthentication});
    server.route({
        url: "/google", method: "POST", handler: googleAuthentication, schema: {
            body: $ref("createUserSchema"),
            response: {
                201: $ref("createUserSchemaResponse")
            }
        }
    })
};