import { FastifyInstance } from 'fastify'
import { register } from './register'
import { userDetail } from './user-detail'
import { getAll } from './get-all'
import { authenticate } from './authenticate'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { profile } from './profile'

export async function userRoutes(app: FastifyInstance) {
  app.post('/user/register', register)
  app.get('/user/:id/info', userDetail)
  app.get('/user', getAll)
  app.post('/user/session', authenticate)
  app.get('/user/me', { onRequest: [verifyJwt] }, profile)
}
