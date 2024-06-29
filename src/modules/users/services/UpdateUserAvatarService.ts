import { AppError } from '@shared/errors/AppError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import path from 'path';
import fs from 'fs';
import { uploadConfig } from '@config/upload';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

export class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: IRequest) {
    const user = await UsersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.');
    }
    // apagar avatar se ja salvo anteriormente
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.diretory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    // salvar novo
    user.avatar = avatarFileName;
    await UsersRepository.save(user);

    return user;
  }
}
