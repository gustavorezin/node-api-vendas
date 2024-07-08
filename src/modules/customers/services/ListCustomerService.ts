import { inject, injectable } from 'tsyringe';
import { Customer } from '../infra/typeorm/entities/Customer';
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
export class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  public async execute(): Promise<Customer[]> {
    const customers = await this.customersRepository.findAll();
    return customers;
  }
}
