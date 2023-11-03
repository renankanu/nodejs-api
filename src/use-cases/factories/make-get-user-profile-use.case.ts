import { UsersRepositoryImpl } from '@/repositories/users/users-repository-impl'
import { GetUserProfileUseCase } from '../users/get-user-profile'

export function makeGetUserProfileUseCase() {
  const userRepository = new UsersRepositoryImpl()
  const getUserProfileUseCase = new GetUserProfileUseCase(userRepository)
  return getUserProfileUseCase
}
