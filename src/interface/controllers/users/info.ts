import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetInfoUseCase } from '../../../use-cases/factories/make-get-info-use-case'
import { z } from 'zod'

export async function info(request: FastifyRequest, reply: FastifyReply) {
  const getInfo = makeGetInfoUseCase()
  const userIdParams = z.object({
    userId: z.string().uuid(),
  })

  const { userId } = userIdParams.parse(request.params)
  const { user } = await getInfo.execute({
    userId,
  })

  return reply.status(200).send({
    data: {
      ...user,
      password: undefined,
    },
  })
}
