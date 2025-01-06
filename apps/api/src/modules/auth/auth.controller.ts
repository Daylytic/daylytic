import { FastifyReply, FastifyRequest } from "fastify";
import { authService } from "./index.js";
import { existsUser } from "./validators/exists-user.js";

export const googleAuthentication = async (req: FastifyRequest, rep: FastifyReply) => {
    const { token } = req.body as { token: string | undefined }; // Type assertion if needed

    if (!token) {
        return rep.status(400).send({ error: "Token is required" });
    }
    try {
        const authInfo = await authService.getGoogleAccount({ token });

        console.log(authInfo)
        if(await existsUser(authInfo)) {
            return { user: authInfo }
        }

        const user = authService.createUser(authInfo);
        return { user: user };
    } catch (error: any) {
        rep.status(401).send({ error: error.message });
    }
}

const authenticate = async (req: FastifyRequest, rep: FastifyReply) => {
    
}

export const authController = {
    authenticate,
} 

// import { OAuth2Client } from "google-auth-library";

// const client = new OAuth2Client(CLIENT_ID);

// async function verifyToken(token: string) {
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: CLIENT_ID,
//     });
//     const payload = ticket.getPayload();
//     return payload; // Contains user details like 'sub' (Google ID) and 'email'
// }