import { uploadConfig } from '@config/upload';
import { AppError } from '@shared/errors/AppError';
import { DiskStorageProvider } from '@shared/providers/StorageProvider/DiskStorageProvider';
import { S3StorageProvider } from '@shared/providers/StorageProvider/S3StorageProvider';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

@injectable()
export class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ userId, avatarFileName }: IRequest) {
    const user = await this.usersRepository.findById(userId);

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

    await this.usersRepository.update(user);

    return user;
  }
}
