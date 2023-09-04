import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import { Prisma } from '@prisma/client'
import { userRoutes } from './interface/controllers/users/routes'

export const app = fastify({
  logger: true,
})

app.setErrorHandler((error, request, reply) => {
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

app.register(fastifyCookie)
app.register(userRoutes)
