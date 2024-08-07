import { compare, hash } from 'bcryptjs';
import { IHashProvider } from '../models/IHashProvider';

export class BcryptHashProvider implements IHashProvider {
  public async generateHash(payload: string) {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string) {
    return compare(payload, hashed);
  }
}
