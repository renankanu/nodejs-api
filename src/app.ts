import fastify from 'fastify'
import { healthRoutes } from './http/controllers/health/route'
import { userRoutes } from './http/controllers/users/routes'
import { fastifyJwt } from '@fastify/jwt'
import { env } from '@/env'
import fastifyCookie from '@fastify/cookie'

export const app = fastify({
  logger: true,
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'token',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})
app.register(fastifyCookie)
app.register(healthRoutes)
app.register(userRoutes)

app.setErrorHandler((_, __, reply) => {
  return reply.status(500).send({
    message: 'Internal server error',
  })
})
