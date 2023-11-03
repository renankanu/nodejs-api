import { UsersRepository } from '@/repositories/users/users-repository'
import { ResourceNotFoundError } from '@/use-cases/errors'
import { User } from '@prisma/client'

interface GetUserUseCaseResponse {
  user: User
}

export class GetUserByIDUseCase {
  constructor(private userRepository: UsersRepository) {
    this.userRepository = userRepository
  }

  async execute({ id }: { id: string }): Promise<GetUserUseCaseResponse> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new ResourceNotFoundError('User')
    }
    return { user }
  }
}
