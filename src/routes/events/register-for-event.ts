import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { BadRequestError } from "../_errors/bad-request";

export async function registerForEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/events/:eventId/attendees",
    {
      schema: {
        summary: "Register for an event",
        tags: ["events"],
        body: z.object({
          name: z.string().min(4),
          email: z.string().email(),
        }),
        params: z.object({
          eventId: z.string().uuid(),
        }),
        response: {
          201: z.object({
            attendeeId: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params;
      const { name, email } = request.body;

      const attendeeFromEmail = await prisma.attendee.findUnique({
        where: {
          email_eventId: {
            email,
            eventId,
          },
        },
      });

      if (attendeeFromEmail !== null) {
        throw new BadRequestError(
          "Attendee with the same email already exists"
        );
      }

      const [event, amountOfAttendees] = await Promise.all([
        prisma.event.findUnique({
          where: {
            id: eventId,
          },
        }),
        await prisma.attendee.count({
          where: {
            eventId,
          },
        }),
      ]);

      if (
        event?.maximumAttendees &&
        amountOfAttendees >= event?.maximumAttendees
      ) {
        throw new BadRequestError("Event is full");
      }

      const attendee = await prisma.attendee.create({
        data: {
          name,
          email,
          eventId,
        },
      });

      return reply.code(201).send({
        attendeeId: attendee.id,
      });
    }
  );
}
