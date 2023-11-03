import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { BaseResponse } from '@/shared/models/base-response'
import { makeRegisterUserUseCase } from '@/use-cases/factories/make-register-user-use-case'
import { UserAlreadyExistsError } from '@/use-cases/errors'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const body = z.object({
    name: z.string({ required_error: 'Nome é obrigatório' }),
    email: z.string({ required_error: 'E-mail é obrigatório' }).email({
      message: 'E-mail inválido',
    }),
    password: z.string({ required_error: 'Senha é obrigatória' }),
  })

  const { name, email, password } = body.parse(request.body)

  const responseBody: BaseResponse = {
    data: null,
    message: 'Usuário criado com sucesso',
    statusCode: 201,
  }

  try {
    const registerUseCase = makeRegisterUserUseCase()
    const data = await registerUseCase.execute({ name, email, password })
    const { user } = data
    responseBody.data = {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    }
    return reply.status(201).send(responseBody)
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      responseBody.message = 'E-mail já cadastrado'
      responseBody.errors = [error.message]
      responseBody.statusCode = 409
      return reply.status(409).send(responseBody)
    }
    throw error
  }
}
