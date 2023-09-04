import { UserRepository } from '../../repositories/users/users-repository'

export class GetUserInfoUseCase {
  constructor(private usersRepository: UserRepository) {
    this.usersRepository = usersRepository
  }

  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }
}
