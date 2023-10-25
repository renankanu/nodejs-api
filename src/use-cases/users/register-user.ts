import { UsersRepository } from '@/repositories/users/users-repository'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  role: 'ADMIN' | 'STUDENT' | 'TEACHER' | undefined
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(
    data: RegisterUseCaseRequest,
  ): Promise<RegisterUseCaseResponse> {
    const user = await this.usersRepository.create(data)
    return { user }
  }
}
