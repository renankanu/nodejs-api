import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { BaseResponse } from '@/shared/models/base-response'
import { makeRegisterUserUseCase } from '@/use-cases/factories/make-register-user-use-case'

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
    data: {
      name,
      email,
      createdAt: new Date(),
    },
    message: 'Usuário criado com sucesso',
    statusCode: 201,
  }

  try {
    const registerUseCase = makeRegisterUserUseCase()
    await registerUseCase.execute({ name, email, password })

    return reply.status(201).send(responseBody)
  } catch (error) {
    console.error(error)
    reply.status(500).send({
      message: 'Erro ao criar usuário',
      statusCode: 500,
    })
  }
}
