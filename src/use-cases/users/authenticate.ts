import { UsersRepository } from '@/repositories/users/users-repository'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from '../errors'
import { compare } from 'bcryptjs'

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

    const samePassword = await compare(password, user.password)

    if (!samePassword) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
