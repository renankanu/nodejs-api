import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(roleToVerify: 'ADMIN' | 'USER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user
    if (user.role !== roleToVerify) {
      return reply.status(403).send({
        message: 'Você não tem permissão para acessar este recurso',
        statusCode: 403,
      })
    }
  }
}
