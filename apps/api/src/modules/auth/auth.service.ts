import { convertToTimeZoneISO8601 } from "../../utils/date.js";
import { prisma } from "../../utils/prisma.js"
import { $ref, CreateGoogleUserInput, googleAccountCore, SessionCore, UserCore } from "./auth.schema.js";

const getAuthenticationProfile = async (token: string): Promise<{ user: UserCore; session: SessionCore }> => {
    const session = await prisma.session.findFirstOrThrow({ where: { token: token } });

    return { user: await getUser(session.userId), session: session };
}

const createAuthenticationProfile = async (token: string, timeZone: string): Promise<{ user: UserCore; session: SessionCore }> => {
    /* If session doesn't exist in DB, fetch google info about token*/
    const rawGoogleAccount = await fetchGoogleAccountInfo(token);
    const googleAccount = googleAccountCore.parse({...rawGoogleAccount, timeZone: timeZone});
    
    const session = { token: token, userId: googleAccount.id };

    /* Create User if doesnt exist, else get existing user data from google account id */
    const userExists = await prisma.user.findFirst({ where: { id: googleAccount.id } });
    const user = userExists || await createUser({...googleAccount, timeZone: timeZone});

    /* Create Session attached to the userId */
    createSession(session);

    return { user: user, session: session };
}

const deleteSession = async (token: string) => {
    await prisma.session.delete({
        where: {
            token: token,
        }
    })
}

const fetchGoogleAccountInfo = async (token: string): Promise<CreateGoogleUserInput> => {
    const userDetails = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        }
    );

    if (!userDetails.ok) {
        throw new Error("Given token is not linked with any google account.")
    }

    return await userDetails.json();
}

// Create a new user in the database
const createUser = async (input: CreateGoogleUserInput): Promise<UserCore> => {
    return await prisma.user.create({ data: input });
};

// Create a new session in the database
const createSession = async (input: SessionCore): Promise<SessionCore> => {
    return await prisma.session.create({ data: input });
};

// Returns first user from the database / throws an error
const getUser = async (userId: string): Promise<UserCore> => {
    try {
        const user = await prisma.user.findFirstOrThrow({ where: { id: userId } })
        return user;
    } catch (err) {
        throw Error("Could not find user with given userId");
    }
}

const updateLastSeen = async (userId: string) : Promise<UserCore> => {
    const now = convertToTimeZoneISO8601();
    return await prisma.user.update({where: {
        id: userId,
    }, data: {
        lastSeenAt: now
    }});
}

export const authService = {
    createUser,
    createAuthenticationProfile,
    getAuthenticationProfile,
    deleteSession,
    updateLastSeen
};