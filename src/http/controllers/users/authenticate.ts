import { logger } from '@/shared/helpers/logger'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({ email, password })

    const token = await reply.jwtSign({ id: user.id })
    console.log(token)
    logger.info(`Usuário ${user.id} autenticado com sucesso`)
  } catch (error) {
    logger.error(`Erro ao autenticar usuário: ${error}`)
    reply.status(500).send({
      message: 'Erro ao autenticar usuário',
    })
  }
}
