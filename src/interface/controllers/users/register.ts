import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterUserUseCase } from '../../../use-cases/factories/make-register-user-use-case'
import { UserAlreadyExistsError } from '../../../shared/errors/user-already-exists-error'
import { ResponseError } from '@/shared/models/response-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const body = z.object({
    name: z.string({ required_error: 'Nome é obrigatório' }),
    email: z.string().email(),
    password: z.string({ required_error: 'Senha é obrigatória' }),
  })

  const { name, email, password } = body.parse(request.body)
  try {
    const registerUseCase = makeRegisterUserUseCase()
    const user = await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      const responseBody: ResponseError = {
        message: 'Usuário com este e-mail já existe',
        errors: [error.message],
        statusCode: 409,
      }
      return reply.status(409).send(responseBody)
    }
    throw error
  }
  const responseBody: ResponseError = {
    data: { name, email },
    message: 'Usuário criado com sucesso',
    statusCode: 201,
  }
  return reply.status(201).send(responseBody)
}
