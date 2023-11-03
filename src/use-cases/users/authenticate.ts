import { UsersRepository } from '@/repositories/users/users-repository'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from '../errors'
import { compare } from 'bcryptjs'
import { logger } from '@/shared/helpers/logger'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    logger.info(`Usuário ${password} autenticado com sucesso`)

    const samePassword = await compare(password, user.password)

    if (!samePassword) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
