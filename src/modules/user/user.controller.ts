import { FastifyReply, FastifyRequest } from 'fastify'
import { getInfoUser } from './user.service'

export async function profile(_: FastifyRequest, reply: FastifyReply) {
  const user = await getInfoUser('1')
  if (!user) {
    return reply.status(404).send({
      message: 'User not found',
    })
  }
  return reply.status(200).send({
    data: user,
  })
}
