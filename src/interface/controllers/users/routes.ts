import { FastifyInstance } from 'fastify'
import { profile } from './profile'

export async function userRoutes(app: FastifyInstance) {
  app.get('/users/profile', profile)
}
