import { IUserToken } from '../models/IUserToken';

export interface IUsersTokensRepository {
  generate(user_id: string): Promise<IUserToken>;
  findByToken(token: string): Promise<IUserToken | null>;
}
