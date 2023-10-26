import { UsersRepository } from '@/repositories/users/users-repository'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const user = await this.usersRepository.create({
      name,
      email,
      password,
    })
    return { user }
  }
}
