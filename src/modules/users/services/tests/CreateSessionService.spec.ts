import { FakeUsersRepository } from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import { CreateUserService } from '../CreateUserService';
import { AppError } from '@shared/errors/AppError';
import { FakeHashProvider } from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import { CreateSessionService } from '../CreateSessionService';

let repository: FakeUsersRepository;
let createSession: CreateSessionService;
let hashProvider: FakeHashProvider;

describe('CreateSession', () => {
  beforeEach(() => {
    repository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createSession = new CreateSessionService(repository, hashProvider);
  });

  it('should be able to authenticate', async () => {
    const user = await repository.generate({
      name: 'Gustavo',
      email: 'gustavo.rezin@gmail.com',
      password: '123456'
    });
    const session = await createSession.execute({
      email: user.email,
      password: user.password
    });
    expect(session).toHaveProperty('token');
    expect(session.user).toEqual(user);
  });

  it('should not be able to authenticate with non existent user', async () => {
    expect(
      createSession.execute({
        email: 'gustavo.rezin@gmail.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const user = await repository.generate({
      name: 'Gustavo',
      email: 'gustavo.rezin@gmail.com',
      password: '123456'
    });

    expect(
      createSession.execute({
        email: user.email,
        password: 'senhaerrada'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
