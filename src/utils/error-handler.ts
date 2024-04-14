import { FastifyInstance } from "fastify";
import { BadRequestError } from "../routes/_errors/bad-request";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = async (
  error,
  request,
  reply
) => {
  if (error instanceof ZodError) {
    return reply.code(400).send({
      message: "Validation error",
      errors: error.errors.map((error) => error.message),
    });
  }

  if (error instanceof BadRequestError) {
    return reply.code(400).send({
      message: error.message,
    });
  }

  return reply.status(500).send({
    message: "Internal server error",
  });
};
