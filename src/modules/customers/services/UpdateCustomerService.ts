import { AppError } from '@shared/errors/AppError';
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest) {
    const customer = await CustomersRepository.findById(id);
    if (!customer) {
      throw new AppError('Customer not found.');
    }

    customer.name = name;
    customer.email = email;

    await CustomersRepository.save(customer);

    return customer;
  }
}
