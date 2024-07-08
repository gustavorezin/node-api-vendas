import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

export class CreateCustomerService {
  public async execute({ name, email }: IRequest) {
    const customer = CustomersRepository.create({
      name,
      email
    });

    await CustomersRepository.save(customer);

    return customer;
  }
}
