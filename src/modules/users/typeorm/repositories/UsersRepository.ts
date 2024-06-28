import { dataSource } from '@shared/infra/typeorm';
import { User } from '../entities/User';

export const UsersRepository = dataSource.getRepository(User).extend({
  findByName(name: string) {
    return this.createQueryBuilder('user')
      .where('user.name = :name', {
        name
      })
      .getOne();
  },
  findById(id: string) {
    return this.createQueryBuilder('user')
      .where('user.id = :id', {
        id
      })
      .getOne();
  },
  findByEmail(email: string) {
    return this.createQueryBuilder('user')
      .where('user.email = :email', {
        email
      })
      .getOne();
  }
});
