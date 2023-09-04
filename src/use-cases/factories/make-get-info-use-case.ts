import { UserRepositoryImpl } from '../../repositories/users/users-repository-impl'
import { GetUserInfoUseCase } from '../users/get-user-info'

export function makeGetInfoUseCase() {
  const usersRepository = new UserRepositoryImpl()
  const authenticateUseCase = new GetUserInfoUseCase(usersRepository)

  return authenticateUseCase
}
