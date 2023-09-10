import { User } from '@prisma/client'
import { UserRepository } from '../../repositories/users/users-repository'
import { UserAlreadyExistsError } from '../../shared/errors/user-already-exists-error'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  role: 'ADMIN' | 'STUDENT' | 'TEACHER' | undefined
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UserRepository) {
    this.usersRepository = usersRepository
  }

  async execute({
    name,
    email,
    role,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6)
    const userAlreadyExists = await this.usersRepository.findByEmail(email)
    if (userAlreadyExists) {
      throw new UserAlreadyExistsError()
    }
    const user = await this.usersRepository.create({
      name,
      email,
      role,
      password: passwordHash,
    })

    return { user }
  }
}
