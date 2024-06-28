import { AppError } from '@shared/errors/AppError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { compare, hash } from 'bcryptjs';
import { User } from '../typeorm/entities/User';
import { sign } from 'jsonwebtoken';
import { authConfig } from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await UsersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    });

    return { user, token };
  }
}
