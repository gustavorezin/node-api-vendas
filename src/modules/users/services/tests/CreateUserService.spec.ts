import { FakeUsersRepository } from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import { CreateUserService } from '../CreateUserService';
import { AppError } from '@shared/errors/AppError';
import { FakeHashProvider } from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let repository: FakeUsersRepository;
let createUser: CreateUserService;
let hashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    repository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createUser = new CreateUserService(repository, hashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Gustavo',
      email: 'gustavo.rezin@gmail.com',
      password: '123456'
    });
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same email', async () => {
    await createUser.execute({
      name: 'Gustavo',
      email: 'gustavo.rezin@gmail.com',
      password: '123456'
    });

    expect(
      createUser.execute({
        name: 'Gustavo',
        email: 'gustavo.rezin@gmail.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
