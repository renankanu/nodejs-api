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
    cpf: z
      .string({ required_error: 'Cpf é obrigatório' })
      .refine((cpf: string) => {
        if (typeof cpf !== 'string') return false
        cpf = cpf.replace(/[^\d]+/g, '')
        if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
        const cpfDigits = cpf.split('').map((el) => +el)
        const rest = (count: number): number => {
          return (
            ((cpfDigits
              .slice(0, count - 12)
              .reduce((soma, el, index) => soma + el * (count - index), 0) *
              10) %
              11) %
            10
          )
        }
        return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10]
      }, 'Digite um cpf válido.'),
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
