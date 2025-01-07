import { FastifyReply, FastifyRequest } from "fastify";
import { authService } from "./index.js";

const login = async (req: FastifyRequest, rep: FastifyReply) => {
    const { token } = req.body as { token: string }

    try {
        return (await authService.getAuthenticationProfile(token)).user;
    } catch (err) {
        try {
            const { user, session } = await authService.createAuthenticationProfile(token);
            return user;
        } catch (err: any) {
            return rep.status(401).send({ error: err.message });
        }
    }
}

const logout = async (req: FastifyRequest, rep: FastifyReply) => {

    authService.deleteSession(req.session!.token);
    return { status: "success" }
}

const authenticate = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return rep.status(401).send({ error: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];
        const { user, session } = await authService.getAuthenticationProfile(token);

        req.user = user;
        req.session = session;
    } catch (error) {
        return rep.status(401).send({ error: "Authentication failed" });
    }
}

export const authController = {
    login,
    logout,
    authenticate,
}