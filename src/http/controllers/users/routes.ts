import { FastifyInstance } from 'fastify'
import { register } from './register'
import { userDetail } from './user-detail'

export async function userRoutes(app: FastifyInstance) {
  app.post('/user/register', register)
  app.get('/user/:id/info', userDetail)
}
