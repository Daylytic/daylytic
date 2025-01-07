import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { authService } from './auth.service.js';
import { $ref } from './auth.schema.js';
import { authController } from './auth.controller.js';

export const authHandler: FastifyPluginAsync = async (server, _) => {
    server.route({
        url: "/google", method: "POST", handler: authController.login, schema: {
            tags: ["auth"],
            description: "Creates an account with session in the db, and returns user object.",
            body: $ref("createUserSchema"),
            response: {
                201: $ref("userCore")
            }
        }
    });

    server.route({
        url: "/google", method: "DELETE", preHandler: authController.authenticate, handler: authController.logout, schema: {
            tags: ["auth"],
            description: "Logs out session assosiated with the bearer",
            headers: $ref("headersBearer"),
            response: {
                204: {
                    description: "Succesfully logged out from the account",
                }
            }
        }
    });
};