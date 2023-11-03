import { UsersRepositoryImpl } from '@/repositories/users/users-repository-impl'
import { AuthenticateUseCase } from '../users/authenticate'

export function makeAuthenticateUseCase() {
  const userRepository = new UsersRepositoryImpl()
  const authenticateUseCase = new AuthenticateUseCase(userRepository)
  return authenticateUseCase
}
