import { BaseResponse } from '@/shared/models/base-response'
import { makeGetAllUsersUseCase } from '@/use-cases/factories/make-get-all-users'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
  const responseBody: BaseResponse = {
    data: null,
    message: '',
    statusCode: 200,
  }

  try {
    const getAllUsersUseCase = makeGetAllUsersUseCase()
    const data = await getAllUsersUseCase.execute()
    const { users } = data
    const usersWithoutPassword = users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    })
    responseBody.data = usersWithoutPassword
    responseBody.message = 'Usuários encontrados'
    responseBody.statusCode = 200
    return reply.status(200).send(responseBody)
  } catch (error) {
    responseBody.data = null
    responseBody.message = 'Erro ao buscar usuários'
    responseBody.errors = []
    responseBody.statusCode = 500
    return reply.status(500).send(responseBody)
  }
}
