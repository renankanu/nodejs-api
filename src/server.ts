import { app } from "./app";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { checkIn } from "./routes/events/check-in";
import { createEvent } from "./routes/events/create-events";
import { getAttendeeBadge } from "./routes/events/get-attendee-badge";
import { getEvent } from "./routes/events/get-event";
import { getEventAttendees } from "./routes/events/get-event-attendees";
import { registerForEvent } from "./routes/events/register-for-event";
import fastify from "fastify";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import { errorHandler } from "./utils/error-handler";
import { fastifyCors } from "@fastify/cors";

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "Event Management API",
      description: "Event Management API",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(fastifyCors, {
  origin: "*",
});

app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);

app.setErrorHandler(errorHandler);

app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("Server started at http://localhost:3333");
});
