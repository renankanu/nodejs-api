import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import { usersRoutes } from './modules/user/user.route'
import { Prisma } from '@prisma/client'

export const app = fastify({
  logger: true,
})

app.setErrorHandler((error, request, reply) => {
  console.log('error', error)
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
app.register(usersRoutes)
