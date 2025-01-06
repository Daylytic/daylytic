import { FastifyReply, FastifyRequest } from "fastify";
import { authService } from "./index.js";

export const googleAuthentication = async (req: FastifyRequest, rep: FastifyReply) => {
    const { token } = req.body as { token: string | undefined };

    if (!token) {
        return rep.status(400).send({ error: "Token is required" });
    }

    try {
        const user = await authService.initiateSession(token);
        return { user: user };
    } catch (err: any) {
        rep.status(401).send({ error: err.message });
    }
}

export async function authenticate(req: FastifyRequest, rep: FastifyReply) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return rep.status(401).send({ error: "Unauthorized" });
        }
        
        const token = authHeader.split(" ")[1];
        const user = await authService.initiateSession(token);
        // req.token = user;
        // req.user = user; // Attach user info to the request object
    } catch (error) {
        return rep.status(401).send({ error: "Authentication failed" });
    }
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