import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { app } from "../../app";
import { prisma } from "../../lib/prisma";

export async function getAttendeeBadge(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/attendees/:attendeeId/badge",
    {
      schema: {
        summary: "Get an attendee's badge",
        tags: ["attendees"],
        params: z.object({
          attendeeId: z.coerce.number().int(),
        }),
        response: {
          200: z.object({
            badge: z.object({
              name: z.string(),
              email: z.string().email(),
              event: z.string(),
              checkInUrl: z.string().url(),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { attendeeId } = request.params;

      const attendee = await prisma.attendee.findUnique({
        select: {
          name: true,
          email: true,
          event: {
            select: {
              title: true,
            },
          },
        },
        where: {
          id: attendeeId,
        },
      });

      if (attendee === null) {
        return reply.code(404).send({
          message: "Attendee not found",
        });
      }

      const baseUrl = `${request.protocol}://${request.hostname}`;
      const checkInUrl = new URL(`/attendees/${attendeeId}/check-in`, baseUrl);

      return reply.send({
        badge: {
          name: attendee.name,
          email: attendee.email,
          event: attendee.event.title,
          checkInUrl: checkInUrl.toString(),
        },
      });
    }
  );
}
