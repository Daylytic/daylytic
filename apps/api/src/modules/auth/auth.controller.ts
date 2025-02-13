import { FastifyReply, FastifyRequest } from "fastify";
import { authService } from "./index.js";
import { isValidTimeZone } from "utils/date.js";
import { LoadUserInput } from "./auth.schema.js";
import { analyticsService } from "modules/analytics/analytics.service.js";
import { RequestError } from "utils/error.js";

const login = async (req: FastifyRequest, rep: FastifyReply) => {
  const { token, timeZone } = req.body as LoadUserInput;

  try {
    const user = (await authService.getAuthenticationProfile({ token: token }))
      .user;
    await analyticsService.initializeAnalytics({ userId: user.id });
    return user;
  } catch (err) {
    try {
      if (isValidTimeZone(timeZone)) {
        const { user } = await authService.createAuthenticationProfile({
          token: token,
          timeZone: timeZone!,
        });
        await analyticsService.initializeAnalytics({ userId: user.id });
        return user;
      }
    } catch (err: any) {
      if (err instanceof RequestError) {
        return rep.status(err.status).send({ error: err.message });
      }

      console.error(err);
      rep.status(500).send();
    }
  }
};

const logout = async (req: FastifyRequest, rep: FastifyReply) => {
  authService.deleteSession({ token: req.session!.token });
  return { status: "success" };
};

const authenticate = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new RequestError("Unauthorized", 401);
    }

    const token = authHeader.split(" ")[1];
    const { user, session } = await authService.getAuthenticationProfile({
      token: token,
    });

    const now = Date.now();

    if(session.validUntil.getTime() <= now) {
      authService.deleteSession(session);
      throw new RequestError("Session has expired.", 401);
    }

    await analyticsService.initializeAnalytics({ userId: user.id });

    req.user = await authService.updateLastSeen({ id: user.id });
    req.session = session;
  } catch (err) {
    if (err instanceof RequestError) {
      return rep.status(err.status).send({ error: err.message });
    }

    console.error(err);
    rep.status(500).send();
  }
};

export const authController = {
  login,
  logout,
  authenticate,
};
