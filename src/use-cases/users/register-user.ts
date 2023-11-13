import { UsersRepository } from '@/repositories/users/users-repository'
import { Role, User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '@/use-cases/errors'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  cpf: string
  phone: string
  role?: Role
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({
    name,
    email,
    cpf,
    phone,
    role,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, 8)
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      cpf,
      phone,
      role,
      password: passwordHash,
    })

    return { user }
  }
}
