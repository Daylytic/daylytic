import { FastifyReply } from "fastify";

export class RequestError extends Error {
  status: number;

  constructor(message: string, status: number, error: any) {
    super(message + (process.env.DEV === "true" ? ` ${error.message}` : "")); // Call the constructor of the base class `Error`
    this.name = "RequestError"; // Set the error name to your custom error class name
    this.status = status;

    Object.setPrototypeOf(this, RequestError.prototype);
  }
}

export const handleControllerError = (err: any, rep: FastifyReply) => {
  if (err instanceof RequestError) {
    return rep.status(err.status).send({ error: err.message });
  }

  console.error(err);
  rep.status(500).send();
};
