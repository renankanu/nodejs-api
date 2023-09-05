import { UserRepositoryImpl } from '../../repositories/users/users-repository-impl'
import { RegisterUserUseCase } from '../users/register-user'

export function makeRegisterUserUseCase() {
  const userRepository = new UserRepositoryImpl()
  const registerUserUseCase = new RegisterUserUseCase(userRepository)
  return registerUserUseCase
}
