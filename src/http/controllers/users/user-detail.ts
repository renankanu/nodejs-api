import { ResourceNotFoundError } from '@/use-cases/errors'
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
  const responseBody: BaseResponse = {
    data: null,
    message: '',
    statusCode: 200,
  }
  try {
    const { user } = await getDetail.execute({ id })
    responseBody.data = {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    }
    return reply.status(200).send(responseBody)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      responseBody.message = 'Usuário não encontrado'
      responseBody.errors = [error.message]
      responseBody.statusCode = 404
      return reply.status(404).send(responseBody)
    }
  }
}
