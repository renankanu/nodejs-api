import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      role: 'ADMIN' | 'STUDENT' | 'TEACHER'
      sub: string
    }
  }
}
