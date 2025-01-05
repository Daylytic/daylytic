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
            return { success: true, user: authInfo }
        }

        const user = authService.createUser(authInfo);
        return { success: true, user: user };
    } catch (error: any) {
        rep.status(401).send({ error: error.message });
    }
}