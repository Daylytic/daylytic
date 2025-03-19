import { FastifyPluginAsync } from "fastify";
import { $ref } from "./contact.schema.js";
import { contactController } from "modules/misc/contact/index.js";

export const contactHandler: FastifyPluginAsync = async (server, _) => {

    // Send Email
    server.route({
        url: "/",
        method: "POST",
        handler: contactController.sendMessage,
        schema: {
            description: "Fetch statistics from Daylytic platform",
            tags: ["stats"],
            body: $ref("ContactInputSchema"),
            response: {
                204: {
                    description: "Sent email successfully",
                },
            },
        },
        // Rate limit to prevent spam
        config: {
            rateLimit: {
                max: 3,
                timeWindow: 60 * 60 * 1000 // 1 hour in milliseconds
            }
        },
    });
};
