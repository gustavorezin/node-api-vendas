import { IHashProvider } from '../models/IHashProvider';

export class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string) {
    return payload;
  }

  public async compareHash(payload: string, hashed: string) {
    return payload === hashed;
  }
}
