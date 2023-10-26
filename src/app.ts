import fastify from 'fastify'
import { healthRoutes } from './http/controllers/health/route'
import { userRoutes } from './http/controllers/users/routes'

export const app = fastify({
  logger: true,
})

app.register(healthRoutes)
app.register(userRoutes)

app.setErrorHandler((_, __, reply) => {
  return reply.status(500).send({
    message: 'Internal server error',
  })
})
