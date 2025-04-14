import { FastifyReply, FastifyRequest } from "fastify";
import { authService } from "./index.js";
import { isValidTimeZone } from "utils/date.js";
import { CreateNotificationSubscriptionInputSchema, LoadUserInput, UpdateThemeInputSchema, UpdateTimezoneInputSchema, UpdateTimezoneSchema } from "./auth.schema.js";
import { analyticsService } from "modules/analytics/analytics.service.js";
import { handleControllerError, RequestError } from "utils/error.js";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { routineService } from "modules/routine/routine.service.js";
import { taskService } from "modules/task/task.service.js";
import { timelyticService } from "modules/timelytic/timelytic.service.js";

dayjs.extend(utc);
dayjs.extend(timezone);

const login = async (req: FastifyRequest, rep: FastifyReply) => {
  const { token, timeZone, theme } = req.body as LoadUserInput;

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
          theme: theme,
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

const updateTimezone = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const user = req.user!;

    const { timeZone } = req.params as UpdateTimezoneInputSchema;

    await authService.updateTimezone({ id: user.id, timeZone });
    return { status: "success" };
  } catch (err) {
    handleControllerError(err, rep);
  }
}

const updateTheme = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const user = req.user!;

    const { theme } = req.params as UpdateThemeInputSchema;

    await authService.updateTheme({ id: user.id, theme });
    return { status: "success" };
  } catch (err) {
    handleControllerError(err, rep);
  }
}

const subscribeToNotifications = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const user = req.user!;

    const { keys, endpoint } = req.body as CreateNotificationSubscriptionInputSchema;

    await authService.subscribeToNotifications({ userId: user.id, keys, endpoint });
    return { status: "success" };
  } catch (err) {
    handleControllerError(err, rep);
  }
}

const logout = async (req: FastifyRequest, rep: FastifyReply) => {
  authService.deleteSession({ token: req.session!.token });
  return { status: "success" };
};

const authenticate = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new RequestError("Unauthorized", 401, null);
    }

    const token = authHeader.split(" ")[1];
    const { user, session } = await authService.getAuthenticationProfile({
      token: token,
    });

    if (dayjs(session.validUntil).utc().isBefore(dayjs().utc())) {
      authService.deleteSession(session);
      throw new RequestError("Session has expired.", 401, null);
    }

    req.session = session;

    const difference = dayjs().startOf("day").diff(dayjs(user.lastSeenAt).startOf("day"), "day");
    req.user = user;

    await authService.updateLastSeen({ id: user.id });

    // Initialize analytics
    const analytics = await analyticsService.initializeAnalytics({ userId: user.id });
    await timelyticService.initializeTimelytic({ userId: user.id });

    if (difference > 0) {
      const loginStreak = difference > 1 ? 0 : ++analytics.loginStreak;

      // Update login and record login streak
      await analyticsService.updateLoginStreak({ userId: user.id, loginStreak });
      if (loginStreak > 0 && loginStreak > analytics.recordLoginStreak) {
        await analyticsService.updateRecordLoginStreak({ userId: user.id, recordLoginStreak: loginStreak });
      }
    }


    // Updating routine
    const lastResetDate = dayjs(analytics.lastRoutineReset).tz(user.timeZone);

    const routineDiff = dayjs().utc().tz(user.timeZone).startOf("day").diff(dayjs(lastResetDate).startOf("day"), "day");

    if (routineDiff > 0) {
      const tasks = await taskService.fetchTasks({ userId: user.id });
      const unFinishedTask = tasks.find((task) => task.isCompleted === false && task.taskType === "ROUTINE");
      const routineStreak = (unFinishedTask || routineDiff > 1) ? 0 : ++analytics.routineStreak;

      if (routineStreak > 0 && routineStreak > analytics.recordRoutineStreak) {
        await analyticsService.updateRecordRoutineStreak({ userId: user.id, recordRoutineStreak: routineStreak });
      }

      await analyticsService.updateRoutineStreak({ userId: user.id, routineStreak });
      await analyticsService.updateLastResetDate({ userId: user.id });
      await routineService.resetDailyTasks({ id: user.id });
    }

    // Update timelytics
    const timelytic = await timelyticService.fetchTimelytic({ userId: user.id });

    if (timelytic.isRunning && timelytic.deadline) {
      const deadline = timelytic.deadline;

      if (dayjs().isAfter(deadline) && timelytic.duration) {
        const duration = timelytic.duration / 1000;
        const analytics = await analyticsService.fetchAnalyticsData({ userId: user.id });
        await timelyticService.updateTimelytic({ ...timelytic, isRunning: false, pausedTime: null, deadline: null });
        await analyticsService.updateTimelyticSessions({ userId: user.id, timelyticSessions: analytics.timelyticSessions + 1 });
        await analyticsService.updateTimelyticTimeSpent({ userId: user.id, timelyticTimeSpent: analytics.timelyticTimeSpent + duration });
      }
    }
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
  updateTimezone,
  updateTheme,
  subscribeToNotifications,
};
