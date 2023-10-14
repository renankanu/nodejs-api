import fastify from 'fastify'
import { healthRoutes } from './http/controllers/health/route'

export const app = fastify({
  logger: true,
})

app.register(healthRoutes)
