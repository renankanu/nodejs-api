import { FastifyInstance } from 'fastify'
import { info } from './info'
import { register } from './register'

export async function userRoutes(app: FastifyInstance) {
  app.get('/users/info', info)
  app.post('/users/register', register)
}
