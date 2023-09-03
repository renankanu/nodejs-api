import { FastifyInstance } from 'fastify'
import { profile } from './user.controller'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/user/me', profile)
}
