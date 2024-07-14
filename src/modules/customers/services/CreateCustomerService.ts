import { inject, injectable } from 'tsyringe';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({ name, email }: ICreateCustomer) {
    const emailExists = await this.customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const customer = await this.customersRepository.generate({
      name,
      email
    });

    return customer;
  }
}
