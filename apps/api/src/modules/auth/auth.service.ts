import { prisma } from "../../utils/prisma.js"
import { CreateUserInput, SessionCore, UserCore } from "./auth.schema.js";
import { existsUser } from "./validators/index.js";

/// Load existing session or create a new one.
const initiateSession = async (token: string) : Promise<UserCore> => {
    try {
        const session = await prisma.session.findFirstOrThrow({where: {token: token}});
        const user = await getUser(session);
        
        return user;
    }catch(_) {
        try {
            const googleAccount = await fetchGoogleAccountInfo(token);
            createSession({token: token, userId: googleAccount.id});
            const user = await createUser(googleAccount);
            return user;
        } catch(err) {
            throw err;
        }
    }
}

// Returns first user from the database / throws an error
const getUser = async(session: SessionCore) : Promise<UserCore> => {
    try {
        const user = await prisma.user.findFirstOrThrow({where: {id: session.userId}})
        return user;
    }catch(err) {
        throw Error("Could not find user with given userId");
    }
}

export const verifyToken = async (token: string) => {
    const authInfo = await authService.getGoogleAccount(token);

    if(await existsUser(authInfo)) {
        return { user: authInfo }
    }

    const user = authService.createUser(authInfo);
    return user;
}

const fetchGoogleAccountInfo = async (token: string): Promise<CreateUserInput> => {
    const userDetails = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        }
    );
    
    if(!userDetails.ok) {
        throw new Error("Given token is not linked with any google account.")
    }

    return await userDetails.json();
}

const getGoogleAccount = async (token: string): Promise<CreateUserInput> => {
    try {
        const accountInfo = await fetchGoogleAccountInfo(token);
        if(accountInfo === undefined) {
            throw Error();
        }

        return { id: accountInfo.id, email: accountInfo.email, name: accountInfo.name };
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
}


export const createUser = async (input: CreateUserInput) => {
    const user = await prisma.user.create({ data: input })
    return user;
}

export const createSession = async (input: SessionCore) => {
    const session = await prisma.session.create({ data: input});
    return session;
}

export const authService = {
    getGoogleAccount,
    createUser,
    initiateSession,
    verifyToken,
};