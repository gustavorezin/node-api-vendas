import { IUser } from '@modules/users/domain/models/IUser';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { v4 as uuidv4 } from 'uuid';
import { ICreateUser } from './../../../domain/models/ICreateUser';
import { IUsersRepository } from './../../../domain/repositories/IUsersRepository';

export class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async generate({ name, email }: ICreateUser) {
    const user = new User();
    user.id = uuidv4();
    user.name = name;
    user.email = email;

    this.users.push(user);
    return user;
  }

  async update(user: IUser) {
    const findIndexUser = this.users.findIndex(
      findUser => findUser.id === user.id
    );
    this.users[findIndexUser] = user;
  }

  async delete(user: IUser) {}

  async findAll() {
    return this.users;
  }

  async findByName(name: string) {
    const user = this.users.find(user => user.name === name);
    return user || null;
  }

  async findById(id: string) {
    const user = this.users.find(user => user.id === id);
    return user || null;
  }

  async findByEmail(email: string) {
    const user = this.users.find(user => user.email === email);
    return user || null;
  }
}
