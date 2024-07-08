import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  public async execute({ name, email, password }: IRequest) {
    const emailExists = await UsersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('E-mail address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = UsersRepository.create({
      name,
      email,
      password: hashedPassword
    });
    await UsersRepository.save(user);

    return user;
  }
}
