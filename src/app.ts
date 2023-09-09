import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import { Prisma } from '@prisma/client'
import { userRoutes } from './interface/controllers/users/routes'
import { healthRoutes } from './interface/controllers/health/route'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import { env } from '@/env'
import { ResponseError } from './shared/models/response-error'

export const app = fastify({
  logger: true,
})

app.setErrorHandler((error, _, reply) => {
  const responseBody: ResponseError = {
    message: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
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
  const responseBody: ResponseError = {
    message: 'Rota não encontrada',
    statusCode: 404,
  }
  return reply.status(404).send(responseBody)
})

app.register(healthRoutes)
app.register(fastifyCookie)
app.register(userRoutes)
