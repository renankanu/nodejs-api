import fastify from 'fastify'
import { healthRoutes } from './http/controllers/health/route'

export const app = fastify({
  logger: true,
})

app.register(healthRoutes)

app.setErrorHandler((_, __, reply) => {
  return reply.status(500).send({
    message: 'Internal server error',
  })
})
