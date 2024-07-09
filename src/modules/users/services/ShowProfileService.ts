import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

interface IRequest {
  userId: string;
}

@injectable()
export class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ userId }: IRequest) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found.');
    }
    return user;
  }
}
