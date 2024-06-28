import { UsersRepository } from '../typeorm/repositories/UsersRepository';

export class ListUserService {
  public async execute() {
    const users = await UsersRepository.find();
    return users;
  }
}
