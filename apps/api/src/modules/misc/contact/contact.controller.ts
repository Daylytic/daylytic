import { FastifyReply, FastifyRequest } from "fastify";
import { ContactInputSchema } from "modules/misc/contact/contact.schema.js";
import { contactService } from "modules/misc/contact/contact.service.js";
import { handleControllerError, RequestError } from "utils/error.js";

const sendMessage = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        await contactService.sendMessage(req.body as ContactInputSchema);
        return rep.status(204).send(); // No content response
    } catch (err) {
        handleControllerError(err, rep);
    }
};

export const contactController = {
    sendMessage,
}