import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetInfoUseCase } from '../../../use-cases/factories/make-get-info-use-case'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getInfo = makeGetInfoUseCase()
  const user = await getInfo.execute('1')
  return reply.status(200).send({
    data: user,
  })
}
