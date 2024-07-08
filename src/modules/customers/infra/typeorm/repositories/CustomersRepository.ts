import { Repository } from 'typeorm';
import { Customer } from '../entities/Customer';
import { ICreateCustomer } from './../../../domain/models/ICreateCustomer';
import { ICustomersRepository } from './../../../domain/repositories/ICustomersRepository';
import { dataSource } from '@shared/infra/typeorm';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';

export class CustomersRepository implements ICustomersRepository {
  private repository: Repository<Customer>;

  constructor() {
    this.repository = dataSource.getRepository(Customer);
  }

  async generate({ name, email }: ICreateCustomer) {
    const customer = this.repository.create({ name, email });
    await this.repository.save(customer);
    return customer;
  }

  async update(customer: ICustomer) {
    await this.repository.save(customer);
  }

  async delete(customer: ICustomer) {
    await this.repository.remove(customer);
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
