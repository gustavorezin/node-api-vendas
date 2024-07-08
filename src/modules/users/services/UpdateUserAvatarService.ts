import { AppError } from '@shared/errors/AppError';
import { DiskStorageProvider } from '@shared/providers/StorageProvider/DiskStorageProvider';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { uploadConfig } from '@config/upload';
import { S3StorageProvider } from '@shared/providers/StorageProvider/S3StorageProvider';

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

    if (uploadConfig.driver === 's3') {
      const s3Provider = new S3StorageProvider();
      if (user.avatar) {
        await s3Provider.deleteFile(user.avatar);
      }
      await s3Provider.saveFile(avatarFileName);
    } else {
      const diskProvider = new DiskStorageProvider();
      if (user.avatar) {
        await diskProvider.deleteFile(user.avatar);
      }
      await diskProvider.saveFile(avatarFileName);
    }

    user.avatar = avatarFileName;

    await UsersRepository.save(user);

    return user;
  }
}
