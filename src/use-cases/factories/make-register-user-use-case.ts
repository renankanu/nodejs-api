import { UsersRepositoryImpl } from '../../repositories/users/users-repository-impl'
import { RegisterUserUseCase } from '../users/register-user'

export function makeRegisterUserUseCase() {
  const userRepository = new UsersRepositoryImpl()
  const registerUserUseCase = new RegisterUserUseCase(userRepository)

  return registerUserUseCase
}
