import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ICreateCustomer } from './../../../domain/models/ICreateCustomer';
import { ICustomersRepository } from './../../../domain/repositories/ICustomersRepository';
import { dataSource } from '@shared/infra/typeorm';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { Customer } from '@modules/customers/infra/typeorm/entities/Customer';

export class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  async generate({ name, email }: ICreateCustomer) {
    const customer = new Customer();
    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);
    return customer;
  }

  async update(customer: ICustomer) {
    const findIndexCustomer = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id
    );
    this.customers[findIndexCustomer] = customer;
  }

  async delete(customer: ICustomer) {}

  async findAll() {
    return this.customers;
  }

  async findByName(name: string) {
    const customer = this.customers.find(customer => customer.name === name);
    return customer || null;
  }

  async findById(id: string) {
    const customer = this.customers.find(customer => customer.id === id);
    return customer || null;
  }

  async findByEmail(email: string) {
    const customer = this.customers.find(customer => customer.email === email);
    return customer || null;
  }
}
