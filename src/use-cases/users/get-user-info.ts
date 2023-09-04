import { UserRepository } from '../../repositories/users/users-repository'
import { ResourceNotFoundError } from '../../shared/errors/resource-not-found'

export class GetUserInfoUseCase {
  constructor(private usersRepository: UserRepository) {
    this.usersRepository = usersRepository
  }

  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new ResourceNotFoundError('User')
    }
    return user
  }
}
