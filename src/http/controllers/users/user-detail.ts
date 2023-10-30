import { BaseResponse } from '@/shared/models/base-response'
import { makeGetUserDetailUseCase } from '@/use-cases/factories/make-get-user-detail'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function userDetail(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const getDetail = makeGetUserDetailUseCase()

  const userIdParams = z.object({
    id: z.string(),
  })

  const { id } = userIdParams.parse(request.params)
  let responseBody: BaseResponse
  const { user } = await getDetail.execute({ id })

  if (!user) {
    responseBody = {
      data: null,
      message: 'Usuário não encontrado',
      statusCode: 404,
    }
    return reply.status(404).send(responseBody)
  }

  responseBody = {
    data: {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    message: 'Usuário encontrado',
    statusCode: 200,
  }

  return reply.status(200).send(responseBody)
}
