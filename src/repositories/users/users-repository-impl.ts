import { Prisma, User } from '@prisma/client'
import { UsersRepository } from './users-repository'
import { prisma } from '@/lib/prisma'

export class UsersRepositoryImpl implements UsersRepository {
  async create(user: Prisma.UserCreateInput): Promise<User> {
    return await prisma.user.create({ data: user })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } })
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } })
  }
}
