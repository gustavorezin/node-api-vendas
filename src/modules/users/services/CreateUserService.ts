import { AppError } from '@shared/errors/AppError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

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

    const user = UsersRepository.create({ name, email, password });
    await UsersRepository.save(user);

    return user;
  }
}
