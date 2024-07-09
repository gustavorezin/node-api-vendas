import { dataSource } from '@shared/infra/typeorm';
import { User } from '../entities/User';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { Repository } from 'typeorm';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async generate({ name, email, password }: ICreateUser) {
    const user = this.repository.create({ name, email, password });
    await this.repository.save(user);
    return user;
  }

  async update(user: IUser) {
    await this.repository.save(user);
  }

  async delete(user: IUser) {
    await this.repository.remove(user);
  }

  findAll() {
    return this.repository.find();
  }

  findByName(name: string) {
    return this.repository.findOneBy({ name });
  }

  findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }
}
