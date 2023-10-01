import { FastifyInstance } from 'fastify'
import { info } from './info'
import { register } from './register'
import { authenticate } from './authenticate'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users/register', register)
  app.post('/users/sessions', authenticate)
  app.get('/users/:userId/info', info)
}
