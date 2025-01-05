import { prisma } from "../../utils/prisma.js"
import { CreateUserInput } from "./auth.schema.js";

interface getGoogleAccountProps {
    token: string;
}

const getGoogleAccount = async ({ token }: getGoogleAccountProps): Promise<CreateUserInput> => {
    try {
        const userInfoResponse = await fetch(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        );

        if (!userInfoResponse.ok) {
            throw Error();
        }

        const data = await userInfoResponse.json();
        return { id: data.id, email: data.email, name: data.name };
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
}


export const createUser = async (input: CreateUserInput) => {
    const user = await prisma.user.create({ data: input })
    return user;
}

export const authService = {
    getGoogleAccount,
    createUser,
};