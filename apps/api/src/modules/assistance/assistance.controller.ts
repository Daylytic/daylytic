import { FastifyReply, FastifyRequest } from "fastify";
import { handleControllerError, RequestError } from "utils/error.js";
import { assistanceService } from "modules/assistance/assistance.service.js";
import { QuestionResponsesSchema } from "modules/assistance/assistance.schema.js";
import { questions } from "@daylytic/shared/constants";

const createAssistance = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        const userId = req.user!.id;
        const answers = req.body as QuestionResponsesSchema;

        if (!answers || Object.keys(answers).length < 1) {
            throw new RequestError("You did not provide any questions.", 403, null)
        }

        try {
            QuestionResponsesSchema.parse(answers);
        } catch (err) {
            throw new RequestError("You did not provide valid questions", 403, null)
        }

        const formattedAnswers: Record<string, string | number> = {};

        for (const [questionId, answer] of Object.entries(answers)) {
            const question = questions.find(q => q.id === questionId);

            if (!question) {
                throw new RequestError(`Invalid question ID: ${questionId}`, 400, null);
            }

            // Validate answer
            if (question.answerType === "select") {
                if (typeof answer !== "string" || !question.options!.includes(answer)) {
                    throw new RequestError(
                        `Invalid answer for question "${question.questionText}". Expected one of: ${question.options!.join(", ")}`,
                        400,
                        null
                    );
                }
            } else if (question.answerType === "number") {
                if (typeof answer !== "number" || isNaN(answer)) {
                    throw new RequestError(
                        `Invalid answer for question "${question.questionText}". Expected a number.`,
                        400,
                        null
                    );
                }
            }

            // Store answer using the question text instead of the ID
            formattedAnswers[question.questionText] = answer;
        }

        return await assistanceService.createAssistance({ userId, questions: formattedAnswers });
    } catch (err) {
        handleControllerError(err, rep);
    }
};

const fetchAssistances = async (req: FastifyRequest, rep: FastifyReply) => {

    try {
        const userId = req.user!.id;
        return await assistanceService.fetchAssistances({ userId: userId });
    } catch (err) {
        handleControllerError(err, rep);
    }
};

export const assistanceController = {
    createAssistance,
    fetchAssistances
}