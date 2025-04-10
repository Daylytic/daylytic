import { prisma } from "utils/prisma.js"
import { TimelyticSchema, UpdateTimelyticInputSchema, TimelyticInputSchema } from "./timelytic.schema.js";
import { RequestError } from "utils/error.js";

const initializeTimelytic = async (data: TimelyticInputSchema): Promise<TimelyticSchema> => {
    try {
        return await prisma.timelytic.upsert({
            where: data,
            update: {},
            create: data,
        });;
    } catch (err) {
        throw new RequestError("Problem occured while creating timelytic profile", 500, err);
    }
};

const fetchTimelytic = async (data: TimelyticInputSchema): Promise<TimelyticSchema> => {
    try {
        return await prisma.timelytic.findFirstOrThrow({
            where: data,
        });
    } catch (err) {
        throw new RequestError("Problem occured while fetching timelytic profile", 500, err);
    }
};

const updateTimelytic = async (data: UpdateTimelyticInputSchema): Promise<TimelyticSchema> => {
    try {
        return await prisma.timelytic.update({
            where: { userId: data.userId },
            data: data,
        });;
    } catch (err) {
        throw new RequestError("Problem occured while fetching timelytic profile", 500, err);
    }
};

export const timelyticService = {
    initializeTimelytic,
    fetchTimelytic,
    updateTimelytic,
}