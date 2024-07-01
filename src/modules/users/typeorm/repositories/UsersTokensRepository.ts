import { dataSource } from '@shared/infra/typeorm';
import { UserToken } from '../entities/UserToken';

export const UsersTokensRepository = dataSource
  .getRepository(UserToken)
  .extend({
    async findByToken(token: string) {
      return this.createQueryBuilder('user')
        .where('user.token = :token', {
          token
        })
        .getOne();
    },
    async generate(user_id: string) {
      const userToken = this.create({ user_id });
      await this.save(userToken);
      return userToken;
    }
  });
