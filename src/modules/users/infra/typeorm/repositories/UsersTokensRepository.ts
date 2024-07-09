import { dataSource } from '@shared/infra/typeorm';
import { UserToken } from '../entities/UserToken';
import { IUsersTokensRepository } from '@modules/users/domain/repositories/IUsersTokensRepository';
import { Repository } from 'typeorm';

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = dataSource.getRepository(UserToken);
  }

  async generate(user_id: string) {
    const userToken = this.repository.create({ user_id });
    await this.repository.save(userToken);
    return userToken;
  }

  async findByToken(token: string) {
    return this.repository.findOneBy({ token });
  }
}
