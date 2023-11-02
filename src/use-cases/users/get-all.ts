import { UsersRepository } from '@/repositories/users/users-repository'
import { User } from '@prisma/client'

interface GetAllUsersUseCaseResponse {
  users: User[]
}

export class GetAllUsersUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(): Promise<GetAllUsersUseCaseResponse> {
    const users = await this.usersRepository.getAll()

    return { users }
  }
}
