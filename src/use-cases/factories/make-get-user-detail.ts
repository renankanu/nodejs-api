import { UsersRepositoryImpl } from '@/repositories/users/users-repository-impl'
import { GetUserByIDUseCase } from '../users/get-user-by-id'

export function makeGetUserDetailUseCase() {
  const userRepository = new UsersRepositoryImpl()
  const getUserDetailUseCase = new GetUserByIDUseCase(userRepository)
  return getUserDetailUseCase
}
