import { FastifyReply, FastifyRequest } from "fastify";
import { authService } from "./index.js";
import { isValidTimeZone } from "../../utils/date.js";
import { CreateUserInput } from "./auth.schema.js";
import { analyticsService } from "../analytics/analytics.service.js";

const login = async (req: FastifyRequest, rep: FastifyReply) => {
    const { token, timeZone } = req.body as CreateUserInput;

    try {
        const user = (await authService.getAuthenticationProfile(token)).user;
        analyticsService.initializeAnalytics({userId: user.id})
        return user;
    } catch (err) {
        console.error(err);
        try {
            if(isValidTimeZone(timeZone)) {
                const { user } = await authService.createAuthenticationProfile(token, timeZone!);
                analyticsService.initializeAnalytics({userId: user.id})
                return user;
            }
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
        analyticsService.initializeAnalytics({userId: user.id})

        req.user = await authService.updateLastSeen(user.id);
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