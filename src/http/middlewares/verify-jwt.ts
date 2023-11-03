import { BaseResponse } from '@/shared/models/base-response'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (error) {
    const errorResponse: BaseResponse = {
      data: null,
      message: 'Token inválido',
      errors: [],
      statusCode: 401,
    }
    return reply.status(401).send(errorResponse)
  }
}
