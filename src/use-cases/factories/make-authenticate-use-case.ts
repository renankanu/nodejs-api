import { UserRepositoryImpl } from '../../repositories/users/users-repository-impl'
import { AuthenticateUseCase } from '../users/authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new UserRepositoryImpl()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
