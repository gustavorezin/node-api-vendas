import { ICreateCustomer } from '../models/ICreateCustomer';
import { ICustomer } from '../models/ICustomer';

export interface ICustomersRepository {
  generate(data: ICreateCustomer): Promise<ICustomer>;
  update(customer: ICustomer): Promise<void>;
  delete(customer: ICustomer): Promise<void>;
  findAll(): Promise<ICustomer[]>;
  findByName(name: string): Promise<ICustomer | null>;
  findById(id: string): Promise<ICustomer | null>;
  findByEmail(email: string): Promise<ICustomer | null>;
}
