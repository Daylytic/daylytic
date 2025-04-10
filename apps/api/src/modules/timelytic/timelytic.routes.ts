import { FastifyPluginAsync } from "fastify";
import { authController } from "modules/auth/auth.controller.js";
import { $ref } from "./timelytic.schema.js";
import { $ref as $refAuth } from "modules/auth/auth.schema.js";
import { timelyticController } from "modules/timelytic/timelytic.controller.js";

export const timelyticHandler: FastifyPluginAsync = async (server, _) => {

    // Fetch Timelytic
    server.route({
        url: "/",
        method: "GET",
        preHandler: [
            authController.authenticate,
        ],
        handler: timelyticController.fetchTimelytic,
        schema: {
            description: "Fetches timelytic from specific user",
            tags: ["timelytic"],
            headers: $refAuth("HeaderBearerSchema"),
            response: {
                201: $ref("TimelyticSchema"),
            },
        },
    });

    // Update Timelytic
    // server.route({
    //     url: "/",
    //     method: "PUT",
    //     preHandler: [
    //         authController.authenticate,
    //     ],
    //     handler: timelyticController.updateTimelytic,
    //     schema: {
    //         description: "Updates the data of timelytic object",
    //         tags: ["timelytic"],
    //         headers: $refAuth("HeaderBearerSchema"),
    //         body: $ref("TimelyticSchema"),
    //         response: {
    //             201: $ref("TimelyticSchema"),
    //         },
    //     },
    // });

    // Reset Timelytic
    server.route({
        url: "/reset",
        method: "PUT",
        preHandler: [
            authController.authenticate,
        ],
        handler: timelyticController.resetTimelytic,
        schema: {
            description: "Resets the timelytic data",
            tags: ["timelytic"],
            headers: $refAuth("HeaderBearerSchema"),
            body: $ref("ResetTimelyticInputSchema"),
            response: {
                201: $ref("TimelyticSchema"),
            },
        },
    });

    // Pause Timelytic
    server.route({
        url: "/pause",
        method: "PUT",
        preHandler: [
            authController.authenticate,
        ],
        handler: timelyticController.pauseTimelytic,
        schema: {
            description: "Pauses the timelytic timer",
            tags: ["timelytic"],
            headers: $refAuth("HeaderBearerSchema"),
            body: $ref("TimelyticWithTimeInputSchema"),
            response: {
                201: $ref("TimelyticSchema"),
            },
        },
    });

    // End Timelytic
    server.route({
        url: "/end",
        method: "PUT",
        preHandler: [
            authController.authenticate,
        ],
        handler: timelyticController.endTimelytic,
        schema: {
            description: "Ends timelytic timer",
            tags: ["timelytic"],
            headers: $refAuth("HeaderBearerSchema"),
            body: $ref("TimelyticWithTimeInputSchema"),
            response: {
                201: $ref("TimelyticSchema"),
            },
        },
    });

    // Continues Timelytic Timer
    server.route({
        url: "/continue",
        method: "PUT",
        preHandler: [
            authController.authenticate,
        ],
        handler: timelyticController.continueTimelytic,
        schema: {
            description: "Updates the data of timelytic object",
            tags: ["timelytic"],
            headers: $refAuth("HeaderBearerSchema"),
            body: $ref("TimelyticWithTimeInputSchema"),
            response: {
                201: $ref("TimelyticSchema"),
            },
        },
    });
};
