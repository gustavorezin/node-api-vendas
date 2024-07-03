import { AppError } from '@shared/errors/AppError';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

export class DeleteCustomerService {
  public async execute({ id }: IRequest) {
    const customer = await CustomersRepository.findById(id);
    if (!customer) {
      throw new AppError('Customer not found.');
    }
    await CustomersRepository.remove(customer);
  }
}
