import { AppError } from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { UsersRepository } from './../typeorm/repositories/UsersRepository';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

export class UpdateProfileService {
  public async execute({
    userId,
    name,
    email,
    password,
    oldPassword
  }: IRequest) {
    const user = await UsersRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found.');
    }

    const userUpdateEmail = await UsersRepository.findByEmail(email);
    if (userUpdateEmail && userUpdateEmail.id !== userId) {
      throw new AppError('There is already one user with this e-mail.');
    }

    if (password && !oldPassword) {
      throw new AppError('Old password is required.');
    }

    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);
      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }
      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await UsersRepository.save(user);

    return user;
  }
}
