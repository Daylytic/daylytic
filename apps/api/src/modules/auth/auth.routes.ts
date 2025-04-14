import { FastifyPluginAsync } from "fastify";
import { $ref } from "./auth.schema.js";
import { authController } from "./auth.controller.js";

export const authHandler: FastifyPluginAsync = async (server, _) => {
    server.route({
        url: "/google", method: "POST", handler: authController.login, schema: {
            tags: ["auth"],
            description: "Creates an account with session in the db, and returns user object.",
            body: $ref("LoadUserInputSchema"),
            response: {
                201: $ref("UserSchema")
            }
        }
    });

    server.route({
        url: "/timezone/:timeZone", method: "PATCH", preHandler: authController.authenticate, handler: authController.updateTimezone, schema: {
            tags: ["auth"],
            description: "Updates current timezone for user",
            params: $ref("UpdateTimezoneInputSchema"),
            headers: $ref("HeaderBearerSchema"),
            response: {
                201: $ref("UserSchema")
            }
        }
    });

    server.route({
        url: "/theme/:theme", method: "PATCH", preHandler: authController.authenticate, handler: authController.updateTheme, schema: {
            tags: ["auth"],
            description: "Updates current theme for user",
            params: $ref("UpdateThemeInputSchema"),
            headers: $ref("HeaderBearerSchema"),
            response: {
                201: $ref("UserSchema")
            }
        }
    });

    server.route({
        url: "/notification/subscribe", method: "POST", preHandler: authController.authenticate, handler: authController.subscribeToNotifications, schema: {
            tags: ["auth"],
            description: "Subscribe user to notifications",
            body: $ref("CreateNotificationSubscriptionInputSchema"),
            headers: $ref("HeaderBearerSchema"),
            response: {
                204: {
                    description: "Succesfully subscribed to notifications",
                }
            }
        }
    });

    server.route({
        url: "/google", method: "DELETE", preHandler: authController.authenticate, handler: authController.logout, schema: {
            tags: ["auth"],
            description: "Logs out session assosiated with the bearer",
            headers: $ref("HeaderBearerSchema"),
            response: {
                204: {
                    description: "Succesfully logged out from the account",
                }
            }
        }
    });
};