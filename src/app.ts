import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import { Prisma } from '@prisma/client'
import { userRoutes } from './interface/controllers/users/routes'
import { healthRoutes } from './interface/controllers/health/route'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import { env } from '@/env'

export const app = fastify({
  logger: true,
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', stackTrace: error.format() })
  }
  if (error instanceof fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
    reply.status(500).send({ ok: false })
    return
  }
  if (error instanceof Prisma.PrismaClientInitializationError) {
    reply.status(500).send({
      message:
        'Error connecting to database, please check your connection settings.',
      status_code: 500,
      stack: error.stack,
    })
    return
  }
  reply.send(error)
})

app.register(fastifyJwt, {
  secret: {
    private: env.JWT_SECRET,
    public: env.JWT_SECRET,
  },
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    algorithm: 'HS256',
    expiresIn: '10m',
  },
})

app.register(healthRoutes)
app.register(fastifyCookie)
app.register(userRoutes)
