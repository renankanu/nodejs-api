import fastify from 'fastify'
import { healthRoutes } from './http/controllers/health/route'
import { userRoutes } from './http/controllers/users/routes'
import { fastifyJwt } from '@fastify/jwt'
import { env } from '@/env'
import fastifyCookie from '@fastify/cookie'
import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'
import { BaseResponse } from './shared/models/base-response'

export const app = fastify({
  logger: true,
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})
app.register(fastifyCookie)
app.register(healthRoutes)
app.register(userRoutes)

app.setErrorHandler((error, _, reply) => {
  const responseBody: BaseResponse = {
    message: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
    errors: [error.message],
    statusCode: 500,
  }
  if (error instanceof ZodError) {
    const errorMessage = error.errors.map((error) => {
      return error.message
    })
    responseBody.message = 'Erro de validação'
    responseBody.statusCode = 400
    responseBody.errors = errorMessage
    return reply.status(400).send(responseBody)
  }
  if (error instanceof Prisma.PrismaClientInitializationError) {
    responseBody.message = 'Erro ao conectar com o banco de dados'
    return reply.status(500).send(responseBody)
  }
  return reply.status(500).send(responseBody)
})

app.setNotFoundHandler((_, reply) => {
  const responseBody: BaseResponse = {
    message: 'Rota não encontrada',
    statusCode: 404,
  }
  return reply.status(404).send(responseBody)
})
