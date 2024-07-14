import { FakeCustomersRepository } from '@modules/customers/domain/repositories/fakes/FakeCustomerRepository';
import { CreateCustomerService } from '../CreateCustomerService';
import { AppError } from '@shared/errors/AppError';

let repository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    repository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(repository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Gustavo',
      email: 'gustavo.rezin@gmail.com'
    });
    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customers with the same email', async () => {
    await createCustomer.execute({
      name: 'Gustavo',
      email: 'gustavo.rezin@gmail.com'
    });

    expect(
      createCustomer.execute({
        name: 'Gustavo',
        email: 'gustavo.rezin@gmail.com'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
