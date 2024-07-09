import { ICreateUser } from '../models/ICreateUser';
import { IUser } from '../models/IUser';

export interface IUsersRepository {
  generate(data: ICreateUser): Promise<IUser>;
  update(customer: IUser): Promise<void>;
  delete(customer: IUser): Promise<void>;
  findAll(): Promise<IUser[]>;
  findByName(name: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
}
