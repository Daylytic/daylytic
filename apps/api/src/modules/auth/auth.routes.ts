import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { authService } from './auth.service.js';
import { $ref } from './auth.schema.js';
import { authController } from './auth.controller.js';

export const authHandler: FastifyPluginAsync = async (server, _) => {
    // server.route({url: "/google", handler: googleAuthentication});
    server.route({
        url: "/google", method: "POST", handler: authController.login, schema: {
            body: $ref("createUserSchema"),
            response: {
                201: $ref("createUserSchemaResponse")
            }
        }
    });

    server.route({
        url: "/google", method: "DELETE", preHandler: authController.authenticate, handler: authController.logout, schema: {

        }
    });
};