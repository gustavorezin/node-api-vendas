import { AppError } from '@shared/errors/AppError';
import { DiskStorageProvider } from '@shared/providers/StorageProvider/DiskStorageProvider';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

export class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: IRequest) {
    const user = await UsersRepository.findById(userId);
    const storageProvider = new DiskStorageProvider();

    if (!user) {
      throw new AppError('User not found.');
    }

    // apagar avatar se ja salvo anteriormente
    if (user.avatar) {
      await storageProvider.deleteFile(user.avatar);
    }

    // salvar novo
    await storageProvider.saveFile(avatarFileName);
    user.avatar = avatarFileName;

    await UsersRepository.save(user);

    return user;
  }
}
