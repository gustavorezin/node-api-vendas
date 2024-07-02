import { AppError } from '@shared/errors/AppError';
import { User } from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

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
