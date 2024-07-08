import { AppError } from '@shared/errors/AppError';
import { User } from '../infra/typeorm/entities/User';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  userId: string;
}

export class ShowProfileService {
  public async execute({ userId }: IRequest): Promise<User> {
    const user = await UsersRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found.');
    }
    return user;
  }
}
