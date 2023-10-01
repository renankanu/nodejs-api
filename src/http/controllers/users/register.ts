import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterUserUseCase } from '../../../use-cases/factories/make-register-user-use-case'
import { UserAlreadyExistsError } from '../../../shared/errors/user-already-exists-error'
import { CustomResponse } from '@/shared/models/response-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const body = z.object({
    name: z.string({ required_error: 'Nome é obrigatório' }),
    email: z.string({ required_error: 'E-mail é obrigatório' }).email({
      message: 'E-mail inválido',
    }),
    role: z
      .enum(['ADMIN', 'STUDENT', 'TEACHER'], {
        errorMap: (_, ctx) => ({
          message: `Informe o uma permissão válida(ADMIN, STUDENT, TEACHER) - informado: ${ctx.data}`,
        }),
      })
      .optional(),
    password: z.string({ required_error: 'Senha é obrigatória' }),
  })

  const { name, email, role, password } = body.parse(request.body)

  const responseBody: CustomResponse = {
    data: {
      name,
      email,
      role,
    },
    message: 'Usuário criado com sucesso',
    statusCode: 201,
  }
  try {
    const registerUseCase = makeRegisterUserUseCase()
    await registerUseCase.execute({
      name,
      email,
      role,
      password,
    })

    return reply.status(201).send(responseBody)
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      responseBody.message = 'Usuário com este e-mail já existe'
      responseBody.errors = [error.message]
      responseBody.statusCode = 409
      return reply.status(409).send(responseBody)
    }
    throw error
  }
}
