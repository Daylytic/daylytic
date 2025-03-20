import { FastifyReply, FastifyRequest } from "fastify";
import { handleControllerError, RequestError } from "utils/error.js";
import { timelyticService } from "modules/timelytic/timelytic.service.js";
import { ResetTimelyticInputSchema, TimelyticSchema, TimelyticWithTimeInputSchema } from "modules/timelytic/timelytic.schema.js";
import { analyticsService } from "modules/analytics/analytics.service.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

const SERVER_TIME_SYNC_TIME = 3 * 1000;

dayjs.extend(utc)

const fetchTimelytic = async (req: FastifyRequest, rep: FastifyReply) => {
    const userId = req.user!.id;
    try {
        return await timelyticService.fetchTimelytic({ userId: userId });
    } catch (err) {
        handleControllerError(err, rep);
    }
};

const resetTimelytic = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        const userId = req.user!.id;
        const { time, duration } = req.body as ResetTimelyticInputSchema;
        const userTime = dayjs(time);

        if (duration === null) {
            throw new RequestError("Duration cannot be null", 400, null);
        }

        if (!userTime.isValid()) {
            throw new RequestError("You did not provide a valid time", 400, null);
        }

        const currentTimelytic = await timelyticService.fetchTimelytic({ userId });

        if (currentTimelytic.deadline !== null) {
            throw new RequestError("You cannot reset timelytic unless you end the session", 400, null);
        }

        const serverTime = dayjs().utc();
        const now = (userTime.diff(serverTime, "seconds")) > SERVER_TIME_SYNC_TIME ? serverTime : userTime;
        const newDeadline = dayjs(now).add(duration, "milliseconds")
        
        return await timelyticService.updateTimelytic({ ...currentTimelytic, userId, duration, pausedTime: null, isRunning: true, deadline: newDeadline.toDate() });
    } catch (err) {
        handleControllerError(err, rep);
    }
};

const pauseTimelytic = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        const userId = req.user!.id;
        const { time } = req.body as TimelyticWithTimeInputSchema;
        const userTime = dayjs(time);

        if (!userTime.isValid()) {
            throw new RequestError("You did not provide a valid time", 400, null);
        }

        const currentTimelytic = await timelyticService.fetchTimelytic({ userId });

        if (currentTimelytic.deadline === null || currentTimelytic.pausedTime !== null) {
            throw new RequestError("You cannot reset pause timelytic if the deadline is null or timelytic is already paused", 400, null);
        }

        const serverTime = dayjs().utc();
        const now = (userTime.diff(serverTime, "seconds")) > SERVER_TIME_SYNC_TIME ? serverTime : userTime;


        return await timelyticService.updateTimelytic({ ...currentTimelytic, userId, pausedTime: dayjs(now).toDate(), isRunning: false });
    } catch (err) {
        handleControllerError(err, rep);
    }
};


const endTimelytic = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        const userId = req.user!.id;
        const { time } = req.body as TimelyticWithTimeInputSchema;
        const userTime = dayjs(time);

        if (!userTime.isValid()) {
            throw new RequestError("You did not provide a valid time", 400, null);
        }

        const currentTimelytic = await timelyticService.fetchTimelytic({ userId });

        if (currentTimelytic.deadline === null || currentTimelytic.duration === null) {
            throw new RequestError("You cannot end timelytic if the deadline or duration is null", 400, null);
        }

        const timelytic = await timelyticService.updateTimelytic({ ...currentTimelytic, userId, deadline: null, pausedTime: null, isRunning: false });

        // Update statistics
        const serverTime = dayjs().utc();

        const now = (userTime.diff(serverTime, "seconds") > SERVER_TIME_SYNC_TIME)
            ? serverTime
            : userTime;

        const startTime = dayjs(currentTimelytic.deadline).subtract(currentTimelytic.duration, "milliseconds")
        const elapsedTime = now.diff(startTime, "seconds");

        const timeSpent = Math.min(elapsedTime, (currentTimelytic.duration / 1000));
        const analytics = await analyticsService.fetchAnalyticsData({ userId });
        await analyticsService.updateTimelyticSessions({ userId, timelyticSessions: analytics.timelyticSessions + 1 })
        await analyticsService.updateTimelyticTimeSpent({ userId, timelyticTimeSpent: analytics.timelyticTimeSpent + timeSpent })

        return timelytic;
    } catch (err) {
        handleControllerError(err, rep);
    }
};

const continueTimelytic = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        const userId = req.user!.id;
        const { time } = req.body as TimelyticWithTimeInputSchema;
        const userTime = dayjs(time);

        if (!userTime.isValid()) {
            throw new RequestError("You did not provide a valid time", 400, null);
        }

        const currentTimelytic = await timelyticService.fetchTimelytic({ userId });

        if (currentTimelytic.deadline === null || currentTimelytic.pausedTime === null) {
            throw new RequestError("You cannot continue timelytic if the deadline or pausedTime is null", 400, null);
        }

        const serverTime = dayjs().utc();

        const now = (userTime.diff(serverTime, "seconds") > SERVER_TIME_SYNC_TIME)
            ? serverTime
            : userTime;

        const pauseDuration = now.diff(currentTimelytic.pausedTime, "seconds");
        const deadline = dayjs(currentTimelytic.deadline).add(pauseDuration, "seconds").toDate();

        return await timelyticService.updateTimelytic({ ...currentTimelytic, userId, deadline, pausedTime: null, isRunning: true });
    } catch (err) {
        handleControllerError(err, rep);
    }
};

export const timelyticController = {
    fetchTimelytic,
    resetTimelytic,
    endTimelytic,
    continueTimelytic,
    pauseTimelytic,

}