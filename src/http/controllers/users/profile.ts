import { BaseResponse } from '@/shared/models/base-response'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use.case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({ userId: request.user.sub })

  const responseBody: BaseResponse = {
    data: {
      ...user,
      password: undefined,
    },
    message: '',
    statusCode: 200,
  }

  return reply.status(200).send(responseBody)
}
