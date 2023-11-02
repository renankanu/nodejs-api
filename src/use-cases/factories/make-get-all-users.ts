import { UsersRepositoryImpl } from '@/repositories/users/users-repository-impl'
import { GetAllUsersUseCase } from '../users/get-all'

export function makeGetAllUsersUseCase() {
  const userRepository = new UsersRepositoryImpl()
  const getAllUsersUseCase = new GetAllUsersUseCase(userRepository)
  return getAllUsersUseCase
}
