import { prisma } from "../../../utils/prisma.js";
import { CreateUserInput } from "../auth.schema.js";

export const existsUser = async (data: CreateUserInput): Promise<boolean> => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: data.email },
                    { id: data.id },
                ],
            },
        });

        return user !== null;
    } catch (error) {
        console.error("Error checking if user exists:", error);
        throw new Error("Failed to check user existence");
    }
};