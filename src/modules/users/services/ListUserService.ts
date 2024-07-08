import { User } from '../infra/typeorm/entities/User';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

export class ListUserService {
  public async execute(): Promise<User[]> {
    const users = await UsersRepository.find();
    return users;
  }
}
